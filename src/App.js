import React, {useState} from 'react';
import styled from 'styled-components';
import { NavLink, Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio';
import Blog from './components/Blog';
import Tienda from './components/Tienda';
import Error404 from './components/Error404';
import Carrito from './components/Carrito';

const App = () => {
  const productos = [
    {id: 1, nombre: 'Producto 1'},
    {id: 2, nombre: 'Producto 2'},
    {id: 3, nombre: 'Producto 3'},
    {id: 4, nombre: 'Producto 4'},
  ];

  const [carrito, cambiarCarrito] = useState([]);

  const agregarProductoCarrito = (idProductoAAgregar, nombreProducto) => {
    //** Si el carrito no tiene elementos le agrego uno*/
    if(carrito.length === 0){
      cambiarCarrito([{id: idProductoAAgregar, nombre: nombreProducto, cantidad: 1}]);
    }else{
      // De otra forma tenemos que revisar que el carrito no tenga ya el producto a agregar
      // Si ya lo tiene entonces tenemos que actualizar el valor de "cantidad"
      // Si no tiene el producto entonces lo agregamos

      // Para poder editar el arreglo tenemos que clonarlo
      const nuevoCarrito = [...carrito];

      // Comprobamos si el carrito ya tiene el Id del producto a agregar
      // Esto me retorna true si encuentra productos en carrito y false si no hay ninguno
      const enCarrito = nuevoCarrito.filter((productoDeCarrito) => {
        return productoDeCarrito.id === idProductoAAgregar
      }).length > 0;
      // Si ya tiene el producto entonces lo tenemos que actualizar
      if(enCarrito){
        // Para ello tenemos que buscarlo, obtener su posicion en el arreglo.
        // y en base a su posicion ya actualizar el valor de "cantidad"
        nuevoCarrito.forEach((productoDeCarrito, index) => {
          if(productoDeCarrito.id === idProductoAAgregar){
            const cantidad = nuevoCarrito[index].cantidad;
            nuevoCarrito[index] = {
              id: idProductoAAgregar, 
              nombre:nombreProducto, 
              cantidad: cantidad+1
            };
          }
        })
      }else{
        // De otra forma entonces agregamos el producto al arreglo
        nuevoCarrito.push(
          {id: idProductoAAgregar, nombre: nombreProducto, cantidad: 1}
        )
      }
      // Por ultimo actualizo el carrito
      cambiarCarrito(nuevoCarrito);
    }
  };

  return (
    <Contenedor>
      <Menu>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/tienda">Tienda</NavLink>
      </Menu>
      <main>
        <Routes>
          <Route path='*' element={<Error404/>}/>
          <Route path='/' element={<Inicio/>}/>
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/tienda' element={
              <Tienda 
                productos={productos} 
                agregarProductoCarrito={agregarProductoCarrito}
              />
            }
          />
        </Routes>
      </main>
      <aside>
        <Carrito carrito={carrito}/>
      </aside>
    </Contenedor>
  );
}

const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;
 
const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;

export default App;