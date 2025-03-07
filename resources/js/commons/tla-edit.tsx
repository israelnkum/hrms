import {Link, useLocation} from 'react-router-dom'
import React from "react";

interface TlaEditProps {
    link: string;
    data: Record<string, any>;
    children?: React.ReactNode
}

const TlaEdit: React.FC<TlaEditProps> = ({ link, data, children }) => {
    const location = useLocation();

    return (
        <Link to={ link } state={{ background: location, data: data }} className={'w-fit'}>
            {children ?? 'Edit'}
        </Link>
    );
};

export default TlaEdit;
