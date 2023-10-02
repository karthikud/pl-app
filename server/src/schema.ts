export const typeDefs = `
type Contract {
  id: ID!
  name: String!
  category: String!
  salesRep: String!
  value: Float!
}

type Query {
  contracts: [Contract!]!
  contract(id: ID!): Contract
}

type Mutation {
  createContract(contracts: [ContractInput!]!): [Contract!]
}

type Subscription {
  contractCreated: [Contract!]!
}

input ContractInput {
  name: String!
  category: String!
  salesRep: String!
  value: Float!
}
`
