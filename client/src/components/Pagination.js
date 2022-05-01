import React from 'react';

function Pagination({dogsPerPage, totalDogs, paginate}){
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {pageNumbers.map(number => (
                <button key={number} onClick={() => paginate(number)}>{number}</button>
                ))
            }
        </div>
    );
};

export default Pagination;