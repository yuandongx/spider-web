FROM node:18-alpine AS builder

COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build


FROM nginx:1.23-alpine

COPY --from=builder /app/dist /app/dist
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]

