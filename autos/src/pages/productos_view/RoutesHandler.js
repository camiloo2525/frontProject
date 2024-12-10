import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';
const TOKEN = '1|RVBDMjTLD5UswTTmqu4ZOuRxrqyVmaktq511psgN3e2fdde5';

const RoutesHandler = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState(''); // Campo para valores de búsqueda
    const [slug, setSlug] = useState(''); // Campo para slug

    const handleRequest = async (endpoint) => {
        try {
            const response = await axios.get(`${API_URL}/${endpoint}`, {
                headers: { Authorization: `Bearer ${TOKEN}` },
            });
            setResult(response.data);
            setError(null);
        } catch (err) {
            setError(
                err.response?.data?.message || 'Error al realizar la solicitud.'
            );
            setResult(null);
        }
    };

    return (
        <div>
            <h1>Probar Rutas Dinámicas</h1>

            {/* Campo de búsqueda por Slug */}
            <div>
                <label htmlFor="slug">Slug:</label>
                <input
                    type="text"
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="Ejemplo: mercedez-gls"
                />
                <button onClick={() => handleRequest(`products/${slug}`)}>
                    Buscar Producto por Slug
                </button>
                <button onClick={() => handleRequest(`categories/${slug}/products`)}>
                    Categoría y Productos por Slug
                </button>
            </div>

            {/* Campo de búsqueda general */}
            <div>
                <label htmlFor="searchValue">Buscar:</label>
                <input
                    type="text"
                    id="searchValue"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Ejemplo: HondaCivic o mercedez"
                />
                <button onClick={() => handleRequest(`products/search/${searchValue}`)}>
                    Buscar Producto por Nombre
                </button>
                <button onClick={() => handleRequest(`categories/search/${searchValue}`)}>
                    Buscar Categoría por Nombre
                </button>
            </div>

            {/* Botón para obtener usuario autenticado */}
            <div>
                <button onClick={() => handleRequest('user')}>Usuario Autenticado</button>
            </div>

            {/* Resultados */}
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default RoutesHandler;


