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
  const [blogs, setBlogs] = React.useState<ContractProps[]>([]);

  const { data } = useQuery<{ contracts: ContractProps[] }>(GET_CONTRACTS);

  React.useEffect(() => {
    if (data?.contracts?.length !== undefined) {
      setBlogs(data.contracts);
    }
  }, [data]);
  // Creating subscription for blogs //
// Creating subscription for blogs //
useSubscription(CONTRACTS_SUBSCRIPTION, {
  onData: (subscriptionData: any) => {
    // This function will get triggered once a publish event is being initiated by the server
    // when a new blog is being added
    console.log("subscriptionData", subscriptionData)
    if (subscriptionData?.data?.data?.contractCreated) {
      // We are updating the state of blogs
      setBlogs([...blogs, ...subscriptionData?.data?.data?.contractCreated ?? []]);
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
          {blogs.map(({ id, name, category,salesRep,value },index) => (
        <Contract key={index} category={category} salesRep={salesRep} value={value} id={id} name={name} />
      ))}
          </Paper>
        </Grid>
      </Grid>
    </div>


    </>
  );
}