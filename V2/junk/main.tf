module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  version         = "19.17.2"
  cluster_name    = "my-cluster"
  cluster_version = "1.21"
  
  vpc_id          = aws_vpc.my_vpc.id
  subnet_ids         = [aws_subnet.my_public_subnet.id, aws_subnet.my_private_subnet.id]
}

resource "aws_eks_node_group" "eks_nodes" {
  cluster_name    = module.eks.cluster_id
  node_group_name = "eks_nodes"
  node_role_arn   = aws_iam_role.eks_nodes.arn
  subnet_ids      = [aws_subnet.my_public_subnet.id, aws_subnet.my_private_subnet.id]

  scaling_config {
    desired_size = 2
    max_size     = 3
    min_size     = 1
  }

  instance_type = "m5.large"
  key_name      = var.key_name

  remote_access {
    ec2_ssh_key = var.key_name
    source_security_group_ids = [aws_security_group.worker_group_mgmt_one.id, aws_security_group.worker_group_mgmt_two.id]
  }
}


# Create security groups for the worker nodes
resource "aws_security_group" "worker_group_mgmt_one" {
  name_prefix = "worker_group_mgmt_one"
  vpc_id      = aws_vpc.my_vpc.id
}

resource "aws_security_group" "worker_group_mgmt_two" {
  name_prefix = "worker_group_mgmt_two"
  vpc_id      = aws_vpc.my_vpc.id
}

variable "key_name" {
  description = "The key name to use for the instance"
  default     = "my-key-name"
}
