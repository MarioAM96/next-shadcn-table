'use client'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectItem,
    Select,
} from "@/components/ui/select";

interface UserFormProps {
    onSubmit: (data: any) => void;
}

const formSchema = z
    .object({
        material: z.string(),
        quantity: z.number(),
        comment: z.string(),
        tecnico: z.string(),
        code: z.string(),
        warehouse: z.string(),
        soldate: z.string()
    })

const OrderForm: React.FC<UserFormProps> = ({ onSubmit }) => {
    const [materialOptions, setMaterialOptions] = useState<any[]>([]);
    const [tecnicoOptions, setTecnicoOptions] = useState<any[]>([]);
    const [warehouseOptions, setWarehouseOptions] = useState<any[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    "http://45.173.228.31/api/get-data/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/MATERIAL_STOCK"
                );
                setMaterialOptions(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        async function equipoData() {
            try {
                const response = await axios.get(
                    "http://45.173.228.31/api/get-data/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/EQUIPO"
                );
                setTecnicoOptions(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        async function WarehouseData() {
            try {
                const response = await axios.get(
                    "http://45.173.228.31/api/get-warehousedata/1UliJqH6oNuZEk6l72r7alxHe5QOyYGS6ZzS8NtyfYP4/MATERIAL_STOCK"
                );
                setWarehouseOptions(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
        equipoData();
        WarehouseData();
    }, []);

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);
    };

    return (
        <div className="max-w-md w-full">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Nueva Devolución</h2>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="material"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Material Devuelto</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar un Material" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {materialOptions
                                                    .filter((material: any) => material.Material.trim() !== "") // Filtrar elementos vacíos
                                                    .map((material: any) => (
                                                        <SelectItem key={material.id} value={material.Material}>
                                                            {material.Material}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>

                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Cantidad</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number" // Cambia el tipo de entrada a "number"
                                                {...field}
                                                onChange={(e) => {
                                                    // Asegúrate de que el valor sea un número entero antes de actualizar el estado
                                                    const value = parseInt(e.target.value);
                                                    field.onChange(value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Observación</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="tecnico"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Técnico Responsable</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar un Técnico" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {tecnicoOptions
                                                    .filter((tecnico: any) => tecnico.Nombre.trim() !== "") // Filtrar elementos vacíos
                                                    .map((tecnico: any) => (
                                                        <SelectItem key={tecnico.id} value={tecnico.Nombre}>
                                                            {tecnico.Nombre}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>

                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Código</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="soldate"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Fecha de Entrega</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="warehouse"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Bodega</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seleccionar una Bodega" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {warehouseOptions.map((bodega, index) => (
                                                    <SelectItem key={index} value={bodega}>
                                                        {bodega}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <Button type="submit" className="w-full">
                            Crear
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default OrderForm;
