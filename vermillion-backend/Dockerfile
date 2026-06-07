FROM php:8.2-cli

# Install ekstensi sistem yang dibutuhkan Laravel
RUN apt-get update -y && apt-get install -y libmcrypt-dev git unzip libpq-dev libmariadb-dev

# Install ekstensi PHP untuk MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /app
COPY . .

# Install dependensi Laravel
RUN composer install --optimize-autoloader --no-dev

# Beri izin pada folder storage
RUN chmod -R 777 storage bootstrap/cache

# Perintah untuk menjalankan server
CMD php artisan serve --host=0.0.0.0 --port=$PORT