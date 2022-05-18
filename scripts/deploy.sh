echo 'Deployting service..'

helm upgrade -f .env.yaml zochil-care ./scripts/helm
