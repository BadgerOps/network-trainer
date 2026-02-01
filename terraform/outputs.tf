output "pages_url" {
  description = "Cloudflare Pages default URL"
  value       = "https://${cloudflare_pages_project.network_trainer.name}.pages.dev"
}

output "custom_domain_url" {
  description = "Custom domain URL"
  value       = "https://${var.domain}"
}

output "project_name" {
  description = "Cloudflare Pages project name"
  value       = cloudflare_pages_project.network_trainer.name
}

output "pages_subdomain" {
  description = "Pages subdomain for DNS configuration"
  value       = "${cloudflare_pages_project.network_trainer.name}.pages.dev"
}
