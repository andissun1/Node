import { useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import './TanstackTable.css';
// import DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';

export const TanstackTable = ({ serverData }) => {
  const columns = useMemo(() => COLUMNS, []);
  const [data, setData] = useState(serverData);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState();

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // На каждый столбец фильтр
  const colunmnFilterTest = (id, value) =>
    setColumnFilters(
      columnFilters.concat({
        id,
        value,
      })
    );

  return (
    <div className="TanstackTable">
      <div className="serachContainer">
        <input
          onChange={(e) => setGlobalFilter(e.target.value)}
          type="text"
          value={globalFilter || ''}
          placeholder="Общий поиск"
          className="generalSearch"
        />
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ position: 'relative', width: header.getSize() }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}

                  {header.column.getCanFilter() ? (
                    <input
                      className="columnFilter"
                      placeholder="..."
                      onChange={(e) => colunmnFilterTest(header.id, e.target.value)}
                    />
                  ) : null}
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${
                        header.column.getIsResizing() ? 'isResizing' : ''
                      }`}
                    ></div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="pagination">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          назад
        </button>
        <p>
          Страница {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
        </p>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          вперёд
        </button>
      </div>
    </div>
  );
};
