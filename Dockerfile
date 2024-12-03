# Use a lightweight Node image for building
FROM node:18 as build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install --frozen-lockfile

# Copy the source code and build
COPY . .
RUN npm run build

# Use an Nginx image to serve the built app
FROM nginx:stable-alpine as production-stage

# Copy the built files to Nginx default location
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom Nginx config for Gzip
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
