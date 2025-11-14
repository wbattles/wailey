FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY index.html .
COPY chat.js .

EXPOSE 3000

CMD ["serve", "-l", "3000", "."]