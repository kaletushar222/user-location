import React from 'react'
import MainHeader from'./MainHeader'
import'./MainNavigation.css';

const MainNavigation = props => {
    return (
        <MainHeader>
            <button className="main-navigation__menu-btn">
                <span />
                <span />
                <span />
            </button>
            <h1 className="main-navigation__title">
            {/* <link to="/"> Your Places</link> */}
            Your Places
            </h1>
            <nav>
            ...
            </nav>
        </MainHeader>
    )
}

export default MainNavigation