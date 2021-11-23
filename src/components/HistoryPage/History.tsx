import React from 'react';
import ActionsTable from './ActionsTable';
import {DataListType} from '../../store/reducers/requestReducer';

type HistoryType = {
  data: {
    dataList: DataListType;
    maxLength: number;
  };
};

const History = ({data}: HistoryType) => {
  return (
    <div>
      <ActionsTable data={data} />
    </div>
  );
};

export default History;
