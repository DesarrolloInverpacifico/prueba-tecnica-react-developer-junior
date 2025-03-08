import { MaterialReactTable, MRT_ColumnDef, MRT_RowData, useMaterialReactTable } from "material-react-table";
import { useNavigate } from "react-router-dom";

function Table<T extends MRT_RowData>({ data, columns }: { data: T[] | undefined, columns: MRT_ColumnDef<T>[] }) {
    const navigate = useNavigate();
    
    
    const table = useMaterialReactTable({
        columns,
        data: data ?? [],
        muiTableBodyRowProps: ({ row }) => ({
            onClick: () => {
                // @ts-ignore (Ignorar error si `id` no está en `T`)
                const id = row.original.id;
                if (id) navigate(`/description/${id}`);
            },
            style: { cursor: "pointer" }
        }),
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableGlobalFilter: true,
        initialState: {
            pagination: {
                pageSize: 10,
                pageIndex: 0
            }
        }
    });

    return <MaterialReactTable table={table} />;
}

export default Table;
