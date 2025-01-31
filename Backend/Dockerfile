FROM node:22-alpine

WORKDIR /app

# Install netcat for database connection checking
RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

# Make start script executable
COPY start.sh .
RUN chmod +x start.sh

EXPOSE 5000

CMD ["./start.sh"]
