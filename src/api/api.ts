//@ts-ignore
import Sendsay from 'sendsay-api';

export type LoginPayloadType = {
  login: string
  sublogin?: string
  password: string
}

export enum Status {
  ERROR = "ERROR",
  OK = 'OK',
}

export const logIn = async (payload: LoginPayloadType) => {
  const sendsay = new Sendsay();
  try {
    const response = await sendsay.login(payload);
    return {data: response.json(), status: Status.OK};
  } catch (error) {

    return {data: error, status: Status.ERROR};
  }
}

const test = {
  id: "error/auth/failed",
  explain: "wrong_credentials",
  request: {
    action: "login",
    login: "astaller96@gmail.com",
    sublogin: "",
    passwd: "ngo04Sepa"
  }
}
