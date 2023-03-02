import React from 'react';
import Productos from './Productos';

const Tienda = ({productos, agregarProductoCarrito}) => {
    return (
        <div>
            <h1>Tienda</h1>
            <Productos 
                productos={productos} 
                agregarProductoCarrito={agregarProductoCarrito}
            />
        </div>
    );
}
 
export default Tienda;