// src/Form.tsx

import { Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { gql, useQuery, useMutation,  useSubscription } from "@apollo/client";

const CREATE_CONTRACTS = gql`
mutation Mutation($contracts: [ContractInput!]!) {
    createContract(contracts: $contracts) {
      id
      name
      category
      salesRep
      value
    }
  }
`;


const Form: React.FC = () => {

    const [name, setName] = useState('');

    const [category, setCategory] = useState('');

    const [salesRep, setSalesRep] = useState('');

    const [value, setValue] = useState(0.00);

    const [createContracts] = useMutation(CREATE_CONTRACTS);


  const handleButtonClick = async (e: // src/Form.tsx
      React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      const response = await createContracts({
        variables: {
          contracts: {
            name: name,
            category: category,
            salesRep: salesRep,
            value: value,

          },
        },
      });

      // Handle the response, e.g., show a success message
      console.log('Post created:', response.data.createPost);
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error('Error creating post:', error);
    }
  };

  return (
    <Stack
      component="form"
      sx={{
        width: '25ch',
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      <TextField
        onChange={(e) => setName(e.target.value)}
        label="Name"
        id="Name"
        variant="filled"
        size="small"
        value={name}
      />
      <TextField
        onChange={(e) => setCategory(e.target.value)}
        label="Category"
        id="Category"
        variant="filled"
        value={category}
      />
      <TextField
        onChange={(e) => setSalesRep(e.target.value)}
        label="SalesRep"
        id="SalesRep"
        variant="filled"
        value={salesRep}

      />
        <TextField
        onChange={(e) => setValue(parseFloat(e.target.value))}
        label="Value"
        id="Value"
        variant="filled"
        value={value}
      />
    <Button onClick={(e) => handleButtonClick(e)} variant="contained">Add Contract</Button>

    </Stack>
  );
};

export default Form;