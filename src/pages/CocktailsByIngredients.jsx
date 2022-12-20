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

    const [query, setQuery] = useState('gin')

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
    <div>CocktailsByIngredients</div>
  )
}

export default CocktailsByIngredients;