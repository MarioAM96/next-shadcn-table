import { User, columns } from './columns'
import { DataTable } from '@/components/returns/returns-table'
import axios from 'axios';

async function getReturns(): Promise<User[]> {
  try {
    const response = await axios.get('http://45.173.228.31/api/get-data/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/DEVOLUCIONES');
    const data = response.data;
    //console.log(data);
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
}

export default async function Page() {
  const data = await getReturns()

  return (
    <section className='bg-gray-100 py-10'>
      <div className='container bg-white p-6 rounded shadow-lg'>
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          {/* <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Devoluciones&nbsp;
          </p> */}
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  )
}
