import React, { useEffect, useRef, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Title from '../components/Title';
import Error from '../components/Error';
import Loader from '../components/Loader';

import { useGetData } from '../hooks/useGetData';

import { NavLink } from 'react-router-dom';

import { FaCocktail, FaAngleLeft, FaAngleRight } from 'react-icons/fa';


const CocktailsByIngredients = () => {

    const { error, loading, data, getData } = useGetData();

    const [ query, setQuery ] = useState( '' );

    const [paginationValue, setPaginationValue] = useState(0);

    const firstSubmit = useRef(true);

    const handleSubmit = ( e ) => {

        e.preventDefault();

        callAPI( 'https://edamam-recipe-search.p.rapidapi.com/search' );

        firstSubmit.current = false;

    }

    const callAPI = ( url ) => {

        getData( url, {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPIKEY,
            'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
        },
            {
                'q': query,
                'from': paginationValue,
                'to': paginationValue + 10,
                'dishType': 'Alcohol-cocktail',
                'dishType': 'Drinks'
            } )
    }

    const prevClick = () => {
        if(paginationValue === 0) {return }

        setPaginationValue(paginationValue - 10);
    }

    const nextClick = () => {
        console.log('first')
        setPaginationValue(paginationValue + 10);
    }

    useEffect(() => {

        // Don't run this the first time 
        if(!firstSubmit.current){
            callAPI('https://edamam-recipe-search.p.rapidapi.com/search');
        }


    }, [paginationValue])

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

            <Row className="mb-3">

                { data && data.hits.map( ( cocktail, i ) => (
                    <Col xs={12} md={6} lg={ 4} xxl={ { span: 2, offset: i === 0 || i === 5 || i === 10 || i === 15 ? 1 : 0 } } key={ 'cocktail' + i } className="px-2 mb-3">

                        <section className="card card--drinks fulldetails">

                            <figure className="fullDetailFigure"><img src={ cocktail.recipe.image } alt={ cocktail.recipe.label } /></figure>
                            <h3 className="cardText">Cocktail:
                                {
                                    cocktail.recipe.label.includes( '{' ) ? ' ' + cocktail.recipe.label.split( '{' ).pop().split( '}' )[ 1 ] : ' ' + cocktail.recipe.label
                                }
                            </h3>
                            <p className="cardText"><span>Kategori: </span> { cocktail.recipe.dishType[ 0 ].slice( 0, 1 ).toUpperCase() + cocktail.recipe.dishType[ 0 ].slice( 1 ) } </p>

                            <p className="cardText"><span>Kilde: </span> <a className="cardText" target="_blank" href={cocktail.recipe.url}>{cocktail.recipe.source}</a> </p>

                            <NavLink to="/cocktaildetails" className="cardText" state={ { cocktailDetails: cocktail } }> <FaCocktail /> Detaljer</NavLink>


                        </section>
                    </Col>
                ) )
                }

                {
                    data &&

                    <Row>
                        <Col className="buttonRow">
                            <button
                                className="pageBtn"
                                disabled={ data.from === 0 ? true : false }
                                onClick={ () => prevClick() }>
                                <FaAngleLeft />
                            </button>

                            {/* On the free plan of the api you cannot go above 100 elements shown */}
                            <button
                                className="pageBtn"
                                disabled={ data.to >= 100 }
                                onClick={ () => nextClick() }>
                                <FaAngleRight />
                            </button>
                        </Col>

                    </Row>

                }
            </Row>

            {/* <Row>
                <Col>
                    <div id="edamam-badge" data-color="transparent"></div>
                </Col>
            </Row> */}

        </Container>
    )
}

export default CocktailsByIngredients;