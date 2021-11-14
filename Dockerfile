FROM node:14.18.1-alpine

COPY package*.json .

RUN adduser -S appuser
RUN npm install --production

COPY main.js .

USER appuser

CMD ["node", "main.js"]