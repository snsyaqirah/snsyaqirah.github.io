# Nginx Dockerfile for Static Website
FROM nginx:alpine

# Copy website files to nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Nginx will automatically serve files from /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
