# Use an official Node.js runtime as the parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript code (if your dev script doesn't handle it on the fly, or for prod-like build)
# If 'npm run dev' intrinsically handles TS compilation/transpilation, you might not strictly need 'npm run build' here.
# However, a common pattern for production-ready Docker images is to compile TS once.
# If your 'npm run dev' directly runs ts-node-dev, then skip `npm run build` and adjust CMD.
# Given you previously had a `build` script in package.json, this is safer:
RUN npm run build # Assuming 'build' script compiles your TypeScript to JavaScript

# Expose the port your backend runs on
EXPOSE 5000

# Command to run the application using your dev script
CMD ["npm", "run", "dev"]
