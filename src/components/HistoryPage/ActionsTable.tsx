import React from 'react';
import styled from 'styled-components';
import {useTable} from 'react-table';
import {Status} from '../../api/api';

const ActionsTable = () => {
  const [data, setData] = React.useState<any>([{name: 'Loading', status: Status.ERROR}]);
  React.useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) return;
    const data = localStorage.getItem(`${JSON.parse(user).login}_Actions`);
    if (!data) return;
    const newData = JSON.parse(data).data.dataList;
    let items: any = [];
    for (let key in newData) {
      items = [
        ...items,
        {
          status: newData[key].status,
          name: typeof newData[key].request === 'object' ? JSON.stringify(newData[key].request) : newData[key].request,
        },
      ];
    }
    console.log(items);
    setData(items);
  }, []);
  console.log(data);
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
    data,
  });

  return (
    <TableWrapper>
      <table>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
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
