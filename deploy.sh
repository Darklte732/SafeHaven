#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🏗️ Building the application..."
npm run build

# Run type checking
echo "🔍 Running type checks..."
npm run type-check

# Run linting
echo "🧹 Running linter..."
npm run lint

# Start the application
echo "🌟 Starting the application..."
npm start 