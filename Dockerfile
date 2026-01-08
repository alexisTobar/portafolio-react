# Capa 1: PHP y Apache
FROM php:8.2-apache

# Instalamos solo lo esencial del sistema
RUN apt-get update && apt-get install -y \
    libpng-dev zlib1g-dev libxml2-dev libzip-dev zip unzip curl \
    && docker-php-ext-install pdo_mysql gd zip

# Instalamos Node.js de forma ligera
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Configuración de Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

# Copiamos archivos
COPY . /var/www/html
WORKDIR /var/www/html

# Instalamos Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# --- OPTIMIZACIÓN DE MEMORIA ---
# Instalamos PHP primero
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Instalamos JS y compilamos (limpiando caché para ahorrar espacio)
RUN npm install && npm run build && rm -rf node_modules

# Permisos finales
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80