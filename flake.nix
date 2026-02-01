{
  description = "Network Playground - Interactive network training tool";

  inputs = {
    # Use stable nixpkgs for reliability
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        # Use Node.js 20 LTS (most stable)
        nodejs = pkgs.nodejs_20;
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
            pkgs.opentofu      # Terraform-compatible IaC (open source)
            pkgs.terraform     # HashiCorp Terraform

            # Cloud CLIs
            pkgs.gh            # GitHub CLI
            pkgs.awscli2       # AWS CLI (for R2 S3-compatible API)

            # Useful CLI tools
            pkgs.jq
            pkgs.git
          ];

          shellHook = ''
            echo ""
            echo "🌐 Network Playground Development Environment"
            echo "   Node.js $(node --version)"
            echo "   Terraform $(terraform --version | head -1)"
            echo "   GitHub CLI $(gh --version | head -1)"
            echo ""
            echo "Commands:"
            echo "  npm run dev     - Start development server"
            echo "  npm run build   - Build for production"
            echo "  npm run preview - Preview production build"
            echo ""
            echo "Deployment:"
            echo "  gh auth login   - Authenticate with GitHub"
            echo "  wrangler login  - Authenticate with Cloudflare"
            echo "  cd terraform && terraform init  - Initialize Terraform"
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
