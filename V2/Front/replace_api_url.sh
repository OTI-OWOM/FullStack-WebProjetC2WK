#!/bin/sh

# Define the path where your built Angular files are located
ANGULAR_DIST_PATH=/usr/share/nginx/html

# Replace the placeholder with the environment variable
find $ANGULAR_DIST_PATH -type f -name '*.js' -exec sed -i "s|__API_URL__|$API_URL|g" {} \;
