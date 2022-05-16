import React from 'react';
import './Pagination.css'

function Pagination({dogsPerPage, totalDogs, paginate}){
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className = 'pag-container'>
            {pageNumbers.map(number => (
                <button key={number} className = 'btn-number' onClick={() => paginate(number)}>{number}</button>
                ))
            }
        </div>
    );
};

export default Pagination;