// colums.ts
import { MRT_ColumnDef } from "material-react-table";
import { IAccessControls, IEmployee } from "./interfase";

export const columnsDescription: MRT_ColumnDef<IAccessControls>[] = [
  {
    accessorKey: "attributes.check_in",
    header: "INGRESO",
    enableHiding: false,
  },
  {
    accessorKey: "attributes.check_out",
    header: "SALIDA",
    enableHiding: false,
  },
  {
    accessorKey: "attributes.created_at",
    header: "CREACION DEL REGISTRO",
    enableHiding: false,
    Cell: ({ cell }) => {
      const date = new Date(cell.getValue<string>());
      const formattedDate = date.toLocaleString('es-CO', {
        dateStyle: 'short',
        timeStyle: 'short',
      });

      return formattedDate;
    },
  },
  {
    accessorKey: "time",
    header: "TIEMPO",
    enableHiding: false,
  },
];

export const columnsEmployees: MRT_ColumnDef<IEmployee>[] = [
  {
    accessorKey: "attributes.first_name",
    header: "NOMBRE",
    enableHiding: false,
  },
  {
    accessorKey: "attributes.last_name",
    header: "APELLIDO",
    enableHiding: false,
  },
  {
    accessorKey: "attributes.email",
    header: "CORREO ELECTRONICO",
    enableHiding: false,
    enableClickToCopy: true,
  },
  {
    accessorKey: "attributes.charge",
    header: "CARGO",
    enableHiding: false,
  },
  {
    accessorKey: "attributes.salary",
    header: "SALARIO BASE",
    enableHiding: false,
    Cell: ({ cell }) => {
      const formattedSalary = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0, // Elimina los decimales
      }).format(cell.getValue<number>());

      return formattedSalary;
    },
  },
];