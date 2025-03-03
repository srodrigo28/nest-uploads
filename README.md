#### API Revisão 03

#### 1.0 JWT camada auth
``` revisar
https://www.udemy.com/course/nestjs-completo/learn/lecture/47024777#questions
```
nest g module auth
npm i bcryptjs
npm i --save-dev @types/bcryptjs



##### 1.2 aplicando o servico auth/hash
* no users.service.ts
```
constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol
  ){}
```

* na função de cadastrar um usuário com cripto
```
// com criptor
  async createCriptor(createUserDto: CreateUserDto) {
    try{
      const passwordHash = await this.hashingService.hash(createUserDto.password)
      const user = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          passwordHash: passwordHash
        },
        select:{ id:true, name: true, email: true, passwordHash: true }
      })
      return user;
    }catch(error){
      console.log(error)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }
  }
```

* no users.controller.ts
```
@Post("/cripto") // com cript
  createUserCript(@Body() createUserDto: CreateUserDto){
    return this.userService.createCriptor(createUserDto)
}
```

#### Docs
<img src="./screens/swagger.png" alt="swagger" />

* Link ref
``` 4min
link: https://www.udemy.com/course/nestjs-completo/learn/lecture/47024389#questions
```

* Nest Config
``` https://www.udemy.com/course/nestjs-completo/learn/lecture/47024699#questions
npm i --save @nestjs/config
```

* Ref.
```
https://www.udemy.com/course/nestjs-completo/learn/lecture/47025763#questions
```
