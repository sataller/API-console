//@ts-ignore
import Sendsay from 'sendsay-api';

type LoginPayloadType = {
  login: string
  sublogin?: string
  password: string
}

export const logIn = (payload: LoginPayloadType) => {
  debugger
  const sendsay = new Sendsay({
    auth: {
      login: payload.login,
      sublogin: payload.sublogin || "",
      password: payload.password,
    }
  });
  sendsay.login().then(function(response:any) {
    console.log(response);
  })
}
