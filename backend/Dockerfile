FROM node:20-alpine

WORKDIR /workspace/backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 6970 5175

CMD ["npm", "run", "dev:all"]
