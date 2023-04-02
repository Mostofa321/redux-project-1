import React from 'react';
import logo from '../../assets/images/logo.svg'
import { useDispatch } from 'react-redux';
import { searching } from '../../features/filter/filterSlice';

const Nav = () => {
    const dispatch = useDispatch();
    return (
        <nav className="container relative py-3">
                <div className="flex items-center justify-between">
                    <a href="./index.html">
                        <img src={logo} />
                    </a>
                    <div className="flex-1 max-w-xs search-field group">
                        <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
                        <input onChange={(e) => dispatch(searching(e.target.value))} type="search" placeholder="Search Task" className="search-input" id="lws-searchTask" />
                    </div>
                </div>
            </nav>
    );
};

export default Nav;