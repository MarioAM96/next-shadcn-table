'use client'
import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/deliveries/manage-delivieries-table'
import { User, columns } from "./columns";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { SyncLoader } from 'react-spinners';

async function fetchData() {
    try {
        const response = await axios.get(
            "http://45.173.228.31/api/get-orders/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/PEDIDOS"
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export default function Page() {
    const [formData, setFormData] = React.useState(null);
    const [data, setData] = React.useState<User[]>([]);
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        fetchData().then((data) => { setData(data); setIsLoading(false); });
    }, []);

    return (
        <section className='py-24 bg-gray-100'>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                    {isLoading ? (
                        <div className="spinner">
                            <SyncLoader color="#36D7B7" loading={isLoading} size={15} />
                        </div>
                    ) : (
                        <div>
                            <DataTable columns={columns} data={data} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}