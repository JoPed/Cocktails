import React from 'react'
import '../scss/Pagination.scss';

// currentPage, setCurrentPage = currentpage number = state fra komponentets parent (der hvor den bruges)
// itemsPerPage = how many items pr. page = state fra komponentets parent (der hvor den bruges)
// itemsTotal = how many items in total = data.length (length of the data array. NB lenght of data array might change depending on the api)
const Pagination = ( { currentPage, setCurrentPage, itemsPerPage, itemsTotal } ) => {

    // beregn antal sider
    let numOfPages = Math.ceil( itemsTotal / itemsPerPage );


    const nextPage = () => {
        setCurrentPage( currentPage + 1 )
    }

    const prevPage = () => {
        setCurrentPage( currentPage - 1 )
    }

    return (

        //Pagination navbar
        <nav className="pagination">
            <ul >

                {/* Previous button */ }
                <li className="pageItem">

                    {/* <GrFormPrevious
                        className={ `pagination__prev ${ currentPage <= 0 ? "disabled" : "" }` }
                        onClick={ prevPage }
                    /> */}
                    
                </li>
                { [ ...Array( numOfPages ) ].map( ( x, i ) => (
                    <li key={ "pgNr" + i }
                        className={ `pageItem ${ currentPage == i ? 'activePage' : '' } ` } >

                        <button
                            onClick={ () => setCurrentPage( i ) }
                            className="pagination__btn"
                        >

                            { i + 1 }
                        </button>
                    </li>
                ) ) }

                {/* Next button */ }
                <li className="pageItem">

                    {/* <GrFormNext
                        className={ `pagination__next ${ currentPage >= numOfPages - 1 ? " disabled" : "" }` }
                        onClick={ nextPage }
                    /> */}
                </li>
            </ul>

            <span></span>
        </nav>
    )
}

export default Pagination;