
import './product_view.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductosView = () => {
    const [products, setProducts] = useState([]); // Estado para almacenar los productos
    const [loading, setLoading] = useState(true); // Estado para manejar el cargado
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        // Realiza la solicitud a la API
        axios
            .get('http://localhost:8000/api/products')
            .then((response) => {
                setProducts(response.data); // Almacena los datos de los productos
                setLoading(false); // Cambia el estado de carga
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
                setError('No se pudieron cargar los productos.');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Lista de Productos</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Categoría: {product.category.name}</p>
                        {/* Mostrar imagen si está disponible */}
                        {product.image && (
                            <div>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '200px', height: 'auto' }}
                                />
                            </div>
                        )}
                        {/* Mostrar slug */}
                        <p>Slug: {product.slug}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductosView;

