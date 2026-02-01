# Look up the zone by name (no need to hardcode zone ID)
data "cloudflare_zone" "main" {
  name = var.zone_name
}

# Cloudflare Pages Project
resource "cloudflare_pages_project" "network_trainer" {
  account_id        = var.cloudflare_account_id
  name              = var.project_name
  production_branch = var.production_branch

  build_config {
    build_command   = "npm run build"
    destination_dir = "dist"
    root_dir        = ""
  }

  source {
    type = "github"
    config {
      owner                         = "badgerops" # Update with your GitHub username/org
      repo_name                     = "network-trainer"
      production_branch             = var.production_branch
      pr_comments_enabled           = true
      deployments_enabled           = true
      production_deployment_enabled = true
      preview_deployment_setting    = "custom"
      preview_branch_includes       = ["dev", "feature/*"]
    }
  }

  deployment_configs {
    production {
      environment_variables = {
        NODE_VERSION = "20"
      }
      compatibility_date = "2024-01-01"
    }
    preview {
      environment_variables = {
        NODE_VERSION = "20"
      }
      compatibility_date = "2024-01-01"
    }
  }
}

# Custom domain for Pages
resource "cloudflare_pages_domain" "network_trainer" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.network_trainer.name
  domain       = "${var.subdomain}.${var.zone_name}"
}

# DNS CNAME record pointing to Pages
resource "cloudflare_record" "network_trainer" {
  zone_id = data.cloudflare_zone.main.id
  name    = var.subdomain
  content = "${cloudflare_pages_project.network_trainer.name}.pages.dev"
  type    = "CNAME"
  ttl     = 1 # Auto TTL
  proxied = true
}
