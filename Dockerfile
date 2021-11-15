FROM node:14.18.1-alpine

COPY package.json .
COPY package-lock.json .

RUN adduser -S appuser
RUN npm install --production

COPY *.js .

USER appuser

CMD ["node", "main.js"]