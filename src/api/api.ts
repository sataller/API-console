import {sendsay} from '../initSendsay';

export type LoginPayloadType = {
  login: string;
  sublogin?: string;
  password: string;
};
export type RequestType = {
  response: any;
  request: any;
  status: StatusType;
  requestStatus: StatusType;
};

export type StatusType = Status.OK | Status.ERROR;

export enum Status {
  ERROR = 'ERROR',
  OK = 'OK',
}

export const logIn = async (payload: LoginPayloadType): Promise<{data: any; status: StatusType}> => {
  sendsay.auth = {...payload};
  try {
    await sendsay.login(payload);
    localStorage.setItem('token', sendsay.session);
    sendsay.auth.sublogin = await sendsay.getUsername().split('/')[0];
    localStorage.setItem('user', JSON.stringify({login: payload.login, sublogin: payload.sublogin || ''}));

    return {data: {token: sendsay.session, login: payload.login, sublogin: payload.sublogin || ''}, status: Status.OK};
  } catch (error) {
    return {data: error, status: Status.ERROR};
  }
};
export const request = async (payload: any): Promise<{data: RequestType}> => {
  const newPayload = typeof payload === 'string' ? JSON.parse(payload) : payload;

  try {
    const response = await sendsay.request(newPayload);
    return {
      data: {
        response: response,
        request: newPayload,
        status: Status.OK,
        requestStatus: Status.OK,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      data: {
        response: error,
        request: newPayload,
        status: Status.ERROR,
        requestStatus: Status.OK,
      },
    };
  }
};

export const isAuth = async () => {
  try {
    const response = await sendsay.request({
      action: 'pong',
    });
    return {
      isAuth: !!response?.ping,
    };
  } catch (error) {
    console.log(error);
    sendsay.session = undefined;
    return {
      isAuth: false,
    };
  }
};
