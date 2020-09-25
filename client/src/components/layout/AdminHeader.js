import React from 'react'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
    return (
        <div className='bg-gray-800 text-white w-full flex'>
            <Link className="ml-auto mr-4" to='/create'>Admin</Link>
        </div>
    )
}

export default AdminHeader
