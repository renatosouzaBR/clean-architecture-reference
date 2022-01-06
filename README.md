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
  - usecases: colocamos as implementações concretas dos casos de uso da domain
- O que escrevemos nessa camada?
  - escrevemos nossas implementações dos casos de uso de domain, por exemplo: um caso de uso LoadPurchases, colocamos a implementação no nome + o caso de uso, que poderia ser BDLoadPurchases ou APILoadPurchases.

<p align="right">(<a href="#top">voltar ao topo</a>)</p>
