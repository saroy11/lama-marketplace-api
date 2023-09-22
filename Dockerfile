# Use the official Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the backend code to the container
COPY . .

# Set environment variables if needed (e.g., MongoDB Atlas connection string)

# Expose the port that your backend server listens on (replace 5000 with your actual port)
EXPOSE 5000

# Command to start your backend server (replace "start" with your actual script to run the backend)
CMD ["npm", "start"]
