import React, {useState} from 'react';
import {Form, Title, Wrapper} from './LoginStyles';
import {useFormik} from 'formik';
import ErrorBlock from './ErrorBlock';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import Logo from '../reusibleComponents/Logo';
import {logIn, LoginPayloadType, Status} from '../../api/api';

export type FormikValuesType = {
  login: string
  sublogin: string
  password: string
}

type FormikErrorType = {
  login?: string
  password?: string
}

const Login = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const form = useFormik<FormikValuesType>({
    initialValues: {
      login: '',
      sublogin: '',
      password: '',
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      const loginError =  validateLogin(values.login);
      const passwordError =  validatePassword(values.password);

      if (loginError){
        errors.login = loginError
      }
      if (loginError){
        errors.password = passwordError

      }
      console.log(errors);
      return errors;
    },
    onSubmit: values => {
      console.log(form);
      const payload = getPayload(values);
      onSubmit({...payload});
      // ngoo4Sepa  astaller96@gmail.com
    },

  });

  const validateLogin = (login: string) => {
    let error ;

    if (!login) {
      error = 'Required';
    }
    return error;
  };

  const validatePassword = (password: string) => {
    let error;

    if (!/[A-Z]+/.test(password)) {
      error = 'There must be one capital letter';
    }
    if (!/[0-9]+/.test(password)) {
      error = 'there must be at least one digit';
    }
    if (!/[a-z]/.test(password)) {
      error = 'There must be one lowercase letter';
    }
    if (/[а-я]/.test(password)) {
      error = 'Can\'t use Cyrillic';
    }
    if (password.length < 8) {
      error = 'Password must be longer than 8 сharacters';
    }
    if (!password) {
      error = 'Required';
    }
    return error;
  };
  const getPayload = (values: any) => {
    const payload: {[key: string]: string} = {};
    for (let key in values) {

      if (values[key] !== '') {
        payload[key] = values[key];
      }
    }
    return JSON.parse(JSON.stringify(payload));
  };

  const onSubmit = async (payload: LoginPayloadType) => {
    debugger
    setError(null);
    setIsFetching(true);
    const response = await logIn(payload);

    if (response.status === Status.ERROR) {
      setError(`{id: ${response?.data?.id}, explain: ${response?.data?.explain}`);
    }
    console.log(response);
    setIsFetching(false);
  };

  return (
    <Wrapper>
      <Logo />
      <Form onSubmit={form.handleSubmit}>
        <Title>API-консолька</Title>
        {error && (
          <ErrorBlock errorText={error} />
        )}
        <CustomInput key={'login'} error={(form.touched.login && form.errors.login) || ''} id={'login'}
                     onChange={form.handleChange}
                     value={form.values.login} placeholder='Login' type={'text'} />
        <CustomInput key={'sublogin'} id={'sublogin'} placeholder='Sublogin' onChange={form.handleChange}
                     value={form.values.sublogin} type={'text'} />
        <CustomInput key={'password'} error={(form.touched.password && form.errors.password) || ''} id={'password'}
                     placeholder='Password' onChange={form.handleChange}
                     value={form.values.password} type={'password'} />
        <CustomButton onSubmit={form.handleSubmit} isFetching={isFetching} text={'Send'} />
      </Form>
    </Wrapper>
  );
};

export default Login;
