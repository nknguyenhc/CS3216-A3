# Use official Node.js image as base image
FROM node:20 as frontend-build

# Set working directory
WORKDIR /app

# Copy package.json
COPY ./frontend/package.json .

# Install dependencies
RUN npm install --force

# Copy source code
COPY ./frontend .

# Build the app
RUN npm run build

# Use official Python image as base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements.txt
COPY ./backend/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy compiled files from build image
COPY --from=frontend-build /app/dist /app/dist

# Copy source code
COPY ./backend .

# Apply migrations
RUN python manage.py migrate

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 80

# Run the app
CMD ["gunicorn", "--bind", "0.0.0.0:80", "backend.wsgi:application"]
