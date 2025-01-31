FROM node:22-alpine

WORKDIR /app

# First install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Set environment variable for build time
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build the application
RUN npm run build

EXPOSE 3000

# Set environment variable for runtime
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

CMD ["npm", "start"]
