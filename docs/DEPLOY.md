# Deployment Guide

This guide covers deploying NETRUNNER to Cloudflare Pages with Terraform and GitHub Actions CI/CD.

## Architecture Overview

```
GitHub Repository
       │
       ├── Push to main ──► GitHub Actions CI/CD
       │                          │
       │                          ├── Build (npm run build)
       │                          ├── Terraform Apply
       │                          └── Wrangler Deploy
       │
       └──────────────────► Cloudflare Pages
                                  │
                                  └── netrunner.badgerops.foo
```

## Prerequisites

Before deploying, ensure you have:

- A [Cloudflare account](https://dash.cloudflare.com/sign-up)
- A [GitHub account](https://github.com)
- [Nix](https://nixos.org/download.html) installed (recommended) or Node.js 20+
- Domain configured in Cloudflare (badgerops.foo)

## Quick Start

### 1. Enter the Development Environment

```bash
# Using Nix (recommended)
nix develop

# Or manually install tools:
# - Node.js 20+
# - Terraform 1.7+
# - GitHub CLI
# - Wrangler (Cloudflare CLI)
# - AWS CLI (for R2)
```

### 2. Authenticate with Services

```bash
# GitHub
gh auth login

# Cloudflare
wrangler login
```

### 3. Gather Cloudflare Credentials

You'll need three values from Cloudflare:

**Account ID:**
```bash
# Via Wrangler
wrangler whoami

# Or: Cloudflare Dashboard → Any domain → Overview → Account ID (right sidebar)
```

**Zone ID (for badgerops.foo):**
```bash
# Via API
curl -X GET "https://api.cloudflare.com/client/v4/zones?name=badgerops.foo" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" | jq '.result[0].id'

# Or: Cloudflare Dashboard → badgerops.foo → Overview → Zone ID (right sidebar)
```

**API Token:**
1. Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Create Token → Custom Token
3. Permissions needed:
   - Account: Cloudflare Pages (Edit)
   - Zone: DNS (Edit)
   - Zone: Zone (Read)
4. Zone Resources: Include → Specific Zone → badgerops.foo
5. Save the token securely

### 4. Create R2 Bucket for Terraform State

```bash
# Create the bucket
wrangler r2 bucket create terraform-state

# Create R2 API credentials
# Go to: Cloudflare Dashboard → R2 → Manage R2 API Tokens → Create API Token
# Permissions: Object Read & Write
# Specify bucket: terraform-state
# Save the Access Key ID and Secret Access Key
```

### 5. Create GitHub Repository

```bash
# Create and push to GitHub
gh repo create network-trainer --public --source=. --remote=origin --push
```

### 6. Configure GitHub Secrets

```bash
# Add all required secrets
gh secret set CLOUDFLARE_API_TOKEN
gh secret set CLOUDFLARE_ACCOUNT_ID
gh secret set CLOUDFLARE_ZONE_ID
gh secret set R2_ACCESS_KEY_ID
gh secret set R2_SECRET_ACCESS_KEY
```

Or via GitHub UI: Repository → Settings → Secrets and variables → Actions → New repository secret

### 7. Update Terraform Configuration

Edit `terraform/main.tf` and update the GitHub owner:

```hcl
source {
  type = "github"
  config {
    owner     = "YOUR_GITHUB_USERNAME"  # ← Change this
    repo_name = "network-trainer"
    # ...
  }
}
```

### 8. Initialize and Apply Terraform (First Time)

```bash
cd terraform

# Set environment variables for R2 backend
export AWS_ACCESS_KEY_ID="your-r2-access-key"
export AWS_SECRET_ACCESS_KEY="your-r2-secret-key"
export AWS_ENDPOINT_URL_S3="https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com"

# Initialize Terraform
terraform init

# Review the plan
terraform plan

# Apply (creates Pages project and DNS records)
terraform apply
```

### 9. Push and Deploy

```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

GitHub Actions will automatically:
1. Build the application
2. Run Terraform to ensure infrastructure is up-to-date
3. Deploy to Cloudflare Pages via Wrangler

## CI/CD Workflows

### CI Pipeline (`.github/workflows/ci.yml`)

Runs on: Pull requests and pushes to main

- **build**: Installs dependencies, builds the app, uploads artifact
- **terraform-validate**: Checks Terraform formatting and validates configuration
- **terraform-plan**: (PRs only) Shows what changes Terraform would make

### CD Pipeline (`.github/workflows/deploy.yml`)

Runs on: Pushes to main, manual trigger

- **build**: Builds the production bundle
- **terraform-apply**: Applies infrastructure changes
- **deploy-pages**: Deploys built assets to Cloudflare Pages

## Manual Deployment

If you need to deploy without CI/CD:

```bash
# Build
npm run build

# Deploy directly with Wrangler
wrangler pages deploy dist --project-name=network-trainer
```

## Terraform Resources

The Terraform configuration manages:

| Resource | Description |
|----------|-------------|
| `cloudflare_pages_project` | The Pages project configuration |
| `cloudflare_pages_domain` | Custom domain attachment |
| `cloudflare_record` | DNS CNAME record for the subdomain |

## Environment Variables

### GitHub Secrets Required

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Pages and DNS permissions |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| `CLOUDFLARE_ZONE_ID` | Zone ID for badgerops.foo |
| `R2_ACCESS_KEY_ID` | R2 API access key for Terraform state |
| `R2_SECRET_ACCESS_KEY` | R2 API secret key for Terraform state |

## Troubleshooting

### Terraform State Lock

If Terraform complains about state lock:
```bash
terraform force-unlock LOCK_ID
```

### DNS Not Resolving

DNS propagation can take up to 24 hours. Check status:
```bash
dig netrunner.badgerops.foo
```

### Pages Deployment Failing

Check the Cloudflare Pages dashboard for build logs:
1. Go to Cloudflare Dashboard → Pages
2. Select network-trainer project
3. View deployment logs

### GitHub Actions Failing

1. Check the Actions tab in your GitHub repository
2. Click on the failed workflow run
3. Expand the failed step to see error details

## Rollback

To rollback to a previous deployment:

1. Go to Cloudflare Dashboard → Pages → network-trainer
2. Click on Deployments
3. Find the previous working deployment
4. Click "Rollback to this deployment"

## Security Notes

- Never commit `.tfvars` files with secrets
- API tokens should have minimal required permissions
- R2 credentials should only have access to the terraform-state bucket
- Regularly rotate API tokens
