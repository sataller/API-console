import React, {useState} from 'react';
import {
  Wrapper, Form, Title,
} from './LoginStyles';
import {useFormik} from 'formik';
import ErrorBlock from './ErrorBlock';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import Logo from '../reusibleComponents/Logo';
import {logIn} from '../../api/api';

const Login = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(true);

  const onSubmit = () => {
    setIsFetching(true);

    // setTimeout(() => {
    //   setIsFetching(false);
    // }, 5000);
    // console.log('test');
    debugger

    logIn({
      login: "astaller96@gmail.com",
      sublogin: "",
      password: "ngo04Sepa",
    });
  };
  const errorText = '{id: "error/auth/failed", explain: "wrong_credentials"}';

  return (
    <Wrapper>
      <Logo />
      <Form onSubmit={onSubmit}>
        <Title>API-консолька</Title>
        {isError && (
          <ErrorBlock errorText={errorText} />
        )}
        <CustomInput key={'login'} error={true} id={'login'} placeholder='Login' />
        <CustomInput key={'sublogin'} id={'sublogin'} placeholder='Sublogin' />
        <CustomInput key={'password'} error={false} id={'password'} placeholder='Password' />
        <CustomButton onSubmit={onSubmit} isFetching={isFetching} text={'Send'} />
      </Form>
    </Wrapper>
  );
};

export default Login;
