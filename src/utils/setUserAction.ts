export const setUserRequests = (response: {response: any; request: any; status: string}) => {
  let data = {
    dataList: {},
    maxLength: 20,
  };
  let userActions = localStorage.getItem('userActions');
  if (userActions) {
    data = JSON.parse(userActions);
  }
  const key = data.maxLength ? data.maxLength - 1 : 19;
  // data = {
  //   ...data,
  //   [key]: {
  //     ...response,
  //   },
  //   maxLength: key,
  // };
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
