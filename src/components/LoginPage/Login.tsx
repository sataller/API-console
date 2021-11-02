import React, {useState} from 'react';
import {Form, Title, Wrapper,} from './LoginStyles';
import {useFormik} from "formik";
import ErrorBlock from './ErrorBlock';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import Logo from '../reusibleComponents/Logo';
import {logIn, LoginPayloadType, Status} from '../../api/api';

const Login = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)
  const form = useFormik<{login:string, sublogin: string, password:string}>({
    initialValues: {
      login: '',
      sublogin: '',
      password: '',
    }, onSubmit: values => {
      onSubmit(values)
      // ngoo4Sepa  astaller96@gmail.com
    }
  });
  const onSubmit = async (payload: LoginPayloadType) => {
    setError(null);
    setIsFetching(true);
    const response = await logIn(payload);

    if (response.status === Status.ERROR) {
      setError(`{id: ${response?.data?.id}, explain: ${response?.data?.explain}`)
    }
    setIsFetching(false);
  };
  const errorText = '{id: "error/auth/failed", explain: "wrong_credentials"}';

  return (
    <Wrapper>
      <Logo/>
      <Form onSubmit={form.handleSubmit}>
        <Title>API-консолька</Title>
        {error && (
          <ErrorBlock errorText={errorText}/>
        )}
        <CustomInput key={'login'} error={true} id={'login'} placeholder='Login'/>
        <CustomInput key={'sublogin'} id={'sublogin'} placeholder='Sublogin'/>
        <CustomInput key={'password'} error={false} id={'password'} placeholder='Password'/>
        <CustomButton onSubmit={form.handleSubmit} isFetching={isFetching} text={'Send'}/>
      </Form>
    </Wrapper>
  );
};

export default Login;
