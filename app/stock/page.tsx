import { MaterialStock, columns } from './columns'
import { DataTable } from '@/components/stock/stock-table'
import axios from 'axios';

async function getUsers(): Promise<MaterialStock[]> {
  try {
    const response = await axios.get('http://45.173.228.31/api/get-data/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/MATERIAL_STOCK');
    const data = response.data;
    //console.log(data);
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
}

export default async function Page() {
  const data = await getUsers()

  return (
    <section className='bg-gray-100 py-24'>
      <div className='container bg-white p-6 rounded shadow-lg'>
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          </div>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  )
}
