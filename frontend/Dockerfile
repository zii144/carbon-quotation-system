# Step 1: Build React App
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install && npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Copy build files from builder stage to Nginx directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config (for React routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
