import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  Row
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { toast } from '../ui/use-toast';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [editingRow, setEditingRow] = useState<Row<TData> | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [warehouseOptions, setWarehouseOptions] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    async function fetchWarehouseData() {
      try {
        const response = await axios.get(
          'http://45.173.228.31/api/get-warehousedata/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/MATERIAL_STOCK'
        );
        setWarehouseOptions(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de bodega:', error);
      }
    }
    fetchWarehouseData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function handleEdit(row: Row<TData>) {
    console.log('Editando el registro:', row.original);
    setEditingRow(row);
  }

  function handleInputChange(value: string, field: string) {
    if (editingRow) {
      const updatedRow = {
        ...editingRow,
        original: {
          ...editingRow.original,
          [field]: value
        }
      };
      setEditingRow(updatedRow);
    }
  }

  async function handleSave() {
    if (editingRow) {
      const postData = editingRow.original;
      postData["Status Entrega"] = "Entregado";
      try {
        const response = await axios.put(
          "http://45.173.228.31/api/update-data/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/PEDIDOS",
          postData
        );
        toast({
          title: "Éxito!",
          description: "Entrega gestionada Exitosamente.",
        });
        window.location.reload(); // Recargar la página
        console.log('Respuesta del servidor:', response.data);
      } catch (error) {
        console.error('Error al guardar los datos:', error);
      }
      setEditingRow(null);
    }
  }

  function handleCancel() {
    setEditingRow(null);
  }

  return (
    <section className='py-0 bg-gray-100'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <>
            <div className='md:col-span-1'>
              <div>
                <div className='flex items-center justify-center p-6 rounded bg-white shadow-lg border border-gray-200'>
                  {/* Title */}
                  {!editingRow && (
                    <h2 className="text-lg font-semibold mb-4">Gestión de entregas</h2>
                  )}

                  {/* Edit Form */}
                  {editingRow && (
                    <div className="edit-form">
                      <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-4">Gestión de entregas</h2>
                        <label htmlFor="bodega" className="block text-sm font-medium text-gray-700">Bodega:</label>
                        <Select
                          id="bodega"
                          value={editingRow.original.Bodega || ''}
                          onValueChange={(value) => {
                            handleInputChange(value, 'Bodega');
                            console.log('Valor seleccionado:', value);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue>{editingRow.original.Bodega}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {warehouseOptions.map((option, index) => (
                              <SelectItem key={index} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="inline-flex flex-col">
                        <div className="mb-4">
                          <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">Código:</label>
                          <Input
                            type="text"
                            id="cantidad"
                            value={editingRow.original.Código}
                            onChange={(e) => handleInputChange(e.target.value, 'Código')}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="cantidadEntregada" className="block text-sm font-medium text-gray-700">Fecha de entrega:</label>
                          <Input
                            type="date"
                            id="cantidadEntregada"
                            value={editingRow.original["Fecha de entrega"]}
                            onChange={(e) => handleInputChange(e.target.value, 'Fecha de entrega')}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="cantidadEntregada" className="block text-sm font-medium text-gray-700">Cantidad Entregada:</label>
                          <Input
                            type="number"
                            id="cantidadEntregada"
                            value={editingRow.original["Cantidad Entregada"]}
                            onChange={(e) => handleInputChange(e.target.value, 'Cantidad Entregada')}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="observacion" className="block text-sm font-medium text-gray-700">Observación:</label>
                          <Input
                            type="text"
                            id="observacion"
                            value={editingRow.original.Observación}
                            onChange={(e) => handleInputChange(e.target.value, 'Observación')}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button onClick={handleSave} className="mr-2">Guardar</Button>
                        <Button onClick={handleCancel}>Cancelar</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='md:col-span-3'>
              <div className='bg-white p-6 rounded shadow-lg'>
                {/* Filters */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center py-4'>
                    <Input
                      placeholder='Buscar...'
                      value={(table.getColumn('Material Solicitado')?.getFilterValue() as string) ?? ''}
                      onChange={event =>
                        table.getColumn('Material Solicitado')?.setFilterValue(event.target.value)
                      }
                      className='max-w-sm'
                    />
                  </div>
                  {/* Column visibility */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' className='ml-auto'>
                        Columnas
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      {table
                        .getAllColumns()
                        .filter(column => column.getCanHide())
                        .map(column => {
                          return (
                            <DropdownMenuCheckboxItem
                              key={column.id}
                              className='capitalize'
                              checked={column.getIsVisible()}
                              onCheckedChange={value => column.toggleVisibility(!!value)}
                            >
                              {column.id}
                            </DropdownMenuCheckboxItem>
                          );
                        })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {/* Table */}
                <div className='rounded-md border'>
                  <Table>
                    <TableHeader>
                      {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                          {/* Celda vacía para compensar el espacio del botón "Gestionar" */}
                          <TableHead />
                          {headerGroup.headers.map(header => {
                            return (
                              <TableHead key={header.id}>
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                              </TableHead>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map(row => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && 'selected'}
                          >
                            {/* Botón "Gestionar" en la primera celda */}
                            <TableCell>
                              <Button variant='outline' onClick={() => handleEdit(row)}>Gestionar</Button>
                            </TableCell>
                            {/* Resto de las celdas */}
                            {row.getVisibleCells().map(cell => (
                              <TableCell key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length + 1} // Aumenta el colspan para incluir la celda del botón
                            className='h-24 text-center'
                          >
                            Sin resultados..
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                {/* Pagination */}
                <div className='flex items-center justify-end space-x-2 py-4'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </section>
  );
}
