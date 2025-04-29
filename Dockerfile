# Base image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]
