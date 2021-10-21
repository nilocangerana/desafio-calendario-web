import React from 'react';
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div className="homeListDiv">
        <ul className="homeList">
          <Link style={{textDecoration:"none"}} to='/criarUsuario'><li>Criar Usuário</li></Link>
          <Link style={{textDecoration:"none"}} to='/login'><li>Login</li></Link>
        </ul>
    </div>
  );
}

export default Home;