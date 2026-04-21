FROM node:20-bookworm-slim

WORKDIR /app

# Install system dependencies (Prisma + PostgreSQL tools)
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build NestJS app
RUN npm run build

# Create non-root user and make entrypoint executable
RUN useradd -m appuser
RUN chmod +x entrypoint.sh
USER appuser

EXPOSE 5000

CMD ["./entrypoint.sh"]