import React, {useState} from 'react';
import styled from 'styled-components';
import {useFormik} from "formik";
import logo from '../../assets/icons/logo.svg';
import errorIcon from '../../assets/icons/error-icon.svg';
import loader from '../../assets/icons/loader.svg'

const Login = () => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(true);


    const onSubmit = () => {
        setIsFetching(true)

        setTimeout(()=>{
            setIsFetching(false)
        }, 5000);
        console.log("test")
    }
    const errorText = '{id: "error/auth/failed", explain: "wrong_credentials"}'

    return (
        <Wrapper>
            <LogoStyled src={logo} alt="logo"/>
            <Form onSubmit={onSubmit}>
                <Title>API-консолька</Title>
                {isError && <ErrorBlock>
                    <SubTitle>
                        <img src={errorIcon} alt={'error icon'}/>
                        Вход не вышел
                    </SubTitle>
                    <span>{errorText}</span>
                </ErrorBlock>}
                <Label error={true} htmlFor={"login"}> Login</Label>
                <Input error={true} id={"login"} type="text" placeholder="Login"/>
                <Label htmlFor={"sublogin"}>Sublogin</Label>
                <Input id={"sublogin"} type="text" placeholder="Sublogin"/>
                <Label error={false} htmlFor={"password"}>Password</Label>
                <Input error={false} id={"password"} type="password" placeholder="Password"/>
                {/*<input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин" />*/}
                {/*<input value={sublogin} onChange={(e) => setSubLogin(e.target.value)} placeholder="Сублогин" />*/}
                {/*<input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Сублогин" />*/}
                <Button type="submit" onClick={onSubmit}>
                    { !isFetching && "Отправить"}
                    {isFetching && <img src={loader} alt={"loader"}/>}

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

const SubTitle = styled.h2`
  display: flex;
  align-items: center;
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  color: #CF2C00;
  margin: 0;
  & img{
    width: 20px;
    height: 20px  ;
    margin-right: 10px;
    margin-left: 2px;
  }
  
 
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
  width: 520px;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 40px 30px;
  @media(max-width: 550px){
    width: 300px;
  }
`;

const ErrorBlock = styled.div`
  max-width: 460px;
  height: 70px;
  background: rgba(207, 44, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  & span { 
    font-family: SF Pro Text;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #CF2C00;
    opacity: 0.5;
    margin-left: 32px;
    
    @media(max-width: 550px){
      margin: 0;
      font-size: 10px;
    }
  }

  animation: viewError 1s linear;
  @keyframes viewError {
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }
`;

const Label = styled.label<{error?:boolean}>`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  margin: 20px 0 5px 0;
  
  color: ${props => props.error ? " #CF2C00" : " #0D0D0D"};
`;

const Input = styled.input<{error?:boolean}>`
  width: 100%;
  min-height: 40px;
  background: #FFFFFF;
  border: 1px solid ${props => props.error ? "#CF2C00" : "rgba(0, 0, 0, 0.2)"};
  box-sizing: border-box;
  border-radius: 5px;
  padding: 5px 10px;
  box-shadow: ${props => props.error ? " 0px 0px 5px rgba(207, 44, 0, 0.5)" : "unset"};
`;

const Button = styled.button`
  max-width: 110px;
  min-height: 40px;
  background: linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;
  border-radius: 5px;
  margin-top: 20px;
`;

const LogoStyled = styled.img`
  width: 115px;
  height: 30px;
  margin-bottom: 20px;
`;
