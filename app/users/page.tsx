'use client'
import React, { useState, useEffect } from 'react';
import UserForm from '../../components/users/user-form';
import { DataTable } from '@/components/users/users-table';
import { User, columns } from './columns';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { SyncLoader } from 'react-spinners';

export default function Page() {
  const [formData, setFormData] = useState(null);
  const [data, setData] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Rol, setRol] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(isLoggedIn === 'true');
    const Rol = localStorage.getItem('Rol');
    if (Rol) {
      setRol(Rol);
    }

    fetchData().then(data => {
      setData(data);
      setIsLoading(false);
    });

    if (!isLoggedIn) {
      window.location.href = '/login';
    }
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(
        'http://45.173.228.31/api/get-data/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/EQUIPO'
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  const handleSubmit = async (formData: any) => {
    try {
      const postData = {
        userName: formData.userName,
        accountType: formData.accountType,
        password: formData.password
      };
      const response = await axios.post(
        'http://45.173.228.31/api/insert-user',
        postData
      );

      toast({
        title: 'Éxito!',
        description: 'Usuario creado exitosamente.'
      });

      console.log('POST Response:', response.data);
      fetchData().then(data => setData(data));
      setFormData(formData);
      setIsLoggedIn(true);
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
    <section className='bg-gray-100 py-10'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4 items-start'>
          <div className='md:col-span-1'>
            {isLoading ? (
              <div className="spinner">
                <SyncLoader color="#36D7B7" loading={isLoading} size={15} />
              </div>
            ) : isLoggedIn && Rol === 'Administrador' ? (
              <UserForm onSubmit={handleSubmit} />
            ) : isLoggedIn ? (
              <p className='text-red-500'>
                No tiene permisos necesarios para ver esta pantalla.
              </p>
            ) : (
              <p className='text-red-500'>
                Por favor, inicia sesión para acceder a esta página.
              </p>
            )}
          </div>

          <div className='md:col-span-3'>
            <div className='rounded bg-white p-6 shadow-lg'>
              {isLoggedIn && Rol === 'Administrador' && (
                <DataTable columns={columns} data={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
