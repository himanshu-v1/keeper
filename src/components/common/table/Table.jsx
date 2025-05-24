import { useSortBy, useTable } from "react-table";
import { useMemo } from "react";

function Table({ data }) {
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
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
                        {headerGroup.headers.map(column => (
                            <th>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                </span>
                            </th>
                        ))}
                    </tr>
                )
                )
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} key={row.getRowProps().key}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()} key={cell.getCellProps().key}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
};

export default Table;