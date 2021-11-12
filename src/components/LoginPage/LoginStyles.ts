import styled from "styled-components";

export const Title = styled.h1`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 30px;
  color: #0d0d0d;
  margin: 0;
`;

export const SubTitle = styled.h2`
  display: flex;
  align-items: center;
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 30px;
  color: #cf2c00;
  margin: 0;
  & img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    margin-left: 2px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #e5e5e5;
  width: 100vw;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  width: 520px;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 40px 30px;
  margin-top: 20px;
  @media (max-width: 550px) {
    width: 300px;
  }
`;

export const Error = styled.div`
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
    color: #cf2c00;
    opacity: 0.5;
    margin-left: 32px;

    @media (max-width: 550px) {
      margin: 0;
      font-size: 10px;
    }
  }

  animation: viewError 1s linear;
  @keyframes viewError {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Label = styled.label<{error?: boolean}>`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  margin: 20px 0 5px 0;

  color: ${(props) => (props.error ? ' #CF2C00' : ' #0D0D0D')};
`;

export const Input = styled.input<{error?: boolean}>`
  width: 100%;
  min-height: 40px;
  background: #ffffff;
  border: 1px solid ${(props) => (props.error ? '#CF2C00' : 'rgba(0, 0, 0, 0.2)')};
  box-sizing: border-box;
  border-radius: 5px;
  padding: 5px 10px;
  box-shadow: ${(props) => (props.error ? ' 0px 0px 5px rgba(207, 44, 0, 0.5)' : 'unset')};
`;

export const LogoStyled = styled.img`
  width: 115px;
  height: 30px;
`;
