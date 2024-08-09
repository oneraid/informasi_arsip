This is landing page website and CRUD upload image

## Getting Started

First, go to the laravel directory and install the dependencies:

```bash
cd laravel
composer install
```

second, go to .env file

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=data_arsip (change with your database name)
DB_USERNAME=root
DB_PASSWORD=
```

and than run in terminal

```bash
php artisan migrate:fresh
```

---

go to the frontend directory and install the dependencies:

```bash
cd react
npm install
```

### Start

for laravel

```bash
php artisan serve
```

for react

```bash
npm run dev
```
