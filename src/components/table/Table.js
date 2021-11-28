import React, { useEffect, useState, useMemo } from "react";

import { useTable } from "react-table";
import moment from "moment";
import "./Table.css"

export default function Table() {
  const columns = useMemo(
    () => [
      {
        Header: "United States",
        accessor: 'date',
      },
      {
        Header: 'Negative',
        accessor: 'col1',
      },
      {
        Header: 'Positive',
        accessor: 'col2',
      },
    ],
    []
  )
  
  const [NPDataObj, setNPDataObj] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `https://api.covidtracking.com/v1/us/daily.json`
        );
        const body = await result.json();
        const dataObj = []

        for (let i = 100; i >= 0; i = i - 10) {
          var a = moment(body[i].date, "YYYYMMDD").format("MMM Do");
          const dObj = {
            date: a,
            col1: body[i].negative,
            col2: body[i].positive
          }
          dataObj.push(dObj);
          console.log(body[i]);
        }
        setNPDataObj(dataObj);
      } catch (err) {}
    };
    fetchData();
    return () => {};
  }, []);

  const data = useMemo(() => NPDataObj, [NPDataObj])

  const tableInstrance = useTable({
    columns,
    data,
  });

  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows, 
    prepareRow 
  } = tableInstrance;

  return (
    <div>
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
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
