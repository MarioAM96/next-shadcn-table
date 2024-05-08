'use client'
import React, { useState, useEffect } from 'react';
import OrderForm from '../../../components/returns/new-return-card';
import { DataTable } from '@/components/returns/returns-table';
import { User, columns } from './columns';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { SyncLoader } from 'react-spinners';

async function fetchData() {
  try {
    const response = await axios.get(
      'http://45.173.228.31/api/get-data/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/DEVOLUCIONES'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export default function Page() {
  const [formData, setFormData] = useState(null);
  const [data, setData] = useState<User[]>([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchData().then(data => {
      setData(data);
      setIsLoading(false);
    });
    const userRole = localStorage.getItem('Rol');
    if (userRole) {
      setUserRole(userRole);
    }
  }, []);

  const handleSubmit = async (formData: any) => {
    try {
      const postData = {
        material: formData.material,
        quantity: formData.quantity,
        comment: formData.comment,
        tecnico: formData.tecnico,
        code: formData.code,
        soldate: formData.soldate,
        warehouse: formData.warehouse
      };
      const response = await axios.post(
        'http://45.173.228.31/api/get-data/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/DEVOLUCIONES',
        postData
      );

      toast({
        title: 'Éxito!',
        description: 'Devolución creada Exitosamente.'
      });

      console.log('POST Response:', response.data);
      fetchData().then(data => setData(data));
      setFormData(formData);
    } catch (error) {
      toast({
        title: 'Error!',
        description: '¡Ups! Algo salió mal.'
      });

      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return (
    <section className='py-24 bg-gray-100'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 items-start'>
          <div className='md:col-span-1'>
            {isLoading ? (
              <div className='spinner'>
                <SyncLoader color='#36D7B7' loading={isLoading} size={15} />
              </div>
            ) : (
              <OrderForm onSubmit={handleSubmit} />
            )}

          </div>
          <div className='md:col-span-3'>
            {userRole === 'Administrador' && (
              <div className='bg-white p-6 rounded shadow-lg'>
                <DataTable columns={columns} data={data} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
