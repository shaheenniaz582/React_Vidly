import React from 'react';
import _ from 'lodash'; //popular js library for underscore

const Pagination = props => {
    const { itemsCount, pageSize} = props;

    const pagesCount = Math.ceil(itemsCount / pageSize);
    console.log(pagesCount);
    const pages = _.range(1, pagesCount + 1);

    return (<nav>
        <ul className="pagination">
            {pages.map(page => (
                <li key = {page} className="page-item">
                <a  className="page-link">{page}</a>
            </li>
            ))}
            
        </ul>
    </nav>
    );
}
 
export default Pagination;
