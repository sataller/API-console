import React from 'react';
import styled from 'styled-components';
import {useTable} from 'react-table';
import {Status} from '../../api/api';
import {DataListType} from '../../store/reducers/requestReducer';

type ActionsTableType = {
  data: {
    dataList: DataListType;
    maxLength: number;
  };
};

const ActionsTable = ({data}: ActionsTableType) => {
  const [tableData, setTableData] = React.useState<any>([{name: 'Loading', status: Status.ERROR}]);
  React.useEffect(() => {
    let items: any = [];
    for (let key in data.dataList) {
      items = [
        ...items,
        {
          status: data.dataList[key].status,
          name: typeof data.dataList[key].request === 'object' ? JSON.stringify(data.dataList[key].request) : data.dataList[key].request,
        },
      ];
    }
    setTableData(items);
  }, [data.dataList]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
    ],
    []
  );
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
    columns,
    data: tableData,
  });
  console.log(tableData);
  return (
    <TableWrapper>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default ActionsTable;

const TableWrapper = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
