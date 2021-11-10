import React, {useState} from 'react';
import {Form, Title, Wrapper} from './LoginStyles';
import {useFormik} from 'formik';
import ErrorBlock from './ErrorBlock';
import CustomInput from './CustomInput';
import CustomButton from '../reusibleComponents/CustomButton';
import Logo from '../reusibleComponents/Logo';
import {logIn, LoginPayloadType, Status} from '../../api/api';
import {validateLogin, validatePassword} from '../../utils/validation';
import {useHistory} from 'react-router-dom';

export type FormikValuesType = {
  login: string;
  sublogin: string;
  password: string;
};

type FormikErrorType = {
  login?: string;
  password?: string;
};

const Login = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationErrors] = React.useState<{login: boolean; password: boolean}>({
    login: false,
    password: false,
  });
  const history = useHistory();
  const form = useFormik<FormikValuesType>({
    initialValues: {
      login: '',
      sublogin: '',
      password: '',
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      const loginError = validateLogin(values.login);
      const passwordError = validatePassword(values.password);

      if (loginError !== '') {
        errors.login = loginError;
      }
      if (passwordError !== '') {
        errors.password = passwordError;
      }
      setValidationErrors({
        ...validationError,
        login: Boolean(loginError),
        password: Boolean(passwordError),
      });
      return errors;
    },
    onSubmit: (values) => {
      const payload = getPayload(values);
      onSubmit({...payload});
      // ngoo4Sepa  astaller96@gmail.com
    },
  });

  const getPayload = (values: {[key: string]: string}) => {
    const payload: {[key: string]: string} = {};
    for (let key in values) {
      if (values[key] !== '') {
        payload[key] = values[key];
      }
    }
    return JSON.parse(JSON.stringify(payload));
  };

  const onSubmit = async (payload: LoginPayloadType) => {
    setError(null);
    setIsFetching(true);
    const response = await logIn(payload);

    response.status === Status.ERROR
      ? setError(`{id: ${response?.data?.id}, explain: ${response?.data?.explain}`)
      : history.push(`/console`);

    setIsFetching(false);
  };

  return (
    <Wrapper>
      <Logo />
      <Form onSubmit={form.handleSubmit}>
        <Title>API-консолька</Title>
        {error && <ErrorBlock errorText={error} />}
        <CustomInput
          key={'login'}
          error={form.errors.login}
          id={'login'}
          onChange={form.handleChange}
          value={form.values.login}
          placeholder="Login"
          type={'text'}
        />
        <CustomInput
          key={'sublogin'}
          id={'sublogin'}
          placeholder="Sublogin"
          onChange={form.handleChange}
          value={form.values.sublogin}
          type={'text'}
        />
        <CustomInput
          key={'password'}
          error={form.errors.password}
          id={'password'}
          placeholder="Password"
          onChange={form.handleChange}
          value={form.values.password}
          type={'password'}
        />
        <CustomButton
          isError={validationError.login || validationError.password}
          margin={20}
          onSubmit={form.handleSubmit}
          isFetching={isFetching}
          text={'Send'}
        />
      </Form>
    </Wrapper>
  );
};

export default Login;
