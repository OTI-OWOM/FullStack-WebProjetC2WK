terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

resource "aws_instance" "c2wk" {
  ami           = var.ami
  instance_type = var.instance_type
  vpc_security_group_ids = [ aws_security_group.websg.id ]
  
  user_data = <<-EOF
                #!/bin/bash
                echo "I LOVE TERRAFORM" > index.html
                nohup busybox httpd -f -p 8080 &
                EOF
  tags = {
    Name = "C2WK-Demo"
  }
}

resource "aws_security_group" "websg" {
  name = "web-sg01"
  ingress {
    protocol = "tcp"
    from_port = 8080
    to_port = 8080
    cidr_blocks = [ "0.0.0.0/0" ]
  }
}
output "instance_ips" {
  value = aws_instance.c2wk.public_ip
}