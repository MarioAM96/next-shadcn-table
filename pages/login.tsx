import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { consultas } from './api/controller';

// Importa los estilos globales si es necesario
import '../app/globals.css';

let { getUser } = consultas;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch(getUser, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Si la respuesta es exitosa, guardamos un indicador de autenticación en localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('Username', data.usernaame);
        localStorage.setItem('Rol', data.rol);
        console.log("Se inicio sesion correctamente");
        // Redirige a la nueva ruta
        console.log("Rol de sesion", data.rol);
        if (data.rol == 'Administrador') {
          router.push('/users');
        } else if (data.rol == 'Técnico') {
          router.push('/returns/new-return');
        }

      } else {
        setError('Credenciales inválidas. Por favor, inténtalo de nuevo.'); // Manejar errores
      }
    } catch (error) {
      setError('Se produjo un error. Por favor, inténtalo de nuevo.'); // Manejar errores de red o del servidor
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Usuario
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            name="email"
            placeholder="Usuario"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Contraseña"
            required
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
}
