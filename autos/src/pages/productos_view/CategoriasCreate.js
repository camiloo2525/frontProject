import React, { useState } from 'react';
import axios from 'axios';

const CrearCategoria = () => {
    const [category, setCategory] = useState({
        name: '',
        description: '',
        priority: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/categories', category, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer 1|RVBDMjTLD5UswTTmqu4ZOuRxrqyVmaktq511psgN3e2fdde5`,
                },
            })
            .then((response) => setMessage('Categoría creada exitosamente.'))
            .catch((err) => setError('Error al crear la categoría.'));
    };

    return (
        <div>
            <h1>Crear Categoría</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        name="description"
                        value={category.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Prioridad:</label>
                    <input
                        type="number"
                        name="priority"
                        value={category.priority}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Crear</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CrearCategoria;
