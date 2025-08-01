# --- Stage 1: Build the React application ---
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the React app for production
# This command *must* be available in your frontend/package.json.
# For Create React App, it's typically "react-scripts build".
RUN npm run build

# --- Stage 2: Serve the application with Nginx ---
FROM nginx:alpine

# Copy the custom Nginx configuration
# You MUST create this file at frontend/nginx.conf (content provided below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the builder stage to Nginx's HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
