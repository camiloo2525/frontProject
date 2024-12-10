import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';
const TOKEN = '1|RVBDMjTLD5UswTTmqu4ZOuRxrqyVmaktq511psgN3e2fdde5';

const UpdateCategoriaProducto = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [updatedCategoryData, setUpdatedCategoryData] = useState({
        name: '',
        description: '',
        priority: '',
    });
    const [updatedProductData, setUpdatedProductData] = useState({
        name: '',
        description: '',
        category_id: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Cargar categorías y productos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await axios.get(`${API_URL}/categories`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
                const productResponse = await axios.get(`${API_URL}/products`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });

                setCategories(categoryResponse.data);
                setProducts(productResponse.data);
            } catch (err) {
                console.error('Error al cargar datos:', err);
                setError('Error al cargar categorías o productos.');
            }
        };

        fetchData();
    }, []);

    // Manejar actualización de categoría
    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        if (!selectedCategory) {
            setError('Selecciona una categoría para actualizar.');
            return;
        }

        try {
            const response = await axios.put(
                `${API_URL}/categories/${selectedCategory.id}`,
                updatedCategoryData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                }
            );
            setMessage('Categoría actualizada exitosamente.');
            setError('');
            console.log('Respuesta del servidor:', response.data);
        } catch (err) {
            console.error('Error al actualizar la categoría:', err.response || err);
            setError('Error al actualizar la categoría.');
            setMessage('');
        }
    };

    // Manejar actualización de producto
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        if (!selectedProduct) {
            setError('Selecciona un producto para actualizar.');
            return;
        }

        try {
            const response = await axios.put(
                `${API_URL}/products/${selectedProduct.id}`,
                updatedProductData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                }
            );
            setMessage('Producto actualizado exitosamente.');
            setError('');
            console.log('Respuesta del servidor:', response.data);
        } catch (err) {
            console.error('Error al actualizar el producto:', err.response || err);
            setError('Error al actualizar el producto.');
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Actualizar Categorías y Productos</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <h2>Actualizar Categoría</h2>
                <select
                    value={selectedCategory ? selectedCategory.id : ''}
                    onChange={(e) => {
                        const category = categories.find((c) => c.id === parseInt(e.target.value));
                        setSelectedCategory(category);
                        setUpdatedCategoryData({
                            name: category.name,
                            description: category.description,
                            priority: category.priority,
                        });
                    }}
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
                {selectedCategory && (
                    <form onSubmit={handleUpdateCategory}>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={updatedCategoryData.name}
                            onChange={(e) =>
                                setUpdatedCategoryData({
                                    ...updatedCategoryData,
                                    name: e.target.value,
                                })
                            }
                            required
                        />
                        <input
                            type="text"
                            placeholder="Descripción"
                            value={updatedCategoryData.description}
                            onChange={(e) =>
                                setUpdatedCategoryData({
                                    ...updatedCategoryData,
                                    description: e.target.value,
                                })
                            }
                            required
                        />
                        <input
                            type="number"
                            placeholder="Prioridad"
                            value={updatedCategoryData.priority}
                            onChange={(e) =>
                                setUpdatedCategoryData({
                                    ...updatedCategoryData,
                                    priority: e.target.value,
                                })
                            }
                            required
                        />
                        <button type="submit">Actualizar Categoría</button>
                    </form>
                )}
            </div>

            <div>
                <h2>Actualizar Producto</h2>
                <select
                    value={selectedProduct ? selectedProduct.id : ''}
                    onChange={(e) => {
                        const product = products.find((p) => p.id === parseInt(e.target.value));
                        setSelectedProduct(product);
                        setUpdatedProductData({
                            name: product.name,
                            description: product.description,
                            category_id: product.category_id,
                        });
                    }}
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
                {selectedProduct && (
                    <form onSubmit={handleUpdateProduct}>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={updatedProductData.name}
                            onChange={(e) =>
                                setUpdatedProductData({
                                    ...updatedProductData,
                                    name: e.target.value,
                                })
                            }
                            required
                        />
                        <input
                            type="text"
                            placeholder="Descripción"
                            value={updatedProductData.description}
                            onChange={(e) =>
                                setUpdatedProductData({
                                    ...updatedProductData,
                                    description: e.target.value,
                                })
                            }
                            required
                        />
                        <input
                            type="number"
                            placeholder="ID de Categoría"
                            value={updatedProductData.category_id}
                            onChange={(e) =>
                                setUpdatedProductData({
                                    ...updatedProductData,
                                    category_id: e.target.value,
                                })
                            }
                            required
                        />
                        <button type="submit">Actualizar Producto</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UpdateCategoriaProducto;

