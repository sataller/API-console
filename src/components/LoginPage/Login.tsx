import React from 'react';
import styled from 'styled-components';
import {useFormik} from "formik";
import logo from '../../assets/icons/logo.svg'

const Login = () => {
    const onSubmit = () => {
        console.log("test")
    }

    return (
        <Wrapper>
            <LogoStyled src={logo} alt="logo"/>
            <Form onSubmit={onSubmit}>
                <Title>API-консолька</Title>
                <Label htmlFor={"login"}> Login</Label>
                <Input id={"login"} type="text" placeholder="Login"/>
                <Label htmlFor={"sublogin"}>Sublogin</Label>
                <Input id={"sublogin"} type="text" placeholder="Sublogin"/>
                <Label htmlFor={"password"}>Password</Label>
                <Input id={"password"} type="password" placeholder="Password"/>
                {/*<input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин" />*/}
                {/*<input value={sublogin} onChange={(e) => setSubLogin(e.target.value)} placeholder="Сублогин" />*/}
                {/*<input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Сублогин" />*/}
                <Button type="submit" onClick={onSubmit}>
                    Отправить
                </Button>
            </Form>
        </Wrapper>
    );
};

export default Login;

const Title = styled.h1`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 30px;
  color: #0D0D0D;
  margin: 0;
`;


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #E5E5E5;
  width: 100vw;
  height: 100vh;
`;

const Form = styled.section`
  display: flex;
  flex-direction: column;
  width: 520px;
  height: 425px;
  background: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 40px 30px;
`;

const Label = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  margin: 20px 0 5px 0;
`;

const Input = styled.input`
  width: 460px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 5px 10px;
`;

const Button = styled.button`
  width: 110px;
  height: 40px;
  background: linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;
  border-radius: 5px;
  margin-top: 20px;
`;

const LogoStyled = styled.img`
  width: 115px;
  height: 30px;
  margin-bottom: 20px;
`;