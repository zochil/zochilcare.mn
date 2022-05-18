echo 'Deployting service..'

helm upgrade -f .env.yaml web-v1 ./scripts/helm
