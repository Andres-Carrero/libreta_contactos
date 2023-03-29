import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { startLogout } from "../../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import "../../styles/navbar.scss";

export const Navbar = () => {
    const stateLogin = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const logout = () => {
      dispatch(startLogout());
      navigate('/')
    }

    return (
        <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary " >
            <div className="container-fluid ">
                <a className="navbar-brand" style={{color: '#ffffff', fontWeight: 'bold'}}>{stateLogin['name'] + ' ' + stateLogin['lastName']}</a>
                
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                   <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft: '38%'}}>
                    {/*<li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="/" style={{color: '#ffffff'}}>Mis Contactos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/" style={{color: '#ffffff'}}>Mis Grupos</Link>
                    </li>*/}
                  </ul>
                  <form className="d-flex" role="search">

                    <button className="btn btn-outline-success" type="button" onClick={logout}>Cerrar Sesión</button>
                  </form>
                </div>
            </div>
        </nav>
    );
};