import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css'
import { AuthContext } from '../../context/auth-context';

const NavLinks = props => {
    const auth = useContext(AuthContext);
    return (
        <ul className="nav-links">
            <li>
                <NavLink to='/'exact> ALL USERS</NavLink>
            </li>
            {
                auth.isLoggedIn &&(
                    <li>
                        <NavLink to='/u1/places'exact> MY PLACES</NavLink>
                    </li>
                )
            }
            {
                auth.isLoggedIn &&(
                    <li>
                        <NavLink to='/places/new'exact>ADD PLACE</NavLink>
                    </li>
                )    
            }
            {
                !auth.isLoggedIn &&(
                    <li>
                        <NavLink to='/auth'exact>AUTHENTICATE</NavLink>
                    </li>
                )    
            }
        </ul>
    )
}

export default NavLinks