# Backed Eassignment Boilerplate

Our customers are asking to become smarter with the value of their existing contracts. At Pocketlaw,
we have this data internally but need to expose it through an easy-to-use API.

## General Instructions

You have been provided with this boilerplate repository to easy the creation of this service. Before
you start the assigment go through the structure of it and try to adhere to the configuration
provided in the various config files provided.

## Requirements

1. A service that continuously ingests and exposes information a value of a contract and metadata
   for it.
2. It shall be possible to ingest and retrieve this contract information using an API exposed by the
   service.
3. It shall be possible to bulk ingest contracts through the API.
4. The service should be packaged as a npm package and exposed as a docker container to allow easy
   integration to a CI pipeline.

## Sample Dataset

```json
[
  {
    "name": "Employment Agreement",
    "category": "HR",
    "salesRep": "Michelle",
    "value": 1000
  },
  {
    "name": "Non Disclousure Agreement",
    "category": "Commercial",
    "salesRep": "Steven",
    "value": 2000
  }
]
```

## Constraints

1. We value your time and also want to moderate the complexity of this assignment therefore we ask
   you to spend no more than 4 hours on it. We believe that should be enough to execute in a
   pragmatic manner
2. The data should be persisted in a Postgres database
3. Authentication does not need to be taken in to consideration for this assignment
4. The service code should be written in Typescript

## Database Structure

Use the `init.sql` file to create the database structure of your choice.

## Running the Database

The database will be avilable through docker compose. Run `docker compose up -d` to create the
database. This will automatically run everything in `init.sql`.
