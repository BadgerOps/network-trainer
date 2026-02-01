variable "cloudflare_api_token" {
  description = "Cloudflare API token with Pages and DNS permissions"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare Account ID"
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID for badgerops.foo"
  type        = string
}

variable "project_name" {
  description = "Name of the Cloudflare Pages project"
  type        = string
  default     = "network-trainer"
}

variable "production_branch" {
  description = "Git branch for production deployments"
  type        = string
  default     = "master"
}

variable "domain" {
  description = "Custom domain for the Pages project"
  type        = string
  default     = "netrunner.badgerops.foo"
}
