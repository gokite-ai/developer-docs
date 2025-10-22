#!/bin/bash

# GitBook Runner Script
# This script helps run GitBook with proper Node.js version handling

echo "🪁 Kite Documentation - GitBook Runner"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "book.json" ]; then
    echo "❌ Error: book.json not found. Please run this script from the documentation root directory."
    exit 1
fi

echo "✅ Found book.json - GitBook configuration detected"

# Try to run GitBook with different approaches
echo "🔧 Attempting to run GitBook..."

# Method 1: Try direct gitbook command
if command -v gitbook &> /dev/null; then
    echo "📚 Method 1: Using installed GitBook CLI..."
    gitbook install
    if [ $? -eq 0 ]; then
        echo "✅ GitBook installed successfully!"
        echo "🚀 Starting GitBook server..."
        gitbook serve
        exit 0
    else
        echo "❌ GitBook installation failed"
    fi
fi

# Method 2: Try with npx
echo "📚 Method 2: Using npx gitbook-cli..."
npx gitbook-cli install
if [ $? -eq 0 ]; then
    echo "✅ GitBook installed successfully!"
    echo "🚀 Starting GitBook server..."
    npx gitbook-cli serve
    exit 0
else
    echo "❌ npx gitbook-cli failed"
fi

# Method 3: Try with legacy Node.js version
echo "📚 Method 3: Attempting with Node.js version compatibility..."
echo "💡 If this fails, you may need to install Node.js v16 or v18"
echo "   You can use: brew install node@16 or brew install node@18"

# Try to use a compatible Node.js version if available
if command -v node@16 &> /dev/null; then
    echo "🔧 Using Node.js v16..."
    node@16 $(which gitbook) install
    node@16 $(which gitbook) serve
elif command -v node@18 &> /dev/null; then
    echo "🔧 Using Node.js v18..."
    node@18 $(which gitbook) install
    node@18 $(which gitbook) serve
else
    echo "❌ No compatible Node.js version found"
    echo ""
    echo "🔧 Solutions:"
    echo "1. Install Node.js v16: brew install node@16"
    echo "2. Install Node.js v18: brew install node@18"
    echo "3. Use nvm to switch Node.js versions"
    echo "4. Use Docker with an older Node.js image"
    echo ""
    echo "📖 Alternative: Use a modern documentation generator like:"
    echo "   - Docusaurus (React-based)"
    echo "   - VuePress (Vue-based)"
    echo "   - MkDocs (Python-based)"
    echo ""
    echo "🎯 For now, you can preview the styling at: http://localhost:8000/preview.html"
fi 