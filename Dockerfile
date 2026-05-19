# Build stage
FROM node:20-slim AS build

WORKDIR /app

# Match the repo's pinned package manager version for deterministic builds
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

# Copy package files
COPY package*.json pnpm-lock.yaml* ./

# Install dependencies from the lockfile without mutating it
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM nginx:stable-alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration if you have one, or use a basic one for SPA
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
