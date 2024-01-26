FROM oven/bun AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /build
COPY bun.lockb package.json ./
RUN bun install --ci

# Build public/ files (i.e. tailwind output)
FROM deps as build
COPY bun.lockb package.json tailwind.config.ts ./
COPY public/ ./public/
COPY src/ ./src/
COPY app/ ./app/
RUN bun install
RUN bun run build

# Development image, copy all the files and run the server
FROM base AS run
WORKDIR /build

# Don't run production as root
RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 elysiajs
USER elysiajs

# Copy files
COPY --from=deps /build/node_modules/ ./node_modules/
COPY --from=build /build/public/ ./public/
COPY src/ ./src/
COPY app/ ./app/
COPY package.json tailwind.config.ts tsconfig.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT 3000
ENV HOSTNAME localhost
EXPOSE 3000
CMD ["bun", "src/index.ts"]