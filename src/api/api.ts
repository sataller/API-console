//@ts-ignore
import Sendsay from 'sendsay-api';

export type LoginPayloadType = {
  login: string
  sublogin?: string
  password: string
}

export enum Status {
  ERROR = 'ERROR',
  OK = 'OK',
}

export const logIn = async (payload: LoginPayloadType) => {
  const sendsay = new Sendsay({
    auth: {
      ...payload
    }
  });

  try {
    await sendsay.login(payload);
    console.log((sendsay));
    localStorage.setItem('token', sendsay.session);
    return {data: sendsay.session, status: Status.OK};
  } catch (error) {
    console.log(error);
    return {data: error, status: Status.ERROR};
  }
};

const logOut = () => {
  console.log(sendsay);
}

// Error response
// const test = {
//   id: "error/auth/failed",
//   explain: "wrong_credentials",
//   request: {
//     action: "login",
//     login: "astaller96@gmail.com",
//     sublogin: "",
//     passwd: "ngo04Sepa"
//   }
// }

//Ok response
// {
//   "request.id": "APP_UNAUTHORIZED_/signin_1635925287823_2021-11-03T10:41:34.060Z",
//   "sublogin": "x_163585832985503",
//   "session": "x_163585832985503/x_163585832985503:LL8eT-jwUxvsXMilA280Ugs3afEpFySuagDr0uR1F1rA:1635925295776153944.595757177527637.216944531048",
//   "duration": 0.732542,
//   "_ehid": "215578.84122429245.1635925295",
//   "login": "x_163585832985503"
// }
