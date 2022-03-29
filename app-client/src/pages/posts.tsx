import { Container } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { DarkModeSwitch } from '../components/DarkModeSwitch';

const Posts: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Container height="100vh">
      <DarkModeSwitch />
      POSTS go here
    </Container>
  );
};

export default Posts;
