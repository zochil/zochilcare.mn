FROM node:16-alpine
RUN apk add --no-cache make gcc g++ python3

RUN addgroup -S zochil && adduser -S zochil -G zochil
USER zochil
RUN mkdir -p /home/zochil/web/node_modules && chown -R zochil:zochil /home/zochil/web
WORKDIR /home/zochil/web

COPY package.json yarn.lock ./
COPY next.config.js .
COPY --chown=zochil:zochil ./.next ./.next
COPY --chown=zochil:zochil ./public ./public

RUN yarn install --immutable --immutable-cache --check-cache
ENV NODE_ENV production

EXPOSE $PORT
CMD ["yarn", "start"]

