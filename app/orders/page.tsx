'use client'
import { useState, useEffect } from 'react';
import { User, columns } from './columns';
import { DataTable } from '@/components/orders/orders-table';
import axios from 'axios';
import { css } from '@emotion/react';
import { SyncLoader } from 'react-spinners';

export default function Page() {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://45.173.228.31/api/get-orders/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/PEDIDOS');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();

    // Clean-up function if needed
    return () => {
      // Any clean-up code if needed
    };
  }, []); // Empty dependency array to ensure this effect runs only once after initial render

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <section className='py-24 bg-gray-100'>
      <div className='container bg-white p-6 rounded shadow-lg'>
        {isLoading ? (
          <div className="spinner">
            <SyncLoader color="#36D7B7" loading={isLoading} css={override} size={15} />
          </div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </section>
  );
}
