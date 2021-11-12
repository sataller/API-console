export const deleteUserAction = (id: string) => {
  let userActions = localStorage.getItem('userActions');
  if (userActions) {
    const actions = JSON.parse(userActions);
    const key = `${id}`;
    delete actions.dataList[key];
    console.log(actions);
    localStorage.setItem('userActions', JSON.stringify(actions));
  }
};