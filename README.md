<div id="top"></div>

<br />
<div align="center">
  <p align="center">
    A ideia aqui é manter o repositorio atualizado com todos os aprendizados que venho tendo sobre arquitetura, codigo, tdd, ddd, etc. Então não vou explicar a fundo o que fiz e como fiz, pois esse projeto será apenas uma referência para que eu, ou qualquer outra pessoa que esteja estudando os mesmos assuntos possa consultar e ver como foi feito.
    <br />
    <br />
  </p>
</div>

## Sobre o projeto

De inicio criei um projeto limpo e adicionei o setup do **typescript, jest, eslint, lint-staged e husky**, que são libs que vão me auxiliar durante o desenvolvimento.

Como exemplo real, peguei um caso de uso de uma API da empresa que trabalho, que vou chamar de **LoadDeliveries**. A ideia é bem simples, que consiste em um carregamento de dados de entrega para o client que faz a solicitação. Vamos ver que podemos deixar o "como" vamos servir isso para o final do projeto.

Vou deixar aqui algumas anotações para guiar a construção de cada camada. Então vamos lá!

<p align="right">(<a href="#top">voltar ao topo</a>)</p>

# Layers

## Domain

- Como funciona o TDD nessa camada?
  - se a camada for denifida com interfaces, não escrevemos os testes aqui
  - nas classes concretas, validamos novamente os parametros passados para o caso de uso, pois devemos garantir nessa camada que todos os dados necessarios sejam enviados para executar o caso de uso.
- Quais pastas podemos ter nessa camada (isso é pessoal, coloque a que você quiser)?
  - usecases: aqui colocamos os nossos casos de uso
  - entities: colocamos nossos modelos de entidades
- O que escrevemos nessa camada?
  - escrevemos nossos modelos de casos de uso e entidades de dados.

<p align="right">(<a href="#top">voltar ao topo</a>)</p>

## Data

- Como funciona o TDD nessa camada?
  - testamos as implementações dos casos de uso
- Quais pastas podemos ter nessa camada (isso é pessoal, coloque a que você quiser)?
  - usecases/services: colocamos as implementações concretas dos casos de uso da domain
- O que escrevemos nessa camada?
  - escrevemos nossas implementações dos casos de uso de domain

<p align="right">(<a href="#top">voltar ao topo</a>)</p>

## Infra

- Como funciona o TDD nessa camada?
  - testamos as classes que implementam as interfaces da camada data, como por exemplo um repository que acessa um banco de dados.
- Quais pastas podemos ter nessa camada? (isso é pessoal, coloque a que você quiser)
  - repositories: aqui colocamos os nossos repositorios de implementações
  - helpers: auxiliares para reutilizar, por exemplo, mongo-helper
- O que escrevemos nessa camada?
  - escrevemos nossos repositorios e outras implementações que se conectam com libs externas

<p align="right">(<a href="#top">voltar ao topo</a>)</p>

## Presentation

- Como funciona o TDD nessa camada?
  - validamos os dados necessarios para executar o caso de uso, por exemplo, um caso de uso de login, esperamos receber um email e senha, é aqui que escrevemos o teste para validar se recebemos esses parametros, se caso o email é valido, se a senha atende aos requisitos de criação de senha, etc.
  - validamos se os dados foram passados de uma camada para outra, por exemplo, do controller para o caso de uso, garantimos que o caso de uso recebeu os parametros.
  - validamos a resposta do caso de uso, nesse caso podemos "mocar" o caso de uso.
  - validamos os erros lançados das camadas superiores, aqui colocamos try/catch
- Quais pastas podemos ter nessa camada? (isso é pessoal, coloque a que você quiser)
  - helpers: aqui colocamos arquivos auxiliares como por exemplo, objetos de retorno/requisicao formatados, erros personalizados.
  - controllers: colocamos as classes que vão tratar nossas requisicoes/respostas, sem envolver framework.
- O que colocamos nessa camada?
  - colocamos nossos controllers, que farão validações na requisição antes de passar a chamada para o caso de uso. Aqui injetamos o caso de uso.
  - escrevemos as viewModel, que sao abstracoes da entidade do dominio, que serao devolvidas na solicitação

<p align="right">(<a href="#top">voltar ao topo</a>)</p>

## Main (Composite root)

- Como funciona o TDD nessa camada?
  - não precisamos fazer testes de todos os arquivos, apenas daqueles que contenham alguma configuração e que queremos garantir o funcionamento correto.
- Quais pastas podemos ter nessa camada? (isso é pessoal, coloque a que você quiser)
  - config: todo setup de libs externas
  - middlewares: auxiliares de middlewares
  - routes: caso de utilizar um express
  - adapters: classes que adptam requisicoes ou respostas dos casos de uso para as libs externas
  - factories: classes/funções que montam a estrutura para um controller por exemplo.
- O que colocamos nessa camada?
  - colocamos a composição de todas as outras camadas
  - montamos os setups para iniciar a aplicação

<p align="right">(<a href="#top">voltar ao topo</a>)</p>

## Sobre os testes

Eu deixei todos os testes unitários ao lado de cada arquivo de implementação. Gosto de manter assim pois este tipo de teste está relacionado diretamente ao arquivo ao qual vou modificar.
Para os testes de ponta a ponta, vou coloca-los dentro da pasta **\_\_tests\_\_** na raiz do projeto. Essa separação é necessaria pois não quero que todos os testes sejam executados a cada commit, e sim somente os unitários. No caso do testes de ponto a ponta, só vou executa-los no momento de um push.

- Mock: quando precisamos nos preocupar com a entrada de um método
- Stub: quando precisamos nos preocupar apenas com o resultado de um método
- Spy: quando queremos validar se os métodos foram chamado, quantas vezes, quais argumentos, o resultado.

<p align="right">(<a href="#top">voltar ao topo</a>)</p>

## Arquitetura visual

![architecture](docs/architecture.drawio.svg)

<p align="right">(<a href="#top">voltar ao topo</a>)</p>
