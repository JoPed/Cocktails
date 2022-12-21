import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Title from '../components/Title';

const CocktailDetails = () => {

    //*Sending props with navlink
    const location = useLocation();
    const { state } = location;
    const [ isNutritionVisible, setIsNutritionVisible ] = useState( false );
    const [ isIngredientsVisible, setIsIngredientsVisible ] = useState( false )

    const nutritionListRef = useRef();
    const ingredientsRef = useRef();

    const showNutrition = ( e ) => {
        const button = e.target;

        button.classList.toggle( 'active' );

        const nutrition = nutritionListRef.current;

        const nutritionListStyle = getComputedStyle( nutrition );


        console.log( nutritionListStyle.display )

        if ( nutritionListStyle.display === "block" ) {
            nutrition.style.display = 'none';
            setIsNutritionVisible( false );
        }
        else {
            nutrition.style.display = 'block';
            setIsNutritionVisible( true );
        }


    }

    const showIngredients = ( e ) => {
        const button = e.target;

        button.classList.toggle( 'active' );

        const ingredients = ingredientsRef.current;

        const ingredientsStyle = getComputedStyle( ingredients );

        if ( ingredientsStyle.display === "block" ) {
            ingredients.style.display = 'none';
            setIsIngredientsVisible( false );
        }
        else {
            ingredients.style.display = 'block';
            setIsIngredientsVisible( true );
        }
    }


    return (

        <Container fluid="lg" className="mb-3">

            <Title headline={ `Detaljer - ${ state.cocktailDetails.recipe.label.includes( '{' ) ? ' ' + state.cocktailDetails.recipe.label.split( '{' ).pop().split( '}' )[ 1 ] : ' ' + state.cocktailDetails.recipe.label }` } />


            <Row>
                <Col xs={ 12 }>

                    <section className="card card--drinks fulldetails">

                        <figure className="fullDetailFigure">
                            <img src={ state.cocktailDetails.recipe.image } alt={ state.cocktailDetails.recipe.label } />
                        </figure>
                        <h3 className="cardText">
                            { state.cocktailDetails.recipe.label.includes( '{' ) ? ' ' + state.cocktailDetails.recipe.label.split( '{' ).pop().split( '}' )[ 1 ] : ' ' + state.cocktailDetails.recipe.label }
                        </h3>
                        <p
                            className="cardText"
                        >
                            <span>Kategori: </span>
                            { state.cocktailDetails.recipe.dishType[ 0 ].slice( 0, 1 ).toUpperCase() + state.cocktailDetails.recipe.dishType[ 0 ].slice( 1 ) }
                        </p>

                        {/* Ingredients */ }
                        <button className="accordion" onClick={ e => showIngredients( e ) }>{ !isIngredientsVisible ? 'Klik for at se ingredienser' : 'Klik for at skjule ingredienser' }</button>

                        <div className="cardText accordionList" ref={ ingredientsRef }><span>Ingredienser:</span>
                            <ul className="ingredientList">
                                {
                                    state.cocktailDetails.recipe.ingredientLines.map( ( ingr, index ) => (
                                        <li key={ "ingredient" + index }
                                        >
                                            { ingr.slice( 0, 1 ).toUpperCase() + ingr.slice( 1 ) }

                                        </li>
                                    ) )
                                }
                            </ul>
                        </div>

                        {/* Nutrition */ }
                        <button className="accordion" onClick={ e => showNutrition( e ) }>{ !isNutritionVisible ? 'Klik for at se næringsindhold' : 'Klik for at skjule næringsindhold' }</button>

                        <div className="cardText accordionList" ref={ nutritionListRef }><span>Næringsindhold:</span>
                            <ul className="nutritionList">

                                <li>Energi: { Math.ceil( state.cocktailDetails.recipe.totalNutrients.ENERC_KCAL.quantity ) + ' ' + state.cocktailDetails.recipe.totalNutrients.ENERC_KCAL.unit }</li>
                                <li>Fedt: { state.cocktailDetails.recipe.totalNutrients.FAT.quantity.toFixed( 2 ) + ' ' + state.cocktailDetails.recipe.totalNutrients.FAT.unit }</li>
                                <li>Mættet fedt: { state.cocktailDetails.recipe.totalNutrients.FASAT.quantity.toFixed( 2 ) + ' ' + state.cocktailDetails.recipe.totalNutrients.FASAT.unit }</li>
                                <li>Sukker: { state.cocktailDetails.recipe.totalNutrients.SUGAR.quantity.toFixed( 2 ) + ' ' + state.cocktailDetails.recipe.totalNutrients.SUGAR.unit }</li>
                                <li>Protein: { state.cocktailDetails.recipe.totalNutrients.PROCNT.quantity.toFixed( 2 ) + ' ' + state.cocktailDetails.recipe.totalNutrients.PROCNT.unit }</li>

                            </ul>
                        </div>

                        <p className="cardText"><span>Kilde: </span> <a className="cardText" target="_blank" href={ state.cocktailDetails.recipe.url }>{ state.cocktailDetails.recipe.source }</a> </p>



                    </section>
                </Col>
            </Row>

        </Container>

    )
}

export default CocktailDetails;