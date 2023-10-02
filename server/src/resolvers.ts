// resolvers.ts

import { Contract } from './entities/Contract.js'
import { AppDataSource } from './data-source.js'
import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()
const contractRepository = AppDataSource.getRepository(Contract)

const resolvers = {
  Query: {
    contracts: async () => {
      return await contractRepository.find()
    },
    contract: async (_: any, { id }: { id: number }) => {
      return await contractRepository.findOne({ where: { id } })
    }
  },
  Mutation: {
    createContract: async (_: any, { contracts }: { contracts: Contract }) => {
      await pubsub.publish('CONTRACT_CREATED', { contractCreated: contracts })
      return await contractRepository.save(contracts)
    }
    // Implement bulk ingestion mutation here if needed
  },
  Subscription: {
    contractCreated: {
      subscribe: () => pubsub.asyncIterator(['CONTRACT_CREATED'])

    }
  }
}

export default resolvers
