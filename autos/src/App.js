import logo from './logo.svg';
import './App.css';
import ProductosView from './pages/productos_view/ProductosView';
import ProductosCreate from './pages/productos_view/ProductosCreate';
import ProductosEliminar from './pages/productos_view/ProductosEliminar';
import CategoriasView from './pages/productos_view/CategoriasView'
import CategoriasCreate from './pages/productos_view/CategoriasCreate';
import ProductosActualizar from './pages/productos_view/ProductosActualizar';
import RoutesHandler from './pages/productos_view/RoutesHandler';

import { Route, Routes } from "react-router-dom";
import HomeView from './pages/home_view/HomeView';


function App() {
  return (
    <>
			<Routes>
				<Route path="/" element={<HomeView/>} />

        <Route path="/productos" element={<ProductosView />} />
        <Route path="/crearproducto" element={<ProductosCreate />} />
        <Route path="/eliminar" element={<ProductosEliminar />} />
        <Route path="/categoria" element={<CategoriasView />} />
        <Route path="/crearcategoria" element={<CategoriasCreate />} />
        <Route path="/actualizar" element={<ProductosActualizar />} />
        <Route path="/rutas" element={<RoutesHandler />} />
			</Routes>

			
		</>
  );
}

export default App;
