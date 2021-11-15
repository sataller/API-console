import React from 'react';
import {Form, Title, Wrapper} from './LoginStyles';
import {useFormik} from 'formik';
import ErrorBlock from './ErrorBlock';
import CustomInput from './CustomInput';
import CustomButton from '../reusibleComponents/CustomButton';
import Logo from '../reusibleComponents/Logo';
import {LoginPayloadType} from '../../api/api';
import * as validation from '../../utils/validation';
import {asyncLoginAction} from '../../store/sags/asyncActions';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {setError} from '../../store/reducers/authReducer';
import {Constants} from '../../constants';

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
  const {error, errorText, isFetching} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [validationError, setValidationErrors] = React.useState<{login: boolean; password: boolean}>({
    login: false,
    password: false,
  });
  const form = useFormik<FormikValuesType>({
    initialValues: {
      login: '',
      sublogin: '',
      password: '',
    },
    initialTouched: {
      login: false,
      password: false,
    },
    validateOnChange: false,
    validate: (values) => {
      const errors: FormikErrorType = {};
      const loginError = validation.validateLogin(values.login);
      const passwordError = validation.validatePassword(values.password);

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
    dispatch(setError({error: false}));
    dispatch(asyncLoginAction(payload));
  };

  return (
    <Wrapper>
      <Logo />
      <Form onSubmit={form.handleSubmit}>
        <Title>API-консолька</Title>
        {error && <ErrorBlock errorText={errorText} />}
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
          text={Constants.Login}
        />
      </Form>
    </Wrapper>
  );
};

export default Login;
