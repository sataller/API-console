export const copyResponse = ({id, viewToast}: {id: string; viewToast: (text: string) => void}) => {
  let data = localStorage.getItem('userActions');
  if (data) {
    navigator.clipboard
      .writeText(JSON.stringify(JSON.parse(data).dataList[id].request))
      .then(() => {
        console.log('copied');
        viewToast('Скопировано');
      })
      .catch((err) => {
        viewToast('Ошибка');
        console.log('Something went wrong', err);
      });
  } else {
    viewToast('Ошибка');
  }
};
