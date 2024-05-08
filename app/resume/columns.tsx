import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export type MaterialStock = {
  id: string;
  material: string;
  equipo: Record<string, string>; // Cambio aquí: equipo es un objeto con claves dinámicas
};

export const generateColumns = (equipoKeys: string[]): ColumnDef<MaterialStock>[] => {
  const columns: ColumnDef<MaterialStock>[] = [
    {
      accessorKey: 'Material',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Material
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  // Agregar columnas para cada equipo dinámicamente
  equipoKeys.forEach((equipoKey) => {
    columns.push({
      accessorKey: `equipo.${equipoKey}`,
      header: equipoKey // Usar el nombre del equipo como encabezado
    });
  });

  return columns;
};
