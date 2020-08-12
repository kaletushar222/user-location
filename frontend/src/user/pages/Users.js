import React from 'react';

import UsersList from '../components/UsersList';

const  Users = () =>{
    const users = [
        {
            id      : 'u1',
            name    : "Tushar Kale",
            image   :'https://images.unsplash.com/photo-1597011769841-bcb58aae661b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max', 
            places  : 6
        }
    ];
    return <UsersList items={ users } />
}

export default Users;