FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV HOST=0.0.0.0

EXPOSE 3000

# CMD ["npm", "run", "start"]
CMD ["npm", "run", "dev"]