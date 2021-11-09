import {sendsay} from '../initSendsay';
import {setUserRequests} from '../utils/setUserAction';

export type LoginPayloadType = {
  login: string;
  sublogin?: string;
  password: string;
};

export enum Status {
  ERROR = 'ERROR',
  OK = 'OK',
}

export const logIn = async (payload: LoginPayloadType) => {
  sendsay.auth = {...payload};

  try {
    await sendsay.login(payload);
    localStorage.setItem('token', sendsay.session);
    const user = await sendsay.getUsername().split('/')[0];
    sendsay.auth.sublogin = user;
    localStorage.setItem('user', JSON.stringify({login: payload.login, sublogin: payload.sublogin || ''}));

    return {data: sendsay.session, status: Status.OK};
  } catch (error) {
    return {data: error, status: Status.ERROR};
  }
};
export const request = async (payload: any) => {
  try {
    const response = await sendsay.request(payload);
    console.log(response);
    setUserRequests({response: response, request: payload, status: Status.OK});
    return {data: response, status: Status.OK};
  } catch (error) {
    console.log(error);
    setUserRequests({response: error, request: payload, status: Status.ERROR});
    return {data: error, status: Status.ERROR};
  }
};

export const logOut = () => {
  console.log('log out');
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

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
