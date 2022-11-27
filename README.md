### speedy

[![](https://img.shields.io/github/repo-size/wladimirgrf/speedy?color=%23FFB000&labelColor=000000)]()
[![](https://img.shields.io/github/last-commit/wladimirgrf/speedy?color=%23FFB000&labelColor=000000)](https://github.com/wladimirgrf/certification/commits/master)
[![](https://img.shields.io/github/issues/wladimirgrf/speedy?color=%23FFB000&labelColor=000000)](https://github.com/wladimirgrf/certification/issues)
[![](https://img.shields.io/github/license/wladimirgrf/speedy?color=%23FFB000&labelColor=000000)]()

Project developed for the Rocketseat Ignite (_Node.js Path_). This application is a simple REST API and It was built to manage package deliveries.

## 🌍 Ecosystem

Below the technologies, used to build this API:

|                      Name                                   |                         Status                          |
|:-----------------------------------------------------------:|:-------------------------------------------------------:|
|<img height="58" src="https://cdn.worldvectorlogo.com/logos/nodejs-1.svg"> | <img alt="node version" src="https://img.shields.io/badge/nodejs-v16.15-blue?color=%23FFB000&labelColor=000000"> |
|<img height="64" src="https://cdn.worldvectorlogo.com/logos/nestjs.svg"> | <img alt="nestjs version" src="https://img.shields.io/badge/nestjs-v8.0-blue?color=%23FFB000&labelColor=000000">|
|<img height="55" src="https://cdn.worldvectorlogo.com/logos/typescript.svg"> | <img alt="typescript version" src="https://img.shields.io/badge/typescript-v4.3-blue?color=%23FFB000&labelColor=000000"> |
|<img height="64" src="https://cdn.worldvectorlogo.com/logos/prisma-4.svg"> | <img alt="prisma version" src="https://img.shields.io/badge/prisma-v3.10-blue?color=%23FFB000&labelColor=000000"> |
|<img height="55" src="https://cdn.worldvectorlogo.com/logos/eslint-1.svg"> | <img alt="eslint version" src="https://img.shields.io/badge/eslint-v8.0-blue?color=%23FFB000&labelColor=000000"> |
|<img height="55" src="https://cdn.worldvectorlogo.com/logos/prettier-2.svg"> | <img alt="prettier version" src="https://img.shields.io/badge/prettier-v2.3-blue?color=%23FFB000&labelColor=000000"> |

## 🧱 ERM

![](.github/assets/diagram.png)

## ▶️ Getting started

**Requirements**

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL Container](https://www.postgresql.org/)

**Clone the project**
```bash
$ git clone https://github.com/wladimirgrf/speedy.git && cd speedy
```

**Install the Project dependencies**
```bash
$ npm install
```

**Environment configuration**
```bash
# Make a copy of '.env.sample'
# Fill it with your environment variables
$ cp .env.sample .env
```

**Run the container**
```bash
# Create the instance of postgreSQL using docker
$ docker run --name postgres -e POSTGRES_PASSWORD={password} -p 5432:5432 -d postgres
```

**Migrations**
```bash
$ npx prisma migrate dev
```

**Launch the Application**
```bash
$ npm start
```

>The API will be launch at `localhost` on the chosen port or on the default `3333`<br>


## 🤝 Contributing

**Fork the repository and clone your fork**

```bash
$ git clone fork-url && cd speedy
```

**Create a branch for your edits**
```bash
$ git checkout -b new-feature
```

**Make the commit with your changes**
```bash
$ git commit -m 'feat: New feature'
```

**Send the code to your remote branch**
```bash
$ git push origin new-feature
```

Create a pull request with your version. <br>
After your pull request is merged, you can delete your branch.


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

