* https://www.udemy.com/course/nestjs-completo/learn/lecture/47025273#overview

#### 1. Criando Api Next Imagens base

* Criando projeto
```
npx nest new project
```

#### 1.1 Rodando o projeto
```
npm run start:dev
```

#### 2. Prisma ORM
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

* Config .env --> Rodando SQLite
```
DATABASE_URL="file:./banco.db"
```

##### Config schema.prisma
* config conexão
```
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

* Primeta tabela
```
model Category{
  id    Int  @id @default(autoincrement())
  name String @unique

  created DateTime @default(now())
  updated DateTime @updatedAt()

  @@map("categoria")
}
```

* gerando o Prisma Criando ou atualizando tabela
```
npx prisma migrate
```

#### 2.1 Criando modulo de conexão
```
npx nest g module prisma --no-spec
```

* Criando modulo
```
npx nest g service prisma --no-spec
```

#### 2.2 Opcional Para visualizar e testar o banco
* gerando o Prisma Studio Gerenciador db
```
npx prisma studio
```

#### 4. Criando endAPI Users
```
npx nest g res users
```

#### 5. Validator DTOs

* Dependência
```
npm install class-validator class-transformer
```

* Aplicação nos DTOs exemplo
```
  import { IsBoolean, IsNotEmpty, IsString, IsEmail
      MaxLength, MinLength } from "class-validator";

  export class CreateUserDto {
      @IsString()
      @IsNotEmpty()
      @MinLength(5, { message: "maior que 5 caracteres" })
      @MaxLength(30, { message: "não pode ser maior que 30 caracteres" })
      readonly name: string;
      
      @IsString()
      @IsNotEmpty()
      @IsEmail()
      readonly email: string;
      
      @IsBoolean()
      completed?: boolean;
  }
```

* Dentro do main.ts
```
  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  import { ValidationPipe } from '@nestjs/common';

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(process.env.PORT ?? 8080);
  }
  bootstrap();
```

#### 6. Criando endAPI Tasks
```
npx nest g res tasks
```

#### X dentro da pasta auth/hash

* criar hashing.service.ts
```
export abstract class HashingServiceProtocol{
    abstract hash(password: string): Promise<string>; 
    abstract compare(password: string, passwordHash: string): Promise<boolean>;
}
```

* criar bcrypt.service.ts
```
import { HashingServiceProtocol } from "./hashing.service";
import * as bcrypt from 'bcryptjs'

export class BcryptService extends HashingServiceProtocol{
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.getSalt("2");
        return bcrypt.hash(password, salt)
    }
    async compare(password: string, passwordHash: string): Promise<boolean> {
        return bcrypt.compare(password, passwordHash)
    }
}
```

* carregar no auth.module.ts
```
import { Module } from '@nestjs/common';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';

@Global()
@Module({
    providers: [
        { provide: HashingServiceProtocol, useClass: BcryptService }
    ],
    exports: [ HashingServiceProtocol]
})
export class AuthModule {}
```

#### 7. Upload One Image
npm install multer
npm install --save-dev @types/multer

##### Upload Multiplas Imagens
* ok

##### Validando uploads
* ok

##### Criando url Estáticas
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


#### X. Nest MVC
```
https://docs.nestjs.com/techniques/mvc
```

```
http://localhost:8080/files/image.mp4
```

#### Documentação com Swagger

```
npm install --save @nestjs/swagger
```

```
npm install swagger-ui-express
```

* config no main.ts
```
  const configSwagger = new DocumentBuilder()
    .setDescription('API lista de tarefas')
    .setBasePath('localhost:8080')
    .setTitle('Lista de Tarefas')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('docs', app, documentFactory)
  ```

  * nest-cli.json
  ```
  "compilerOptions": {
    "deleteOutDir": true,
    "plugins": [
      "@nestjs/swagger/plugin"
    ]
  }
  ```

#### Relacionando imagem e usuário