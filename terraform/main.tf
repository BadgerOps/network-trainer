# Look up the zone by name (no need to hardcode zone ID)
data "cloudflare_zone" "main" {
  name = var.zone_name
}

# Cloudflare Pages Project (Direct Upload mode - built by GitHub Actions)
resource "cloudflare_pages_project" "network_trainer" {
  account_id        = var.cloudflare_account_id
  name              = var.project_name
  production_branch = var.production_branch

  # No source block = Direct Upload mode
  # GitHub Actions builds the site and uploads via wrangler pages deploy

  deployment_configs {
    production {
      compatibility_date = "2024-01-01"
    }
    preview {
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
