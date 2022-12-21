import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Title from '../components/Title';

const Guide = () => {
    return (
        <Container fluid="lg">

            <Title headline="Guide" />

            <Row>
                <Col xs={ 12 } md={ { span: 6, offset: 3 } }>
                    <ol className="guideList">
                        <li>Søg efter en ingrediens/drink (på engelsk)
                            <ul>
                                <li>F.eks. gin, vodka, rom eller tranebærjuice</li>
                                <li>F.eks. gin & tonic eller vodka marti</li>
                            </ul>
                        </li>
                        <li>Tryk på 'Søg'</li>
                        <li>Bladre mellem forskellige sider ved at trykke på &#60; eller &#62; knapperne</li>
                        <li>Find en spændende drink og tryk 'Detaljer' for f.eks. at se næringsindhold eller instruktioner</li>
                    </ol>
                </Col>
            </Row>

        </Container>
    )
}

export default Guide