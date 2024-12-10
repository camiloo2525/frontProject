import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VerCategorias = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/categories') // No se requiere token si la API no lo exige
            .then((response) => {
                console.log('Categorías recibidas:', response.data); // Depuración
                setCategories(response.data);
            })
            .catch((err) => {
                console.error('Error al cargar categorías:', err);
                setError('Error al cargar categorías.');
            });
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Categorías</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <h2>{category.name}</h2>
                        <p>{category.description}</p>
                        <p>ID: {category.id}</p>
                        <p>Prioridad: {category.priority}</p>
                        <p>Slug: {category.slug}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VerCategorias;



