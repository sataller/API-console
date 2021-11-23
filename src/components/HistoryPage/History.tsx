import React from 'react';
import ActionsTable from './ActionsTable';
import {DataListType} from '../../store/reducers/requestReducer';
import {BarChart} from './BarChart';
import {LineChart} from './LineCart';
import styled from 'styled-components';

type HistoryType = {
  data: {
    dataList: DataListType;
    maxLength: number;
  };
};

const History = ({data}: HistoryType) => {
  return (
    <Wrapper>
      <TableWrapper>
        <ActionsTable data={data} />
      </TableWrapper>
      <div>
        <ChartWrapper>
          <BarChart />
        </ChartWrapper>
        <ChartWrapper>
          <LineChart />
        </ChartWrapper>
      </div>
    </Wrapper>
  );
};

export default History;

const Wrapper = styled.div``;

const ChartWrapper = styled.div`
  margin: 10px;
`;

const TableWrapper = styled.div`
  margin: 10px;
`;
