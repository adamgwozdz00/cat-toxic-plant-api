# BUILD FOR LOCAL DEVELOPMENT
FROM --platform=linux/amd64 node:18.18-slim as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

# BUILD FOR PRODUCTION
FROM --platform=linux/amd64 node:18.18-slim as build
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

# PRODUCTION
FROM --platform=linux/amd64 node:18.18-slim as production
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/logo.png ./logo.png
CMD [ "node", "dist/main.js" ]
EXPOSE 3000