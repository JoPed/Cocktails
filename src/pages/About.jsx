import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Title from '../components/Title';

const About = () => {
    return (
        <Container fluid="lg">

            <Title headline="Om projektet" />

            <Row>
                <Col xs={ 12 } md={ { span: 8, offset: 2 } }>
                    <article className="about">
                        <p>Jeg har lavet dette som et fritidsprojekt til mig selv, for at finde inspiration til nye drinks og for at kunne finde det vigtigste næringsindhold (i forhold til at det er drinks :-) ). Det betyder bl.a. at det ikke er fyldt op med features, men kun det jeg selv synes er mest nødvendigt for at kunne få et hurtigt overblik. Dataen hentes fra <a href="https://www.edamam.com" title="Powered by Edamam" target="_blank">EDAMAM</a> og det er derfor dem der styrer hvilke data der er adgang til. <br /> <br />

                            Det er en fritidsprojekt, som I har gratis adgang til, derfor skal I ikke forvente at jeg hele tiden udvikler videre på det - hverken vedligehold eller nye funktioner. I er dog altid velkomne til at <a href="mailto:jona09h3@videndjurs.net" className="mail">sende en mail</a> for at rappotere fejl, så vil jeg prøve at finde tid at rette dem.

                            <br /> <br />
                            <b>Mulige nye funktioner</b><br />
                            Jeg vil ikke love noget, men jeg har nogle idé til mulige udvidelser hvis jeg kan finde tiden til det. F.eks. at åbne for, at det ikke kun er cocktail opskrifter man kan søge efter, men at I kan vælge hvilke kategorier I vil bruge andre muligheder inkludere f.eks. kager, brød, desserter og hovedretter.<br /><br />

                        </p>
                    </article>
                </Col>
            </Row>

        </Container>
    )
}

export default About;