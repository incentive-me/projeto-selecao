FROM php:8.2-apache

RUN apt-get update 
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

RUN apt-get update && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    npm install -g npm@10.5.0 

WORKDIR /var/www/html/

COPY . .

RUN npm install

RUN chmod -R 755 /var/www/html

EXPOSE 3000

CMD ["npm", "start"]