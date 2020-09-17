#build stage
FROM node:10.16.0-alpine AS builder
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent && cp -r node_modules ../
RUN npm install -g typescript
COPY . .
RUN npm run build-ts

FROM node:10.16.0-alpine
COPY --from=builder /usr/src/app/package.json /usr/src/app/package-lock.json ./
COPY --from=builder /usr/src/app/dist /dist
COPY --from=builder /usr/src/app/node_modules /node_modules
LABEL Name=listener-service Version=0.0.1
EXPOSE 3000
CMD ["npm", "run", "serve"]
