<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd 03-pokedex
```

2. Instalar Nest CLI:

```bash
npm i -g @nestjs/cli
```

3. Levantar la base de datos:

```bash
docker compose up -d
```

4. Ejecutar la aplicación:

```bash
yarn start:dev
```

5. Reconstruir la base de datos con la semilla

```bash
localhost:3000/api/v2/seed
```

