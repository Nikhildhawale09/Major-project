# Stage 1: Build the Vite app
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

# Stage 2: Serve with http-server
FROM node:22-alpine

WORKDIR /app

RUN npm install -g http-server

# Copy the Vite build output
COPY --from=build /app/dist /app/dist

EXPOSE 8080

# Serve with fallback to index.html for SPA support
CMD ["http-server", "dist", "-p", "8080", "--fallback", "index.html"]
