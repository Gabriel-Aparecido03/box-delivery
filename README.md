
<br>


<p align="center">
  <h1>Box Delivery</h1>
  <img alt="Proffy" src="https://github.com/Gabriel-Aparecido03/box-delivery/assets/67979742/c09fd45c-a7dd-4d99-87ed-c8b9134f69bc" width="100%">
</p>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Nest.js](https://docs.nestjs.com/)
- [React](https://reactjs.org)

## 💻 Projeto

Box.delivery é uma plataforma para controle de encomendas .

#### Regra da aplicação

- [x] A aplicação deve ter dois tipos de usuário, entregador e/ou admin. </br>
- [x] - Deve ser possível realizar login com CPF e Senha. </br>
- [x] - Deve ser possível realizar o CRUD dos entregadores. </br>
- [x] - Deve ser possível realizar o CRUD das encomendas. </br>
- [x] - Deve ser possível realizar o CRUD dos destinatários. </br>
- [x] - Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada). </br>
- [x] - Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada). </br>
- [x] - Deve ser possível marcar uma encomenda como entregue. </br>
- [x] - Deve ser possível marcar uma encomenda como devolvida. </br>
- [x] - Deve ser possível listar as encomendas com endereços de entrega próximo ao local do entregador </br>
- [x] - Deve ser possível alterar a senha de um usuário </br>
- [x] - Deve ser possível listar as entregas de um usuário </br>


#### Regra de negócio

- [x] - Somente usuário do tipo admin pode realizar operações de CRUD nas encomendas </br>
- [x] - Somente usuário do tipo admin pode realizar operações de CRUD nas encomendas </br>
- [x] - Somente usuário do tipo admin pode realizar operações de CRUD dos destinatários </br>
- [x] - Somente o entregador que retirou a encomenda pode marcar ela como entregue </br>
- [x] - Deve ser possível realizar o CRUD dos destinatários. </br>
- [x] - - Não deve ser possível um entregador listar as encomendas de outro entregador </br>
- [x] - Somente o admin pode alterar a senha de um usuário </br>

## 🤓 Pattern, Metodologias e etc .

#### Backend
 - Clean Architure ( Presenter , Controllers, use cases , entities e etc. )
 - Domain Events
 - SOLID principles
 - Conceitos de DDD
 - Conceitos de TDD ( testes unitários e testes e2e )
 - Integração com banco de dados
 - Factories Pattern
 - Rotas públicas , rotas privadas

#### Frontend
 - Testes unitários ( React Testing library ) e Testes e2e ( Playwright )
 - Testes mockados 
 - Controle de estados ( Local State , URL State, HTTP State e Global State )
 - Controle de Cookies
 - Compound Pattern
 - Container/Presentational Pattern
 - Render Props Pattern 

## 📁 Instalação 
```
  git clone https://github.com/Gabriel-Aparecido03/box-delivery
```

#### Frontend
```
  cd web
  npm i
  npm run dev ou npm run dev:mock
```

#### Backend
```
  cd server
  dcoker compose up -d
  npm i
  npx prisma migrate dev
  npm run start:dev
```
Feito com ♥ by Gabriel
<!--START_SECTION:footer-->

<br />
<br />
