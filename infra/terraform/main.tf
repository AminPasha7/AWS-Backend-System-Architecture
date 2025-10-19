terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

# Example tags
locals {
  tags = {
    Project = "aws-edge-backend-starter"
    Owner   = "platform"
    Env     = var.environment
  }
}

# Minimal VPC module placeholder for validate only
resource "aws_vpc" "main" {
  cidr_block           = "10.20.0.0/16"
  enable_dns_hostnames = true
  tags                 = local.tags
}

output "vpc_id" {
  value = aws_vpc.main.id
}
