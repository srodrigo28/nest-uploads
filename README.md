* https://www.udemy.com/course/nestjs-completo/learn/lecture/47025273#overview


#### Criando Api Next Imagens base

* Criando projeto
```
npx nest new project
```

* Rodando o projeto
```
npm run start:dev
```

#### Criando endAPI Users

* endpoint api users
```
npx nest g res users
```

#### Criando endAPI Tasks

* endpoint api tasks
```
npx nest g res tasks
```

#### Upload One Image
npm install multer
npm install --save-dev @types/multer

#### Upload Multiplas Imagens
* ok

#### Validando uploads
* ok

#### Criando url Estáticas
* dependêncie
```
npm install --save @nestjs/serve-static
```

* link::
```
https://docs.nestjs.com/recipes/serve-static
```

* config app.module.ts
```
    imports: [UsersModule, UsersModule, 
        ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', '..', 'files'),
        serveRoot: "/files"
    })],
```

* rota gerada
```
http://localhost:8080/files/image.png
```

##### Nest MVC
```
https://docs.nestjs.com/techniques/mvc
```

```
http://localhost:8080/files/image.mp4
```

#### Prisma ORM
```
npm install prisma --save-dev
```

```
npm install @prisma/client
```

* gerando o Prisma Schema
```
npx prisma init
```

* gerando o Prisma Criando ou atualizando tabela
```
npx prisma migrate
```

* gerando o Prisma Studio Gerenciador db
```
npx prisma studio
```

#### Relacionando imagem e usuário
