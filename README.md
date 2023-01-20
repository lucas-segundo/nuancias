# Welcome to Nuancias

This project uses [NextJS](https://nextjs.org/) as the framework, [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) as the architecture pattern and [Test-Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development) as the methodology.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/lucas-segundo/nuancias
```

2. Install the dependencies
```
cd <repository>
yarn or npm i
```

### Running the tests

To run the tests, use the following command:
```
npm run test or yarn test
```

### Starting the server

To start the server with development enviroment, use the following command:
```
npm run dev or yarn dev
```

### Folder structure 

```cypress/```: Configurations and test end-to-end with Cypress.

```generatos/```: Tool for generate ```.tsx``` files in presentation folder. Use the command ```yarn generate or npm run generate``` to do that.

```pages/```: In Next.js, each file is associated with a route based on its file name.

```public/```: Public assets.

```src/```: Source code of the project.

```domain/```: This is the core layer that contains the business logic and the use cases of the application.

```presentation/```: This is the outermost layer and deals with user interface and user experience. It communicates with the domain layer.

```data/```: This is the layer that communicates with the user and acts as an interface between the user and the system. It delegates tasks to the appropriate use cases in the domain layer.

```infra/```: It deals with the low-level details of the technology and platform that the application runs on. It includes the implementation of data access, communication, and other technical concerns.

```main/```:  It is where the entry point of the application is and it coordinates the work between the different layers of the application.

## Built With

- [NextJS](https://nextjs.org/) - The web framework used
- [TypeScript](https://www.typescriptlang.org/) - Language used
- [Jest](https://jestjs.io/) - Testing Framework
- [Cypress](https://www.cypress.io/) - Testing E2E Framework
- [Tailwind](https://tailwindcss.com/) - CSS Framework
