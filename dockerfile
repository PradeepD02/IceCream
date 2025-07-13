# Use a minimal Node image
FROM node:18-alpine

# Add git for npm install (some deps might need it)
RUN apk add --no-cache git

# Create app dir
WORKDIR /usr/src/app

# Copy package files & install only prod deps
COPY package*.json ./
RUN npm install --production

# Copy rest of app
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "index.js"]