{
  description = "Network Playground - Interactive network training tool";

  inputs = {
    # Use stable nixpkgs for reliability
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        # Use Node.js 24
        nodejs = pkgs.nodejs_24;
      in
      {
        devShells.default = pkgs.mkShell {
          name = "network-trainer";

          buildInputs = [
            # Node.js LTS
            nodejs
            pkgs.pnpm  # More reliable than npm for optional deps

            # Development tools
            pkgs.nodePackages.typescript
            pkgs.nodePackages.typescript-language-server
            pkgs.nodePackages.prettier
            pkgs.nodePackages.wrangler  # Cloudflare CLI

            # Infrastructure as Code
            pkgs.opentofu      # Terraform-compatible IaC (open source, use `tofu` command)

            # Cloud CLIs
            pkgs.gh            # GitHub CLI
            pkgs.awscli2       # AWS CLI (for R2 S3-compatible API)

            # Useful CLI tools
            pkgs.jq
            pkgs.git
          ];

          shellHook = ''
            # Alias terraform to tofu (OpenTofu is the open-source Terraform fork)
            alias terraform=tofu

            # Custom prompt with git info using PROMPT_COMMAND for proper color handling
            __update_ps1() {
              local cyan='\033[0;36m'
              local blue='\033[0;34m'
              local magenta='\033[0;35m'
              local yellow='\033[0;33m'
              local reset='\033[0m'
              local nix_icon='❄️'

              local git_info=""
              if git rev-parse --is-inside-work-tree &>/dev/null; then
                local branch=$(git symbolic-ref --short HEAD 2>/dev/null || git describe --tags --exact-match 2>/dev/null || git rev-parse --short HEAD 2>/dev/null)
                local status=""

                # Check for uncommitted changes
                if ! git diff --quiet 2>/dev/null || ! git diff --cached --quiet 2>/dev/null; then
                  status="*"
                fi

                # Check for untracked files
                if [ -n "$(git ls-files --others --exclude-standard 2>/dev/null)" ]; then
                  status="$status?"
                fi

                git_info=" \[$magenta\]$branch\[$yellow\]$status\[$reset\]"
              fi

              PS1="\[$cyan\]$nix_icon nix-shell\[$reset\] \[$blue\]\W\[$reset\]$git_info\[$cyan\]>\[$reset\] "
            }

            PROMPT_COMMAND=__update_ps1

            echo ""
            echo "🌐 Network Playground Development Environment"
            echo "   Node.js $(node --version)"
            echo "   OpenTofu $(tofu --version | head -1)"
            echo "   GitHub CLI $(gh --version | head -1)"
            echo ""
            echo "Commands:"
            echo "  npm run dev     - Start development server"
            echo "  npm run build   - Build for production"
            echo "  npm run preview - Preview production build"
            echo ""
            echo "Deployment:"
            echo "  ./scripts/setup-deployment.sh  - Full setup wizard"
            echo "  gh auth login   - Authenticate with GitHub"
            echo "  wrangler login  - Authenticate with Cloudflare"
            echo "  cd terraform && tofu init  - Initialize OpenTofu"
            echo ""
            echo "Note: 'terraform' is aliased to 'tofu' (OpenTofu)"
            echo ""

            # Set up npm to use local node_modules/.bin
            export PATH="$PWD/node_modules/.bin:$PATH"

            # Install deps if needed (use pnpm for reliability)
            if [ ! -d "node_modules" ]; then
              echo "📦 Installing dependencies..."
              pnpm install
            fi

            echo "✓ Ready! Run 'npm run dev' to start."
            echo ""
          '';
        };
      }
    );
}
