#!/usr/bin/env bash
set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Config
DOMAIN="badgerops.foo"
SUBDOMAIN="netrunner"
R2_BUCKET="terraform-state"
PROJECT_NAME="network-trainer"

echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║     NETRUNNER Deployment Setup                             ║${NC}"
echo -e "${CYAN}║     Cloudflare Pages + OpenTofu + GitHub Actions           ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Check required tools
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[1/7]${NC} Checking required tools..."

check_tool() {
    if ! command -v "$1" &> /dev/null; then
        echo -e "${RED}✗ $1 not found. Please run 'nix develop' first.${NC}"
        exit 1
    fi
    echo -e "  ${GREEN}✓${NC} $1"
}

check_tool "gh"
check_tool "wrangler"
check_tool "flarectl"
check_tool "jq"
check_tool "tofu"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Check GitHub authentication
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[2/7]${NC} Checking GitHub authentication..."

if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}⚠ Not logged into GitHub. Starting login...${NC}"
    gh auth login
fi
GH_USER=$(gh api user -q '.login')
echo -e "  ${GREEN}✓${NC} Logged in as ${CYAN}$GH_USER${NC}"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Check Cloudflare authentication
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[3/7]${NC} Checking Cloudflare authentication..."

if ! wrangler whoami &> /dev/null 2>&1; then
    echo -e "${YELLOW}⚠ Not logged into Cloudflare. Starting login...${NC}"
    wrangler login
fi

# Get account info
CF_ACCOUNT_INFO=$(wrangler whoami 2>&1 || true)
CF_ACCOUNT_ID=$(echo "$CF_ACCOUNT_INFO" | grep -oE '[a-f0-9]{32}' | head -1 || true)

if [[ -z "$CF_ACCOUNT_ID" ]]; then
    echo -e "${YELLOW}⚠ Could not auto-detect Account ID.${NC}"
    echo -e "  Find it at: ${CYAN}https://dash.cloudflare.com${NC} → Any domain → Overview → right sidebar"
    read -rp "  Enter your Cloudflare Account ID: " CF_ACCOUNT_ID
fi
echo -e "  ${GREEN}✓${NC} Account ID: ${CYAN}$CF_ACCOUNT_ID${NC}"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Get Cloudflare API Token (needed for zone lookup and deployment)
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[4/8]${NC} Getting Cloudflare API Token..."
echo ""
echo -e "${CYAN}Cloudflare API Token${NC} (for Pages, DNS & Zone lookup)"
echo -e "   URL: ${CYAN}https://dash.cloudflare.com/profile/api-tokens${NC}"
echo -e "   Click: Create Token → Custom Token"
echo -e "   Permissions:"
echo -e "     • Account: Cloudflare Pages → Edit"
echo -e "     • Zone: DNS → Edit"
echo -e "     • Zone: Zone → Read"
echo -e "   Zone Resources: Include → Specific Zone → $DOMAIN"
echo ""
read -rsp "   Paste your Cloudflare API Token: " CF_API_TOKEN
echo ""
echo -e "  ${GREEN}✓${NC} API Token received"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Get Zone ID for domain using flarectl
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[5/8]${NC} Getting Zone ID for ${CYAN}$DOMAIN${NC}..."

# Use flarectl with the API token to get zone ID
export CF_API_TOKEN
CF_ZONE_ID=$(flarectl zone list --json 2>/dev/null | jq -r ".[] | select(.Name==\"$DOMAIN\") | .ID" || true)

if [[ -z "$CF_ZONE_ID" || "$CF_ZONE_ID" == "null" ]]; then
    echo -e "  ${YELLOW}⚠${NC} Could not auto-detect Zone ID via API"
    echo -e "  Find it at: ${CYAN}https://dash.cloudflare.com${NC} → $DOMAIN → Overview → right sidebar"
    read -rp "  Enter Zone ID for $DOMAIN: " CF_ZONE_ID
else
    echo -e "  ${GREEN}✓${NC} Auto-detected Zone ID: ${CYAN}$CF_ZONE_ID${NC}"
fi
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Create/verify R2 bucket
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[6/8]${NC} Setting up R2 bucket for Terraform state..."

if wrangler r2 bucket list 2>/dev/null | grep -q "$R2_BUCKET"; then
    echo -e "  ${GREEN}✓${NC} Bucket ${CYAN}$R2_BUCKET${NC} already exists"
else
    echo -e "  Creating bucket ${CYAN}$R2_BUCKET${NC}..."
    wrangler r2 bucket create "$R2_BUCKET" || true
    echo -e "  ${GREEN}✓${NC} Bucket created"
fi
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Get R2 API credentials
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[7/8]${NC} Getting R2 API credentials..."
echo ""
echo -e "${CYAN}R2 API Token${NC} (for Terraform state storage)"
echo -e "   URL: ${CYAN}https://dash.cloudflare.com/${CF_ACCOUNT_ID}/r2/api-tokens${NC}"
echo -e "   Click: Create API Token"
echo -e "   Permissions: Object Read & Write"
echo -e "   Specify bucket: $R2_BUCKET"
echo ""
read -rsp "   Paste R2 Access Key ID: " R2_ACCESS_KEY_ID
echo ""
read -rsp "   Paste R2 Secret Access Key: " R2_SECRET_ACCESS_KEY
echo ""
echo -e "  ${GREEN}✓${NC} R2 credentials received"
echo ""

# ─────────────────────────────────────────────────────────────────────────────
# Set GitHub secrets
# ─────────────────────────────────────────────────────────────────────────────
echo -e "${BLUE}[8/8]${NC} Setting GitHub repository secrets..."

# Check if repo exists
REPO_EXISTS=$(gh repo view "$GH_USER/$PROJECT_NAME" --json name 2>/dev/null || echo "")

if [[ -z "$REPO_EXISTS" ]]; then
    echo -e "  ${YELLOW}⚠${NC} Repository ${CYAN}$GH_USER/$PROJECT_NAME${NC} not found."
    echo -e "  Create it first with: ${CYAN}gh repo create $PROJECT_NAME --public --source=. --push${NC}"
    echo ""
    read -rp "  Create repository now? [y/N]: " CREATE_REPO
    if [[ "$CREATE_REPO" =~ ^[Yy]$ ]]; then
        gh repo create "$PROJECT_NAME" --public --source=. --remote=origin --push
        echo -e "  ${GREEN}✓${NC} Repository created"
    else
        echo -e "  ${YELLOW}Skipping secret setup. Run this script again after creating the repo.${NC}"
        exit 0
    fi
fi

echo -e "  Setting secrets for ${CYAN}$GH_USER/$PROJECT_NAME${NC}..."

echo "$CF_API_TOKEN" | gh secret set CLOUDFLARE_API_TOKEN --repo="$GH_USER/$PROJECT_NAME"
echo -e "  ${GREEN}✓${NC} CLOUDFLARE_API_TOKEN"

echo "$CF_ACCOUNT_ID" | gh secret set CLOUDFLARE_ACCOUNT_ID --repo="$GH_USER/$PROJECT_NAME"
echo -e "  ${GREEN}✓${NC} CLOUDFLARE_ACCOUNT_ID"

echo "$CF_ZONE_ID" | gh secret set CLOUDFLARE_ZONE_ID --repo="$GH_USER/$PROJECT_NAME"
echo -e "  ${GREEN}✓${NC} CLOUDFLARE_ZONE_ID"

echo "$R2_ACCESS_KEY_ID" | gh secret set R2_ACCESS_KEY_ID --repo="$GH_USER/$PROJECT_NAME"
echo -e "  ${GREEN}✓${NC} R2_ACCESS_KEY_ID"

echo "$R2_SECRET_ACCESS_KEY" | gh secret set R2_SECRET_ACCESS_KEY --repo="$GH_USER/$PROJECT_NAME"
echo -e "  ${GREEN}✓${NC} R2_SECRET_ACCESS_KEY"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Setup complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "Next steps:"
echo -e "  1. Update ${CYAN}terraform/main.tf${NC} → set owner to ${CYAN}$GH_USER${NC}"
echo -e "  2. Commit and push to master:"
echo -e "     ${CYAN}git add . && git commit -m 'chore: configure deployment' && git push${NC}"
echo -e "  3. GitHub Actions will automatically deploy to:"
echo -e "     ${CYAN}https://$SUBDOMAIN.$DOMAIN${NC}"
echo ""
echo -e "To manually initialize Terraform:"
echo -e "  ${CYAN}cd terraform${NC}"
echo -e "  ${CYAN}export AWS_ACCESS_KEY_ID='$R2_ACCESS_KEY_ID'${NC}"
echo -e "  ${CYAN}export AWS_SECRET_ACCESS_KEY='<your-secret>'${NC}"
echo -e "  ${CYAN}export AWS_ENDPOINT_URL_S3='https://$CF_ACCOUNT_ID.r2.cloudflarestorage.com'${NC}"
echo -e "  ${CYAN}tofu init && tofu plan${NC}"
echo ""
