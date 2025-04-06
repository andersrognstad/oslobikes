# Build frontend
FROM node:22 AS builder
WORKDIR /app
COPY frontend ./frontend
RUN cd frontend && npm install && npm run build

# Build backend and copy built frontend
FROM node:22
WORKDIR /app

COPY backend ./backend
COPY --from=builder /app/frontend/dist ./backend/public

WORKDIR /app/backend
RUN npm install

EXPOSE 5000
CMD ["node", "server.js"]