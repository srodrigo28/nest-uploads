#### Criando API Nest

* 1:: Script de criação
```
npx nest new api-name
```

* 2:: Entrando na pasta do projeto
```
cd api-name
```

* 3:: Rodando 1. Vez
```
npm run start:dev
```

#### Prisma Install
* 1
```
npm install prisma --save-dev
```

* 2
``` 
npm install @prisma/client
```

* 3
```
npx prisma init
```

* 4 Conexão inicial .env com sqlite
```
DATABASE_URL="file:./banco.db"
```

* 5 schema.prisma config provider banco sqlite
```
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

#### Prisma Entity e migrate

* 1 Entity User
```
model User{
  id    Int  @id @default(autoincrement())
  name String @unique
  email String @unique
  passwor String
  
  created DateTime @default(now())
  updated DateTime @updatedAt()
}
```

* 2 Prisma Migrate
```
npx prisma migrate dev
```