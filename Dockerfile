# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json. This is done before copying the rest of the code. WHY?
# To optimize Docker's build cache. HOW?
# Copying only the package files first, allows Docker to cache the layer where dependencies are installed (RUN npm install). If you later change your app’s source code but don’t change your dependencies, Docker will reuse the cached layer and skip re-installing dependencies—making builds much faster.
COPY package*.json ./

# Install only the production dependencies (no dev dependencies).
RUN npm install --production

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
