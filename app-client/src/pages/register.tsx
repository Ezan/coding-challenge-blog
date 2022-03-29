import { Button, Container, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { ErrorMessage, Formik } from 'formik';
import { isEmpty } from 'lodash';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'urql';
import * as Yup from 'yup';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const Register: React.FC = () => {
  const [{}, register] = useRegisterMutation();

  const router = useRouter();

  return (
    <Container height="100vh">
      <DarkModeSwitch />
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirm: '',
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required('Username is required')
            .min(2, 'Must lbe longer than 2 character'),
          password: Yup.string()
            .required('Password is required')
            .min(8, 'Must lbe longer than 8 character'),
          confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        })}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const { confirm, ...request } = values;
          const response = await register(request);
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data.register.user) {
            router.push('/');
          }
        }}
      >
        {({ errors, touched, ...formik }) => (
          <FormControl isInvalid={!isEmpty(errors)}>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                name="username"
                id="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage name="username">
                {(msg) => <FormErrorMessage>{msg}</FormErrorMessage>}
              </ErrorMessage>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="password">Confirm Password</label>
              <ErrorMessage name="password">
                {(msg) => <FormErrorMessage>{msg}</FormErrorMessage>}
              </ErrorMessage>
              <Input
                type="password"
                name="confirm"
                id="confirm"
                value={formik.values.confirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage name="confirm">
                {(msg) => <FormErrorMessage>{msg}</FormErrorMessage>}
              </ErrorMessage>
              <Button mt={4} colorScheme="teal" type="submit" isLoading={formik.isSubmitting}>
                Register!
              </Button>
            </form>
          </FormControl>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
