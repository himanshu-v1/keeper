import { useSortBy, useTable } from "react-table";
import { useMemo } from "react";
import Button from "../button/Button";
import './table.scss';

function Table({ data, buttons }) {
    const columns = useMemo(() => [
        { Header: 'Item', accessor: 'item' },
        { Header: 'Amount', accessor: 'amt' },
        { Header: 'Date', accessor: 'date' },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

	return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
                            {
                                headerGroup.headers.map(column => (
                                    <th>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                        </span>
                                    </th>
                                ))
                            }
                            { 
                                buttons && buttons.length && buttons.map(() => (<th></th>)) 
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} key={row.getRowProps().key}>
                            {
                                row.cells.map(cell => {
                                    return <td {...cell.getCellProps()} key={cell.getCellProps().key}>{cell.render('Cell')}</td>
                                })
                            }
                            {
                                buttons && buttons.length &&
                                buttons.map((btn) => (
                                    <td>
                                        <Button className={`${btn.type}`} handleClick={() => btn.handleClick(row.original.id)}>
                                            <i className={`fa fa-${btn.action}`}></i>
                                        </Button>
                                    </td>
                                ))
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
};

export default Table;