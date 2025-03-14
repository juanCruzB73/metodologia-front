import React, { useEffect, useState } from 'react'

interface ICompany{
    name:string;
    catchPhrase:string;
    bs:string;
}


interface IGeo{
    lat:string;
    lng:string;
}

interface IAdress{
    street:string;
    suite:string;
    city:string;
    zipcode:string;
    geo:IGeo;
}


interface IUser{
    id:number;
    name:string;
    username:string;
    email:string;
    address:IAdress;
    phone:string;
    website:string;
    company:ICompany;
}


export const App = () => {
  
    const [users,setUsers]=useState<IUser[]>([]);

    const fetchUsers=async()=>{
        const result = await fetch('https://jsonplaceholder.typicode.com/users?start=0&_limit=10')
        const data = await result.json()
        
        setUsers(data)

        
    }

    useEffect(()=>{
        fetchUsers()
    },[])

    return (
    <div>
        {
            users.map(user=>(
                <div>
                    <h1>{user.name}</h1>
                    <p>username: {user.username}</p>
                    <p>email: {user.email}</p>
                    <p>phone: {user.phone}</p>
                    <p>website: {user.website}</p>
                    <h3>address</h3>
                    <p>{user.address.city}</p>
                    <p>{user.address.suite}</p>
                    <p>{user.address.street}</p>
                    <p>{user.address.zipcode}</p>
                    <h4>geo</h4>
                    <p>{user.address.geo.lat}</p>
                    <p>{user.address.geo.lng}</p>
                    <h3>company</h3>
                    <p>{user.company.name}</p>
                    <p>{user.company.catchPhrase}</p>
                    <p>{user.company.bs}</p>
                </div>
            ))
        }
    </div>
  )
}
