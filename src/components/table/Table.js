import React, { useEffect, useState, useMemo } from "react";

import { useTable } from "react-table";
import moment from "moment";
import "./Table.css";
import {columns1} from "./COLUMNS";
import PropTypes from 'prop-types';

export default function Table({TCol, TDataKind, TableType,}) {
  const columns = useMemo(() => ColType(TCol),[TCol]);
  const [NPDataObj, setNPDataObj] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `https://api.covidtracking.com${TDataKind}`
        );
        const body = await result.json();
        const dataObj = []

        if (TableType === 1) {
          for (let i = 100; i >= 0; i = i - 10) {
            var a = moment(body[i].date, "YYYYMMDD").format("MMM Do");
            const dObj = {
              date: a,
              col1: body[i].negative,
              col2: body[i].positive
            }
            dataObj.push(dObj);
            // console.log(body[i]);
          }
        } else if (TableType === 2) {
          
          for (let i = 56; i >= 0; i = i - 1) {
            const dObj = {
              state: body[i].state,
              col1: body[i].negative,
              col2: body[i].positive
            }

            if (body[i].state != null && body[i].negative != null && body[i].positive != null) {
              dataObj.push(dObj);
            }
            // dataObj.push(dObj);
            // console.log(body[i]);
          }
        }


        setNPDataObj(dataObj);
      } catch (err) {}
    };
    fetchData();
    return () => {};
  });

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

Table.defaultProps = {
  TCol: columns1,
  TDataKind: '/v1/us/daily.json',
  TableType: 1,
}

Table.propTypes = {
  TCol: PropTypes.array,
  TDataKind: PropTypes.string,
  TableType: PropTypes.number,
}

function ColType(t) {
  return t
}