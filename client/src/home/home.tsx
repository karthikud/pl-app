import * as React from "react";

import { Grid, Paper } from  "@mui/material";

import Contract from "../contract/contract";
import { gql, useQuery, useSubscription } from "@apollo/client";
import Form from "../form/form";
import { ContractProps } from "../interfaces";

const CONTRACTS_SUBSCRIPTION = gql`
subscription Subscription {
    contractCreated {
      name
      category
      salesRep
      value
    }
  }
`;


const GET_CONTRACTS = gql`
  query contracts {
    contracts {
      id
      name
      category
      value
    }
  }
`;

export default function Home() {
  const [contracts, setContracts] = React.useState<ContractProps[]>([]);

  const { data } = useQuery<{ contracts: ContractProps[] }>(GET_CONTRACTS);

  React.useEffect(() => {
    if (data?.contracts?.length !== undefined) {
      setContracts(data.contracts);
    }
  }, [data]);
// Creating subscription for contracts //
useSubscription(CONTRACTS_SUBSCRIPTION, {
  onData: (subscriptionData: any) => {
    // This function will get triggered once a publish event is being initiated by the server
    // when a new contrcat is being added
    console.log("subscriptionData", subscriptionData)
    if (subscriptionData?.data?.data?.contractCreated) {
      // We are updating the state of contracts
      setContracts([...contracts, ...subscriptionData?.data?.data?.contractCreated ?? []]);
    }
  },
});

  return (
    
    <>
    <div>
      <Grid container spacing={2}>
        {/* First Column */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
          <Form />

          </Paper>
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
          {contracts.map(({ id, name, category,salesRep,value },index) => (
        <Contract key={index} category={category} salesRep={salesRep} value={value} id={id} name={name} />
      ))}
          </Paper>
        </Grid>
      </Grid>
    </div>


    </>
  );
}