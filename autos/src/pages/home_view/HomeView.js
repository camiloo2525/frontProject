import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeView.css';

const HomeView = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <h1>Bienvenido a Mi Aplicación</h1>
            <div className="menu">
                <div className="menu-item" onClick={() => navigate('/crearproducto')}>
                    Crear Productos
                </div>
                <div className="menu-item" onClick={() => navigate('/productos')}>
                    Ver Productos
                </div>
                <div className="menu-item" onClick={() => navigate('/categoria')}>
                    Ver Categorías
                </div>
                <div className="menu-item" onClick={() => navigate('/crearcategoria')}>
                    Crear Categorías
                </div>
                <div className="menu-item" onClick={() => navigate('/eliminar')}>
                    Eliminar Categorías y Productos
                </div>
                <div className="menu-item" onClick={() => navigate('/actualizar')}>
                    Actualizar Categorías y Productos
                </div>
                <div className="menu-item" onClick={() => navigate('/rutas')}>
                    Rutas
                </div>
            </div>
        </div>
    );
};

export default HomeView;
