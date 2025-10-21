#!/bin/bash

echo "🐳 Running GitBook with Docker..."
echo "=================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose found"

# Build and run the container
echo "🔧 Building GitBook container..."
docker-compose up --build

echo ""
echo "🎉 GitBook is now running at: http://localhost:4000"
echo "📖 Your documentation should be accessible in your browser"
echo ""
echo "💡 To stop the server, press Ctrl+C" 