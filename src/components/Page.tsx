import { Container, Typography } from '@mui/material';
import * as React from 'react';

type PageProps = {
  title: string
}

const Page: React.FC<PageProps> = (props) => {
  return (
    <Container>
      <Typography sx={{color: '#999999'}} component='h1' variant='h5'>
        {props.title}
      </Typography>
      {props.children}
    </Container>
  );
};

export default Page;
