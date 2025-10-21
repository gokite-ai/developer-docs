FROM node:16-alpine

# Install GitBook CLI
RUN npm install -g gitbook-cli

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY book.json ./

# Copy source files
COPY . .

# Install GitBook
RUN gitbook install

# Expose port
EXPOSE 4000

# Start GitBook
CMD ["gitbook", "serve", "--port", "4000"] 