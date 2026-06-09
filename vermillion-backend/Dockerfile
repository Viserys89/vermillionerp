FROM php:8.2-cli

# Install ekstensi sistem + library untuk memproses gambar JPEG/PNG
RUN apt-get update -y && apt-get install -y \
    libmcrypt-dev git unzip libpq-dev libmariadb-dev \
    libpng-dev libjpeg-dev libfreetype6-dev

# Install ekstensi PHP (PDO dan GD untuk gambar)
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Naikkan limit ukuran file upload PHP menjadi 50MB
RUN echo "upload_max_filesize = 50M" > /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size = 50M" >> /usr/local/etc/php/conf.d/uploads.ini

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /app
COPY . .

# Install dependensi Laravel
RUN composer install --optimize-autoloader --no-dev

# Beri izin pada folder storage
RUN chmod -R 777 storage bootstrap/cache

# ==========================================
# TAMBAHAN BARU: Buat jalan pintas (symlink) 
# agar folder storage bisa diakses dari web (Mencegah 404)
# ==========================================
RUN php artisan storage:link

# Perintah untuk menjalankan server
CMD php artisan serve --host=0.0.0.0 --port=$PORT