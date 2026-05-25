<!-- DEPRECATION-BANNER:START -->
{% hint style="warning" %}
**⚠️ These docs are moving to a new home.** Preview the new site at [docs-preview.gokite.ai](https://docs-preview.gokite.ai). At cutover, this site will redirect there automatically. File issues against [gokite-ai/kite-docs](https://github.com/gokite-ai/kite-docs).
{% endhint %}
<!-- DEPRECATION-BANNER:END -->

# Development Setup

This directory contains development and build tools for the Kite Documentation.

## Files

- `docker-compose.yml` - Docker Compose configuration for running GitBook
- `Dockerfile` - Docker image configuration for GitBook
- `run-gitbook.sh` - Shell script to run GitBook locally
- `run-gitbook-docker.sh` - Shell script to run GitBook with Docker

## Usage

### Using Docker (Recommended)
```bash
# From project root
docker-compose up
```

### Using Local GitBook
```bash
# From project root
./dev/run-gitbook.sh
```

### Using Docker Script
```bash
# From project root
./dev/run-gitbook-docker.sh
```

## Access

Once running, the documentation will be available at:
- Local: http://localhost:4000
- Docker: http://localhost:4000
