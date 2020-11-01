import React from 'react';
import ListadoProyectos from '../proyectos/ListadoProyectos';
import NuevoProyecto from '../proyectos/NuevoProyecto';

const Sidebar = () => {
    return ( 
        <aside>
            <h1>MERM<span>Tasks</span></h1>
        
        <NuevoProyecto />
            <div className="proyectos">
                <h2>tus Proyectos</h2>

                <ListadoProyectos />
            </div>
        </aside>

     );
}
 
export default Sidebar;