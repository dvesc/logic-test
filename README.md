<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Logic - Test

## Description

This project tries to solve the logic problem posed for the distribution of light bulbs, whose statement says the following:

![Captura de pantalla de 2022-08-01 17-35-54](https://user-images.githubusercontent.com/75711359/182257182-5b7d0c38-294e-4c15-80c9-9d05f954edba.png)

In this way the project manages to solve this problem by illuminating a matrix in its entirety and showing the result in the console as follows:

![Captura de pantalla de 2022-08-01 17-43-04](https://user-images.githubusercontent.com/75711359/182257888-f8877860-df1a-44fd-8ee9-175b0492f54c.png)

Where:
- 🔸 Symbolizes the illumination of the light bulb
- 💡 The position of the bulbs
- 🧱 Represent the walls of the room


## Installation

```bash
$ npm install
```

## How to use
- The project will receive the matrix that represents the room in a .txt file
- The said .txt must contain only 1 and 0 as values representing the walls and empty spaces respectively to form the array, as shown below

![Captura de pantalla de 2022-08-01 17-54-54](https://user-images.githubusercontent.com/75711359/182258992-e3708f94-9d55-4ec4-84a4-c60d3bda465c.png)

- That represents a 4x6 matrix with its walls
- Later to load said .txt to our project we will use the "resources" directory as shown below

![Captura de pantalla de 2022-08-01 18-03-15](https://user-images.githubusercontent.com/75711359/182259779-356fc89e-acd4-451e-aa0c-685625f6ea6b.png)

- We can use all the .txt files that we want as long as they are in that directory

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
