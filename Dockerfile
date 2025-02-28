# Use Node.js to build the Next.js app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Install only production dependencies
RUN npm ci --only=production

# Create a lightweight production image
FROM node:18-alpine AS runner
WORKDIR /app

# Copy built app from builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json

# Install Nginx
RUN apk add --no-cache nginx

# Copy Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000
EXPOSE 3000

# Start Next.js app
CMD ["npm", "run", "start"]
