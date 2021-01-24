#build stage
FROM node:10.16.0-alpine AS builder
RUN GRPC_HEALTH_PROBE_VERSION=v0.3.0 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent && cp -r node_modules ../
COPY . .
RUN cd /usr/src/app/src/mongo-rabbit && npm install 
RUN cd .. 
RUN npm run build

FROM node:10.16.0-alpine
COPY --from=builder /usr/src/app/package.json /usr/src/app/package-lock.json ./
COPY --from=builder /bin/grpc_health_probe /bin/grpc_health_probe
COPY --from=builder /usr/src/app/dist /dist
COPY --from=builder /usr/src/app/node_modules /node_modules
LABEL Name=listener-service Version=0.0.1
EXPOSE 3000
CMD ["npm", "run", "serve"]
