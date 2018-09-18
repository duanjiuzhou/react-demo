import React from 'react';
import Link from './link';
import {FilterTypes} from '../../constants';

import './style.css';

const Filters = () => {
    return (
        <p className='filters'>
            <Link fliter={FilterTypes.ALL}> {FilterTypes.ALL} </Link>
            <Link fliter={FilterTypes.COMPLETED}> {FilterTypes.COMPLETED} </Link>
            <Link fliter={FilterTypes.UNCOMPLETED}> {FilterTypes.UNCOMPLETED} </Link>
        </p>
    )
}

export default Filters;