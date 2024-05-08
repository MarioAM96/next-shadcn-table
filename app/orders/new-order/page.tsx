'use client'
import React, { useState, useEffect } from 'react';
import OrderForm from '../../../components/orders/new-order-card';
import GroupOrderForm from '../../../components/orders/new-grouporder-card';
import { DataTable } from '@/components/orders/orders-table';
import { GroupOrders } from '@/components/orders/group-orders';
import { User, columns } from './columns';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { SyncLoader } from 'react-spinners';

async function fetchData() {
    try {
        const response = await axios.get(
            'http://45.173.228.31/api/get-orders/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/PEDIDOS'
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

    useEffect(() => {
        fetchData().then(data => {
            setData(data);
            setIsLoading(false);
        });
    }, []);

    const handleSubmit = async (formData: any) => {
        try {
            const postData = {
                unuse: '',
                material: formData.material,
                quantity: formData.quantity,
                comment: formData.comment,
                soldate: formData.soldate,
                packagework: formData.packagework,
                tecnico: formData.tecnico,
                status: formData.status
            };
            const response = await axios.post(
                'http://45.173.228.31/api/get-data/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/PEDIDOS',
                postData
            );

            toast({
                title: 'Éxito!',
                description: 'Pedido creado Exitosamente.'
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

    const handleSubmit1 = async (formData: any) => {
        try {
            console.log("DATOS", formData);
            //fetchData().then(data => setData(data));
            setData(formData);
        } catch (error) {

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
                            <>
                                <OrderForm onSubmit={handleSubmit} />
                                <br />
                                {/* <GroupOrderForm onSubmit={handleSubmit1} /> */}
                            </>
                        )}
                    </div>
                    <div className='md:col-span-3'>
                        <div className='bg-white p-6 rounded shadow-lg'>
                            <DataTable columns={columns} data={data} />
                        </div>
                        <br></br>
                        {/* <div className='bg-white p-6 rounded shadow-lg'>
                            <GroupOrders columns={columns} data={data} />
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
