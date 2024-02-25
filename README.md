# Contacts

This repository contains the solution to the challenge for Babbel. This is a monorepo that comprises of a client and a server application. The client is developed using Next.js 14, while the server utilizes Node.js, Express, TypeScript and Mongo (Atlas) with Mongoose.

## Live Deployments

The server is deployed at: https://babbel-contacts.onrender.com
The client is deployed at: https://babbel-contacts-client.vercel.app/

## Usage

1. Clone the repository:

```bash
git clone git@github.com:theonly1me/babbel-contacts.git
cd babbel-contacts
```

2. Install dependencies for the client and server:

```bash
npm install
```

## Server

The server Contacts API requires Basic Auth in order to be accessed.

The below environment variables required for running the server locally need to be added to a `.env` file. I will provide the values separately.

```bash
DATABASE_URL=<MONGO_ATLAS_URL>
USERNAME=<USERNAME>
PASSWORD=<PASSWORD>
```

### API Documentation

The complete API documentation for the Contacts API I built can be found at https://documenter.getpostman.com/view/14009264/2sA2rCUMvX.

### Running the Server Application

To run the server application in development mode:

```bash
npm run server:dev
```

This command compiles TypeScript files and starts the server using Nodemon, enabling automatic restart on file changes.

## Client

The client uses Next.js 14 with the App Router with TailwindCSS for primary styling.

The client utilizes Next.js's server actions via the `use server` directive to retreive the data from the server keeping in mind the best practices of using Next.js with the app router.

A `.env.local` file is required to inject the environment variables in your local development environment, the details required are:

```bash
USERNAME=<USERNAME>
PASSWORD=<PASSWORD>
SERVER_URL=http://localhost:8000
```

#### Running the Client Application

To run the client application in development mode:

```bash
npm run client:dev
```

This command starts the Next.js development server for the client application.

### Cleaning

To clean the project by removing node_modules, package locks, and build artifacts:

```bash
npm run clean
```

### Testing

#### Server Tests

To run unit tests for the server:

```bash
npm run server:test
```

Note: I did not have enough time to write tests for the client. There are extensive tests on the server.

## Directory Structure

- `packages`: Contains the client and server applications.
  - client - `@babbel-enterprise/client`: Client application developed with Next.js 14.
  - server - `@babbel-enterprise/server`: Server application developed with Node.js, Express, and TypeScript.

## Author

**Atchyut Preetham Pulavarthi**
