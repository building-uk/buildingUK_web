# ============================================
# Stage 1: Build the Frontend (Vite + React)
# ============================================
FROM node:20-alpine AS frontend-build

WORKDIR /app

# Copy package files for the frontend
COPY package*.json ./

# Install dependencies
RUN npm config set fetch-retry-maxtimeout 600000 && \
    npm config set fetch-retry-mintimeout 100000 && \
    npm ci

# Copy frontend source code (buildinguk/ excluded by stage context)
COPY index.html ./
COPY vite.config.js ./
COPY public ./public
COPY src ./src

# Accept build args for Vite env vars
ARG VITE_SANITY_PROJECT_ID
ARG VITE_SANITY_DATASET
ARG VITE_SANITY_API_VERSION
ARG VITE_WEB3FORMS_ACCESS_KEY

# Build the frontend
RUN npm run build

# ============================================
# Stage 2: Build Sanity Studio
# ============================================
FROM node:20-alpine AS studio-build

WORKDIR /app

# Copy Sanity Studio files
COPY buildinguk/package*.json ./

# Install dependencies
RUN npm config set fetch-retry-maxtimeout 600000 && \
    npm config set fetch-retry-mintimeout 100000 && \
    npm ci

# Copy Sanity source
COPY buildinguk/ .

# Build Sanity Studio (outputs to dist/)
RUN npm run build

# ============================================
# Stage 3: Serve both with Nginx
# ============================================
FROM nginx:stable-alpine

# Copy frontend build
COPY --from=frontend-build /app/dist /usr/share/nginx/html

# Copy Sanity Studio build under /studio
COPY --from=studio-build /app/dist /usr/share/nginx/html/studio

# Custom Nginx config: SPA routing for both frontend and studio
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 80;
    server_name _;

    # Frontend - SPA routing
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Sanity Studio - SPA routing
    location /studio {
        alias /usr/share/nginx/html/studio;
        index index.html;
        try_files $uri $uri/ /studio/index.html;
    }
}
EOF

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
