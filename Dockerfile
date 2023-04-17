# Specify the base image
FROM node:latest AS build
# SET ENVIRONMENT VARIABLES
ARG Environment

# Set the working directory
WORKDIR /usr/src/app
# Add the Angular app to the working directory
COPY package.json ./
# Install the app's dependencies
RUN npm install
COPY . .
# Build the app for production
RUN npm install -g @angular/cli
RUN ng build -c=$Environment
# Use nginx to serve the app
FROM nginx:alpine
# Copy compiled files from previous build stage
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
