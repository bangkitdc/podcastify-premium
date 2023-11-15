FROM node:lts-alpine3.17

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./

EXPOSE 5173

RUN npx tailwindcss init

CMD [ "npm", "run", "dev" ]