# Steps to make the eks cluster work

#### 1. Terraform Plan
```
terraform plan
```
#### 2. Terraform Validate
```
terraform validate
```
#### 3. Terraform Apply - Create the components
```
terraform apply
```
#### 4. Update AWS EKS 
```
aws eks update-kubeconfig --region eu-west-3 --name my-eks
```
#### 5. Create namespace 
```
kubectl create namespace ingress-nginx
```
#### 6. Apply the components
```
kubectl apply -f ingress/ngnix-ingress.1.5.1.yaml
kubectl apply -f mongo-secret.yaml
kubectl apply -f mongo.yaml
kubectl apply -f api.yaml
kubectl apply -f angular.yaml
```

#### 7. Wait for everything to be created
```
kubectl get pods --watch
```
#### 8. Add the routing 
```
kubectl apply -f ingress/routing.yaml
```

> :warning: If you get a timeout follow this guide https://docs.nginx.com/nginx-ingress-controller/installation/installing-nic/installation-with-helm/#pulling-the-chart. 

Otherwise you can just delete the webhook :
```
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
```

#### 9. Point the domain to the loadbalancer
- Create a record :
  - Record name - empty
  - Record type - A
  - Route traffic to - App and Load balancer, Paris
  - Create record
#### 10. Wait if needed


Delete everything 
```
kubectl delete namespace ingress-nginx
kubectl delete all --all
terraform destroy
```