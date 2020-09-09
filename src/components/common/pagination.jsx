import React from 'react';
import _ from 'lodash'; //popular js library for underscore

const Pagination = props => {
    const { itemsCount, currentPage, pageSize, onPageChange} = props;
    console.log(currentPage);
    const pagesCount = Math.ceil(itemsCount / pageSize);
    //console.log(pagesCount);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return (<nav>
        <ul className="pagination">
            {pages.map(page => (
                <li key = {page} className={ page === currentPage ? "page-item active" : "page-item"}>
                <a  
                    className="page-link" 
                    onClick={() =>onPageChange(page)}>{page}</a>
            </li>
            ))}
            
        </ul>
    </nav>
    );
}
 
export default Pagination;
