import { useState } from 'react';
import Image from 'next/image';
import '../app/globals.css';

const Home: React.FC = () => {
    // Estado para almacenar los materiales (simulado)
    const [materiales, setMateriales] = useState([
        { id: 1, nombre: 'Material 1', cantidad: 100 },
        // Agrega más materiales aquí según sea necesario
    ]);

    // Función para eliminar un material
    const handleEliminarMaterial = (id: number) => {
        const updatedMateriales = materiales.filter((material) => material.id !== id);
        setMateriales(updatedMateriales);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {/* Sección de título */}
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                {/* Tu título existente */}
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Material&nbsp;
                </p>
                {/* Otra sección existente */}
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
                </div>
            </div>

            {/* Sección de la tabla de materiales */}
            <div className="w-full max-w-5xl mt-8">
                <h2 className="text-xl font-bold mb-4">Tabla de Materiales</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="p-2 border border-gray-200">Nombre</th>
                            <th className="p-2 border border-gray-200">Cantidad</th>
                            <th className="p-2 border border-gray-200">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materiales.map((material) => (
                            <tr key={material.id}>
                                <td className="p-2 border border-gray-200">{material.nombre}</td>
                                <td className="p-2 border border-gray-200">{material.cantidad}</td>
                                <td className="p-2 border border-gray-200">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">Editar</button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded ml-2" onClick={() => handleEliminarMaterial(material.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Sección de imagen (parte existente de tu código) */}
            <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                />
            </div>

            {/* Otra sección existente (puedes añadir más contenido aquí) */}
            <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
            </div>
        </main>
    );
};

export default Home;
