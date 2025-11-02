export const COLUMNS = [
  {
    accessorKey: 'date',
    header: 'Дата',
    size: 50,
    cell: (props) => <p>{props.getValue()}</p>,
    footer: (props) => props.column.columnDef.header,
    sortingFn: 'alphanumeric',
    filterFn: 'includesString',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'fullname',
    header: 'ФИО',
    cell: (props) => <p>{props.getValue()}</p>,
    footer: (props) => props.column.columnDef.header,
    sortingFn: 'alphanumeric',
    filterFn: 'includesString',
  },
  {
    accessorKey: 'phone',
    header: 'Телефон',
    cell: (props) => <p>{props.getValue()}</p>,
    footer: (props) => props.column.columnDef.header,
    sortingFn: 'alphanumeric',
    filterFn: 'includesString',
  },
  {
    accessorKey: 'message',
    header: 'Проблема',
    cell: (props) => <p>{props.getValue()}</p>,
    footer: (props) => props.column.columnDef.header,
    sortingFn: 'alphanumeric',
    filterFn: 'includesString',
    enableColumnFilter: false,

    // enableColumnFilter: false,
  },
];
