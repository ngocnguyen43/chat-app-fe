FROM node:18-alpine3.18 AS builder

WORKDIR /app

COPY . .

ARG DOPPLER_TOKEN

ENV DOPPLER_TOKEN ${DOPPLER_TOKEN}

RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

CMD [ "npm","ci","&&","doppler","run","--","npm","run","build" ]

FROM nginx:1.25-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY deploy/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
