import React, { useState } from 'react';
import axios from 'axios';

const CrearProducto = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category_id: 1,
    });
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('category_id', product.category_id);
        if (image) formData.append('image', image);

        axios
            .post('http://localhost:8000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer 1|RVBDMjTLD5UswTTmqu4ZOuRxrqyVmaktq511psgN3e2fdde5`, 
                },
            })
            .then((response) => {
                setMessage('Producto creado exitosamente.');
                setError('');
            })
            .catch((err) => {
                console.error('Error al crear el producto:', err);
                setError('Error al crear el producto.');
                setMessage('');
            });
    };

    return (
        <div>
            <h1>Crear Producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <input
                        type="number"
                        name="category_id"
                        value={product.category_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="file" onChange={handleImageChange} />
                </div>
                <button type="submit">Crear</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CrearProducto;


