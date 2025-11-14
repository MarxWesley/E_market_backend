# 🛒 E-Market API

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS Badge">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL Badge">
  <img src="https://img.shields.io/badge/TypeORM-FF4785?style=for-the-badge&logo=typeorm&logoColor=white" alt="TypeORM Badge">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT Badge">
</p>

## 📝 Descrição do Projeto

O **E-Market API** é o *back-end* robusto e escalável desenvolvido para suportar o aplicativo móvel **E-Market**, construído em React Native. Este projeto é uma API RESTful que gerencia todas as operações de dados, incluindo autenticação de usuários, gerenciamento de produtos, itens, veículos, e listas de favoritos.

A arquitetura é baseada no *framework* **NestJS**, que utiliza o poder do TypeScript e segue o padrão de projeto *Model-View-Controller* (MVC) de forma modular, garantindo alta manutenibilidade e testabilidade. A persistência de dados é realizada com **PostgreSQL**, utilizando o **TypeORM** como *Object-Relational Mapper* (ORM) para manipulação segura e eficiente do banco de dados.

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia | Versão Principal | Descrição |
| :--- | :--- | :--- | :--- |
| **Framework** | NestJS | 10.x | Framework Node.js progressivo para construir aplicações *server-side* eficientes e escaláveis. |
| **Linguagem** | TypeScript | 5.x | Superset do JavaScript que adiciona tipagem estática. |
| **Banco de Dados** | PostgreSQL | 16.x | Sistema de gerenciamento de banco de dados objeto-relacional robusto. |
| **ORM** | TypeORM | 0.3.x | ORM para TypeScript e JavaScript que suporta padrões *Active Record* e *Data Mapper*. |
| **Autenticação** | JWT (JSON Web Tokens) | - | Padrão aberto para troca de informações de forma segura entre partes. |
| **Criptografia** | Bcrypt | - | Biblioteca para *hashing* de senhas. |
| **Validação** | Class-Validator | - | Biblioteca para validação de dados em classes. |

## 🚀 Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

Você precisará ter instalado em sua máquina:

*   Node.js (versão 18 ou superior)
*   npm ou yarn
*   PostgreSQL (servidor rodando localmente ou via Docker)

### 1. Clonar o Repositório

```bash
git clone https://github.com/MarxWesley/E_market_backend
cd E_market_backend
```

### 2. Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 3. Criar o Banco de Dados

Antes de configurar as variáveis de ambiente, é **obrigatório** que o banco de dados `emarket_db` (ou o nome que você definir) seja criado no seu servidor PostgreSQL.

**Exemplo de comando SQL para criação:**

```sql
CREATE DATABASE emarket_db;
```

### 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto, baseado no arquivo `.env.example` (se existir), e preencha com suas configurações, utilizando as credenciais do banco de dados que você acabou de criar.

**Exemplo de `.env`:**

```env
# Configurações da Aplicação
PORT=3000

# Configurações do Banco de Dados (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_postgres
DB_DATABASE=emarket_db

# Configurações de Autenticação JWT
JWT_SECRET=sua_chave_secreta_muito_forte
JWT_EXPIRATION_TIME=3600s # 1 hora
```

### 5. Executar Migrations do Banco de Dados

O TypeORM será responsável por criar a estrutura do banco de dados.

```bash
# Executa as migrations pendentes
npm run typeorm:run-migrations
# ou
yarn typeorm:run-migrations
```

### 6. Iniciar a Aplicação

#### Modo Desenvolvimento (com *hot-reload*)

```bash
npm run start:dev
# ou
yarn start:dev
```

A API estará acessível em `http://localhost:3000`.

#### Modo Produção

```bash
# Compila o código TypeScript para JavaScript
npm run build
# Inicia a aplicação compilada
npm run start:prod
```

## 📖 Documentação da API (Swagger)

A documentação interativa da API, gerada automaticamente pelo Swagger, estará disponível após a execução do projeto no seguinte endereço:

[http://localhost:3000/e_market/swagger](http://localhost:3000/e_market/swagger)

## 📂 Estrutura de Pastas

A estrutura do projeto, conforme a imagem fornecida, segue o padrão modular do NestJS.

```
E_market_backend/
├── node_modules/
├── src/
│   ├── app/              # Módulo principal da aplicação
│   ├── auth/             # Módulo de Autenticação (Login, JWT)
│   ├── favorites/        # Módulo de Favoritos (CRUD)
│   ├── item/             # Módulo de Itens (CRUD)
│   ├── product/          # Módulo de Produtos (CRUD)
│   ├── users/            # Módulo de Usuários (CRUD)
│   ├── vehicle/          # Módulo de Veículos (CRUD)
│   ├── main.ts           # Ponto de entrada da aplicação
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

## 🔒 Autenticação (JWT)

A API utiliza **JSON Web Tokens (JWT)** para autenticação e autorização.

1.  **Login:** O usuário envia credenciais (`email` e `password`).
2.  **Validação:** A senha é verificada usando **Bcrypt**.
3.  **Token:** Um JWT é gerado e retornado ao cliente.
4.  **Acesso Protegido:** O cliente deve incluir o token no cabeçalho `Authorization` (formato `Bearer <token>`) para acessar rotas protegidas.

**Endpoint de Autenticação:**

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/auth/login` | Autentica o usuário e retorna o JWT. |

## 🧩 CRUDs Implementados e Regras de Negócio

A API implementa as seguintes entidades com operações CRUD (Create, Read, Update, Delete), cada uma com regras de negócio específicas.

### 1. Users (Usuários)

| Regra de Negócio | Descrição |
| :--- | :--- |
| **RN1: Email Único** | O email de cadastro deve ser único em todo o sistema. Tentativas de cadastro com email duplicado devem retornar erro. |
| **RN2: Senha Segura** | A senha deve ser criptografada usando **Bcrypt** antes de ser salva no banco de dados. |
| **RN3: Auto-Exclusão** | Um usuário só pode deletar sua própria conta. A exclusão de um usuário deve ser uma exclusão suave (*soft delete*). |

### 2. Products (Produtos)

| Regra de Negócio | Descrição |
| :--- | :--- |
| **RN1: Estoque Positivo** | A quantidade em estoque (`stock_quantity`) não pode ser negativa. Tentativas de atualização que resultem em estoque negativo devem ser rejeitadas. |
| **RN2: Preço Mínimo** | O preço (`price`) de um produto deve ser sempre maior que zero. |
| **RN3: Produto Ativo** | Apenas produtos com o status `is_active: true` devem ser retornados nas listagens públicas. |

### 3. Favorites (Favoritos)

| Regra de Negócio | Descrição |
| :--- | :--- |
| **RN1: Produto Existente** | Um favorito só pode ser criado se o `product_id` referenciar um produto ativo e existente. |
| **RN2: Favorito Único** | Um usuário não pode adicionar o mesmo produto mais de uma vez à sua lista de favoritos. |
| **RN3: Remoção Automática** | Se um produto for deletado (ou desativado), ele deve ser automaticamente removido da lista de favoritos de todos os usuários. |

### 4. Items (Itens)

| Regra de Negócio | Descrição |
| :--- | :--- |
| **RN1: Item Vinculado** | Todo item deve estar obrigatoriamente vinculado a um `product_id` existente. |
| **RN2: Nome Único por Produto** | O nome de um item deve ser único dentro do escopo do produto ao qual pertence. |
| **RN3: Quantidade Mínima** | A quantidade de um item não pode ser menor que 1. |

### 5. Vehicles (Veículos)

| Regra de Negócio | Descrição |
| :--- | :--- |
| **RN1: Ano de Fabricação Válido** | O ano de fabricação (`year`) não pode ser futuro. |
| **RN2: Vinculado a um Usuário** | Todo veículo deve estar associado a um `user_id` existente. |

## 🔗 Integração com o Aplicativo React Native

O **E-Market API** foi projetado para ser o único ponto de comunicação de dados para o aplicativo móvel **E-Market (React Native)**.

1.  **Base URL:** Todas as requisições do aplicativo devem ser direcionadas para a *Base URL* da API: `http://localhost:3000` (em desenvolvimento).
2.  **Comunicação Segura:** O aplicativo deve armazenar o JWT de forma segura (ex: AsyncStorage ou SecureStore) e enviá-lo em todas as requisições protegidas.
3.  **Formato de Dados:** A API retorna dados padronizados em formato JSON, otimizados para consumo em dispositivos móveis.

## ⚙️ Comandos Úteis

| Comando | Descrição |
| :--- | :--- |
| `npm run start:dev` | Inicia a aplicação em modo de desenvolvimento com *hot-reload*. |
| `npm run build` | Compila o código TypeScript para a pasta `dist`. |
| `npm run start:prod` | Inicia a aplicação compilada em modo de produção. |
| `npm run typeorm:run-migrations` | Executa todas as migrations pendentes no banco de dados. |
| `npm run typeorm:generate -- name` | Gera um novo arquivo de migration com o nome especificado. |
| `npm run typeorm:revert-migrations` | Reverte a última migration executada. |
| `npm run lint` | Executa o linter para verificar a qualidade do código. |
| `npm run test` | Executa os testes unitários e de integração. |

## 🐳 Execução com Docker (Opcional)

Para facilitar a execução em ambientes isolados, você pode utilizar o Docker e Docker Compose.

### 1. Criar o arquivo `docker-compose.yml`

```yaml
version: '3.8'
services:
  db:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_DATABASE}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build:
      context: .
      dockerfile: Dockerfile
    depends_on:
      - db
    restart: always
    env_file:
      - .env
    ports:
      - "3000:3000"
    command: sh -c "npm run typeorm:run-migrations && npm run start:prod"

volumes:
  postgres_data:
```

### 2. Criar o `Dockerfile`

```dockerfile
# Estágio de Build
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio de Produção
FROM node:18-alpine AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

### 3. Iniciar os Containers

Certifique-se de que seu arquivo `.env` esteja configurado.

```bash
docker-compose up -d
```

## 📬 Collection do Postman

Para testar todos os endpoints da API, utilize a *Collection* do Postman que deve estar no seu projeto. Se não houver, você pode criar uma e exportá-la para a pasta `/postman`.

**Exemplo de caminho:**

```
/postman/E-Market.postman_collection.json
```

## 🎓 Informações do Curso e Autores

Este projeto foi desenvolvido como parte das atividades da disciplina.

| Detalhe | Informação |
| :--- | :--- |
| **Autores** | [Pedro Vinícius](https://github.com/pedrovmdp) e [Wesley Marques](https://github.com/MarxWesley)|
| **Curso** | [Sistemas de Informação] |
| **Disciplina** | Desenvolvimento de Aplicações Web e Mobile |
| **Professor** | [Anderson Furlan] |
| **Porta Padrão da API** | `http://localhost:3000` |
| **Status** | Projeto Concluído |
