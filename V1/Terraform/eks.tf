module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "18.29.0"

  cluster_name    = "my-eks"
  cluster_version = "1.28"

  cluster_endpoint_private_access = true
  cluster_endpoint_public_access  = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  enable_irsa = true

  eks_managed_node_group_defaults = {
    disk_size = 50
  }

  node_security_group_additional_rules = {
    cluster_to_node = {
      description      = "Cluster to ingress-nginx webhook"
      protocol         = "-1"
      from_port        = 8443
      to_port          = 8443
      type             = "ingress"
      source_cluster_security_group = true
    }
  }

  eks_managed_node_groups = {
    general = {
      desired_size = 3
      min_size     = 1
      max_size     = 10

      labels = {
        role = "general"
      }

      instance_types = ["t3.xlarge"]
      capacity_type  = "ON_DEMAND"
    }

    # spot = {
    #   desired_size = 1
    #   min_size     = 1
    #   max_size     = 10

    #   labels = {
    #     role = "spot"
    #   }

    #   taints = [{
    #     key    = "market"
    #     value  = "spot"
    #     effect = "NO_SCHEDULE"
    #   }]

    #   instance_types = ["t3.micro"]
    #   capacity_type  = "SPOT"
    # }
  }

  tags = {
    Environment = "staging"
  }
}
