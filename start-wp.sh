#!/bin/bash

# Configuration
DB_NAME="wordpress"
DB_USER="root"
DB_PASS=""
DB_HOST="localhost"
WP_PORT="8000"

echo "Check for PHP..."
if ! command -v php &> /dev/null; then
    echo "PHP could not be found. Please install php."
    exit 1
fi

echo "Check for MySQL..."
if ! command -v mysql &> /dev/null; then
    echo "MySQL could not be found. Please install mysql."
    exit 1
fi

# Start MySQL if not running
if ! pgrep -x "mysqld" > /dev/null; then
    echo "Starting MySQL..."
    brew services start mysql
    sleep 5
fi

# Create Database if it doesn't exist
echo "Creating database if it doesn't exist..."
mysql -u "$DB_USER" -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

# Configure wp-config.php
if [ ! -f wordpress/wp-config.php ]; then
    echo "Configuring wp-config.php..."
    cp wordpress/wp-config-sample.php wordpress/wp-config.php
    
    # Update Database Details
    sed -i '' "s/database_name_here/$DB_NAME/" wordpress/wp-config.php
    sed -i '' "s/username_here/$DB_USER/" wordpress/wp-config.php
    sed -i '' "s/password_here/$DB_PASS/" wordpress/wp-config.php
    sed -i '' "s/localhost/$DB_HOST/" wordpress/wp-config.php

    # Generate Salts (simple method for local dev)
    # Ideally use wp-cli or fetch from api, but for local dev random strings are fine
    # Using perl to generate random strings for salts
    perl -i -pe 's/put your unique phrase here/sprintf("%08x%08x%08x%08x", rand(0xffffffff), rand(0xffffffff), rand(0xffffffff), rand(0xffffffff))/ge' wordpress/wp-config.php
fi

echo "Starting WordPress on http://localhost:$WP_PORT"
echo "Press Ctrl+C to stop."
php -S localhost:$WP_PORT -t wordpress
