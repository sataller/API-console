import React, {useState} from 'react';
import {
    Wrapper, LogoStyled,
    Form, Title, ErrorBlock,
    SubTitle, Label, Input,
    Button
} from "./LoginStyles";
import {useFormik} from 'formik';
import logo from '../../assets/icons/logo.svg';
import errorIcon from '../../assets/icons/error-icon.svg';
import loader from '../../assets/icons/loader.svg';

const Login = () => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(true);

    const onSubmit = () => {
        setIsFetching(true);

        setTimeout(() => {
            setIsFetching(false);
        }, 5000);
        console.log('test');
    };
    const errorText = '{id: "error/auth/failed", explain: "wrong_credentials"}';

    return (
        <Wrapper>
            <LogoStyled src={logo} alt="logo"/>
            <Form onSubmit={onSubmit}>
                <Title>API-консолька</Title>
                {isError && (
                    <ErrorBlock>
                        <SubTitle>
                            <img src={errorIcon} alt={'error icon'}/>
                            Вход не вышел
                        </SubTitle>
                        <span>{errorText}</span>
                    </ErrorBlock>
                )}
                <Label error={true} htmlFor={'login'}>
                    {' '}
                    Login
                </Label>
                <Input error={true} id={'login'} type="text" placeholder="Login"/>
                <Label htmlFor={'sublogin'}>Sublogin</Label>
                <Input id={'sublogin'} type="text" placeholder="Sublogin"/>
                <Label error={false} htmlFor={'password'}>
                    Password
                </Label>
                <Input error={false} id={'password'} type="password" placeholder="Password"/>
                <Button type="submit" onClick={onSubmit}>
                    {!isFetching && 'Отправить'}
                    {isFetching && <img src={loader} alt={'loader'}/>}
                </Button>
            </Form>
        </Wrapper>
    );
};

export default Login;
