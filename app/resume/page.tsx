'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from '@/components/resume/resume-table';
import { generateColumns, MaterialStock } from './columns';
import { SyncLoader } from 'react-spinners';

async function getUsers(): Promise<MaterialStock[]> {
  try {
    const response = await axios.get('http://45.173.228.31/api/get-data/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/RESUMEN');
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
}

export default function Page() {
  const [data, setData] = useState<MaterialStock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const newData = await getUsers();
      setData(newData);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const equipoKeys = data.length > 0 ? Object.keys(data[0].equipo) : [];
  const columns = generateColumns(equipoKeys);

  return (
    <section className='bg-gray-100 py-24'>
      <div className='container bg-white p-6 rounded shadow-lg'>
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          </div>
        </div>
        {isLoading ? (
          <div className="spinner">
            <SyncLoader color="#36D7B7" loading={isLoading} size={15} />
          </div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}

      </div>
    </section>
  )
}
