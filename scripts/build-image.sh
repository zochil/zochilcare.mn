echo 'Building image..'

rm -rf .next
yarn build

docker build -t zochil-care-$1 .
docker tag zochil-care-$1 registry.digitalocean.com/zochil/zochil-care:$1
docker push registry.digitalocean.com/zochil/zochil-care:$1
