# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies, including TypeScript
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Ensure the .env file is copied
COPY .env .env

# Build the TypeScript code
RUN tsc

# Expose the port (if your application needs it)
# EXPOSE 8080

# Command to run the built JavaScript file
CMD ["node", "dist/index.js"]
