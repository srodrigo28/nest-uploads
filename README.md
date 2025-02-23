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

#### Criando endAPI

* endpoint api users
```
npx nest g res users
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

#### Relacionando imagem e usuário
