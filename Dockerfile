FROM oven/bun

WORKDIR /build

COPY . ./build

RUN bun install
RUN bun run build

# Don't run production as root
RUN addgroup --system --gid 1001 bunjs
RUN adduser --system --uid 1001 elysiajs
USER elysiajs

# Set environment variables
ENV NODE_ENV=production
ENV PORT 3000
ENV HOSTNAME localhost
EXPOSE 3000
CMD ["bun", "src/index.ts"]