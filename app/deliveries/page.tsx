import { Order, columns } from './columns'
import { DataTable } from '@/components/deliveries/delivieries-table'
import axios from 'axios';

async function getDeliveries(): Promise<Order[]> {
  try {
    const response = await axios.get('http://45.173.228.31/api/get-deliveries/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/PEDIDOS');
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
}

export default async function Page() {
  const data = await getDeliveries()

  return (
    <section className='py-24 bg-gray-100'>
      <div className='container bg-white p-6 rounded shadow-lg'>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  )
}
