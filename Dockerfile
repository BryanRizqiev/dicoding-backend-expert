FROM node:14-alpine

ENV PORT=5000
ENV PGHOST=
ENV PGPORT=
ENV PGUSER=
ENV PGPASSWORD=
ENV PGDATABASE=
ENV ACCESS_TOKEN_KEY=
ENV REFRESH_TOKEN_KEY=
ENV ACCESS_TOKEN_AGE=3000

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE $PORT

CMD ["npm", "run", "start"]