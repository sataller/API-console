export const setUserRequests = (response: {response: any; request: any; status: string}) => {
  let data = {
    dataList: {},
    maxLength: 20,
  };

  let userActions = localStorage.getItem('userActions');

  data = userActions ? JSON.parse(userActions) : data;

  const key = data.maxLength ? data.maxLength - 1 : 19;
  data = {
    ...data,
    dataList: {
      ...data.dataList,
      [key]: {
        ...response,
      },
    },
    maxLength: key,
  };
  localStorage.setItem('userActions', JSON.stringify(data));
};
