import React from 'react';
import {Constants} from '../constants';

export type CopyResponseType = {
  e: React.MouseEvent<HTMLImageElement, MouseEvent>;
  id: string;
  userName: string;
  viewToast: (text: string) => void;
};

export const copyResponse = ({e, id, viewToast, userName}: CopyResponseType) => {
  e.stopPropagation();
  let data = localStorage.getItem(`${userName}_Actions`);
  if (data) {
    navigator?.clipboard
      .writeText(JSON.parse(data).data.dataList[id].request)
      .then(() => {
        viewToast(Constants.Copied);
      })
      .catch((err) => {
        viewToast(Constants.Error);
        console.log('Something went wrong', err);
      });
  } else {
    viewToast(Constants.Error);
  }
};
