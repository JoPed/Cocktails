import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Title from '../components/Title';
import Error from '../components/Error';
import Loader from '../components/Loader';

import { useGetData } from '../hooks/useGetData';

import { NavLink } from 'react-router-dom';

import { FaCocktail } from 'react-icons/fa';

import Pagination from '../components/Pagination';


const CocktailsByIngredients = () => {

    const { error, loading, data, getData } = useGetData();

    const [ query, setQuery ] = useState( '' );

    const [ startAtIndex, setStartAtIndex ] = useState( 0 );

    const [ endAtIndex, setEndAtIndex ] = useState( 10 );

    const [ itemsPerPage, setItemsPerPage ] = useState( 10 );

    const handleSubmit = ( e ) => {

        e.preventDefault();

        getData( 'https://edamam-recipe-search.p.rapidapi.com/search', {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPIKEY,
            'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
        },
            {
                q: query,
                from: startAtIndex,
                to: endAtIndex
            } )

    }

    // First filter out the International Bartenders Association Official Cocktails tag, the map out the rest
    // cocktail.tags.filter(tags => tags.tag.id != 'iba').map(t => t.tag.name).join(', ')

    return (
        <Container fluid="lg">

            <Title headline="Find cocktails efter ingredienser" />

            { error && <Error errorMessage="Noget gik galt da du hentede dataen. Prøv at genindlæse siden." /> }

            { loading && <Loader /> }

            <Row>
                <Col xs={ 12 } md={ { span: 6, offset: 3 } }>

                    <form className="form" onSubmit={ handleSubmit }>

                        <label className="labels" htmlFor="input1">Søg efter ingredienser</label>
                        <input type="text" id="input1" className="formInput search" onInput={ ( e ) => setQuery( e.target.value ) } />

                        <button className="searchBtn">Søg</button>


                    </form>
                </Col>
            </Row>

            <Row>

                { data && data.hits.slice( startAtIndex * itemsPerPage, ( startAtIndex * itemsPerPage ) + itemsPerPage ).map( ( cocktail, i ) => (
                    <Col md={ { span: 2, offset: i === 0 || i === 5 ? 1 : 0 } } key={ 'cocktail' + i } className="px-2 mb-3">

                        <section className="card card--drinks fulldetails">

                            <figure className="fullDetailFigure"><img src={ cocktail.recipe.image } alt={ cocktail.recipe.label } /></figure>
                            <h3 className="cardText">Cocktail:
                                {
                                    cocktail.recipe.label.includes( '{' ) ? ' ' + cocktail.recipe.label.split( '{' ).pop().split( '}' )[ 1 ] : ' ' + cocktail.recipe.label
                                }
                            </h3>
                            <p className="cardText"><span>Kategori: </span> { cocktail.recipe.dishType[ 0 ].slice( 0, 1 ).toUpperCase() + cocktail.recipe.dishType[ 0 ].slice( 1 ) } </p>

                            <NavLink to="/cocktaildetails" className="cardText" state={ { cocktailDetails: cocktail } }> <FaCocktail /> Detaljer</NavLink>


                        </section>
                    </Col>
                ) )
                }
                {

                    data &&
                    <Pagination
                        currentPage={ startAtIndex }
                        setCurrentPage={ setStartAtIndex }
                        itemsPerPage={ itemsPerPage }
                        itemsTotal={ data.count > 100 ? 100 : data.count }
                    />
                }
            </Row>

        </Container>
    )
}

export default CocktailsByIngredients;