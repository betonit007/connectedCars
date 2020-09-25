import React from 'react';

const Paginate = ({ pageNumbers, changePage, currentPage }) => {
    
    const renderPageNumbers = numPages => {
        let pagesArray = [];
        for (let i = 1; i < numPages; i++) {
            
            pagesArray.push(<li onClick={()=>changePage(i)} key={i} ><span className="block hover:text-white cursor-pointer hover:bg-blue text-blue border-r border-grey-light px-3 py-2" href="#">{i}</span></li>)
        }
        return pagesArray;
    }

    return (
        <div className='flex justify-center mt-2 mb-4'>
            <ul className="flex list-reset border border-grey-light rounded w-auto font-sans shadow-xl bg-blue-500">
                <li><span onClick={()=>changePage('decrement')} className='block hover:text-white cursor-pointer hover:bg-blue text-blue border-r border-grey-light px-3 py-2' href="#">Previous</span></li>
                { renderPageNumbers(pageNumbers) }
                <li><span onClick={()=>changePage('increment')} className="block hover:text-white cursor-pointer hover:bg-blue text-blue px-3 py-2" href="#">Next</span></li>
            </ul>
        </div>
    )

}

export default Paginate
