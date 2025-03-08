import {Link, useLocation} from 'react-router-dom'
import React from "react";

interface TlaAddNewProps {
    modal?: boolean;
    link: string;
    children: React.ReactNode;
    data?: Record<string, any>;
}

function TlaAddNew({ modal = true, link, children, data }: TlaAddNewProps) {
    const location = useLocation()
    return (
        <Link
            style={{ textDecoration: 'none' }}
            className='!no-underline'
            to={link}
            state={{ background: modal ? location : null, data }}
        >
            {children}
        </Link>
    )
}

export default TlaAddNew
