#!/bin/bash

# Configuration (matching start-wp.sh)
DB_NAME="wordpress"
DB_USER="root"
DB_PASS=""

echo "⚠️  Starting WordPress Reset..."

# 1. Drop Database
echo "Dropping database: $DB_NAME..."
mysql -u "$DB_USER" -e "DROP DATABASE IF EXISTS $DB_NAME;"
echo "Database dropped."

# 2. Delete wp-config.php
if [ -f wordpress/wp-config.php ]; then
    echo "Deleting wp-config.php..."
    rm wordpress/wp-config.php
fi

# 3. Clear Uploads
if [ -d wordpress/wp-content/uploads ]; then
    echo "Clearing media uploads..."
    rm -rf wordpress/wp-content/uploads/*
fi

echo "✅ WordPress has been reset. You can now run 'bash start-wp.sh' to start fresh."
