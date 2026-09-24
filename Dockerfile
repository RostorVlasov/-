# Node.js LTS base image
FROM node:22-alpine

WORKDIR /app

# Install dependencies first for layer caching
COPY package*.json ./
RUN npm ci

# Copy application source code
COPY . .

# Build frontend production assets
RUN npm run build

# Expose port 2026
EXPOSE 2026

# Set environment
ENV NODE_ENV=production
ENV PORT=2026

# Start server
CMD ["npm", "start"]
