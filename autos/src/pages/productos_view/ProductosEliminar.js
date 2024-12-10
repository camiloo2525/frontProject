import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';
const TOKEN = '1|RVBDMjTLD5UswTTmqu4ZOuRxrqyVmaktq511psgN3e2fdde5';

// Función para obtener productos y categorías
const fetchItems = async (endpoint) => {
    const response = await axios.get(`${API_URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });
    return response.data;
};

// Función para actualizar un producto
export const updateProduct = (id, updatedData) => {
    return axios.put(`${API_URL}/products/${id}`, updatedData, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });
};

// Función para eliminar un producto
export const deleteProduct = (id) => {
    return axios.delete(`${API_URL}/products/${id}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });
};

// Función para actualizar una categoría
export const updateCategory = (id, updatedData) => {
    return axios.put(`${API_URL}/categories/${id}`, updatedData, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });
};

// Función para eliminar una categoría
export const deleteCategory = (id) => {
    return axios.delete(`${API_URL}/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });
};

// Componente React para gestionar productos y categorías
const ProductosUpdateDel = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Cargar productos y categorías al montar el componente
        const loadItems = async () => {
            try {
                const productsData = await fetchItems('products');
                const categoriesData = await fetchItems('categories');
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (err) {
                console.error('Error al cargar datos:', err);
                setError('Error al cargar productos o categorías.');
            }
        };

        loadItems();
    }, []);

    // Maneja la eliminación de un producto
    const handleDeleteProduct = async () => {
        if (!selectedProduct) {
            setError('Selecciona un producto para eliminar.');
            return;
        }

        try {
            await deleteProduct(selectedProduct);
            setMessage(`Producto con ID ${selectedProduct} eliminado exitosamente.`);
            setProducts(products.filter((p) => p.id !== selectedProduct)); // Actualiza la lista
            setSelectedProduct(null);
            setError('');
        } catch (err) {
            setError('Error al eliminar el producto.');
            setMessage('');
        }
    };

    // Maneja la eliminación de una categoría
    const handleDeleteCategory = async () => {
        if (!selectedCategory) {
            setError('Selecciona una categoría para eliminar.');
            return;
        }

        try {
            await deleteCategory(selectedCategory);
            setMessage(`Categoría con ID ${selectedCategory} eliminada exitosamente.`);
            setCategories(categories.filter((c) => c.id !== selectedCategory)); // Actualiza la lista
            setSelectedCategory(null);
            setError('');
        } catch (err) {
            setError('Error al eliminar la categoría.');
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Eliminar Productos y Categorías</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <h2>Productos</h2>
                <select
                    value={selectedProduct || ''}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                >
                    <option value="" disabled>
                        Selecciona un producto
                    </option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleDeleteProduct}>Eliminar Producto</button>
            </div>

            <div>
                <h2>Categorías</h2>
                <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="" disabled>
                        Selecciona una categoría
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleDeleteCategory}>Eliminar Categoría</button>
            </div>
        </div>
    );
};

export default ProductosUpdateDel;


