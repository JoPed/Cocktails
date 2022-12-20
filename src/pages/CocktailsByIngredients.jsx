import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Title from '../components/Title';
import Error from '../components/Error';
import Loader from '../components/Loader';

import { useGetData } from '../hooks/useGetData';


const CocktailsByIngredients = () => {

    const { error, loading, data, getData } = useGetData();

    const [ query, setQuery ] = useState( 'gin' )

    useEffect( () => {

        getData( 'https://drinks-digital1.p.rapidapi.com/v1/cocktails/ingredients', {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPIKEY,
            'X-RapidAPI-Host': 'drinks-digital1.p.rapidapi.com'
        },
            {
                filters: query,
                type: 'by_id',
                limit: '25'
            } )

    }, [] )

    return (
        <Container fluid="lg">

            <Title headline="Find cocktails efter ingredienser" />

            { error && <Error errorMessage="Noget gik galt da du hentede dataen. Prøv at genindlæse siden." /> }

            { loading && <Loader /> }

            <Row>

                { data && data.map( cocktail => (
                    <Col md={ { span: 3, offset: 0 } } key={cocktail.id}>

                        <section className="card card--drinks fulldetails">

                            {/* <figure className="fullDetailFigure"><img src={ data.drinks[ 0 ].strDrinkThumb } alt={ data.strDrink } /></figure> */ }
                            <h3 className="cardText">{ cocktail.cocktail_name }</h3>
                            <p className="cardText"><span>Alkohol?:</span> { cocktail.alcoholic  }</p>

                            <div className="cardText"><span>Ingredients:</span>
                                <ul className="ingredientList">
                                    {
                                        getIngredients().map( ( ingr, index ) => (
                                            <li key={ "strIngredient" + index }
                                            >
                                                { ingr }

                                                <ul>
                                                    <li>{ getMeasurement()[ index ] }</li>
                                                </ul>

                                            </li>
                                        ) )
                                    }
                                </ul>
                            </div>

                            <p className="cardText"><span>Instruction:</span> <br />{ data.drinks[ 0 ].strInstructions }
                                <br />
                                {
                                    data.drinks[ 0 ].strVideo && <a className="cardText" href={ data.drinks[ 0 ].strVideo } target="_blank"><RxVideo /> </a>
                                }
                            </p>

                        </section>
                    </Col>
                ) )


                }
            </Row>

        </Container>
    )
}

export default CocktailsByIngredients;