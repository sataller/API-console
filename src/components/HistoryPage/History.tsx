import React from 'react';
import ActionsTable from './ActionsTable';
import {DataListType} from '../../store/reducers/requestReducer';
import {BarChart} from './BarChart';
import {LineChart} from './LineCart';

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
      <BarChart />
      <LineChart />
    </div>
  );
};

export default History;
