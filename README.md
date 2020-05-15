<h1 align="center">
    GoBarber
</h1>

<p align="center">
  <img src="https://github.com/jviniciusoliveira/rocketseat-app-gobarber-api/blob/master/.github/logo.PNG" />
</p>

## **Sobre**

Este é o repositório da API do App GoBarber, desenvolvido durante o treinamento (Bootcamp) da [Rocketseat](https://rocketseat.com.br/), utilizando **_Nodejs_**.

_**App GoBarber**_

_O aplicativo GoBarber possibilita o agendamento de horários por clientes de barbearias via aplicativo mobile e o controle da agenda via web._

## **Recursos**

- Cadastro de usuário
- Autenticação
- Atualização de perfil
- Upload de imagem para perfil
- Cadastro de Agendamentos
- Cancelamento de Agendamentos
- Listagem de Agendamentos
- Listagem de horários disponíveis
- Envio de e-mail de cancelamento
- Serviço de Fila
- Monitoramento de falhas com Sentry
- Serviço de Cache

## **Instalação**

### **Docker**

#### **Pré-requisitos**

- Docker

#### **Comandos**

- Clonar o repositório: `git clone https://github.com/jviniciusoliveira/rocketseat-app-gobarber-api.git`
- Acessar o diretório: `cd rocketseat-app-gobarber-api'`
- Renomear o arquivo `.env.exemplo` para `.env` e preencher as variáveis de ambiente
- Rodar Docker Compose: `docker-compose up`

### **Local**

#### **Pré-requisitos**

- Node
- Yarn
- Postgres
- MongoDB
- Redis

#### **Comandos**

- Clonar o repositório: `git clone https://github.com/jviniciusoliveira/rocketseat-app-gobarber-api.git`
- Acessar o diretório: `cd rocketseat-app-gobarber-api'`
- Instalar as dependências: `yarn`
- Iniciar o banco de dados Postgres
- Iniciar o banco de dados MongoDB
- Iniciar o Redis: `docker run --name redis -p 6379:6379 -d -t redis:alpine`
- Renomear o arquivo `.env.exemplo` para `.env` e preencher as variáveis de ambiente
- Executar migrations: `yarn sequelize db:migrate`
- Iniciar a aplicação: `yarn dev`
- Iniciar serviço de fila: `yarn queue` (Executar em outra aba do Terminal)

## **Testando a API**

- Teste a API usando aplicativos como o Insomia / Postman ou usando a aplicação _GoBarber Web_ disponível no respositório [aqui](https://github.com/jviniciusoliveira/rocketseat-app-gobarber-web).
