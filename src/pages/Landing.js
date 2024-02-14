import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import background from '../images/homeimage.png'; // Import your background image

const styles = {
    container: {
        position: 'relative', // Needed for the positioning of the overlay
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        overflow: 'hidden', // Prevents any overflow from the container
    },
    backgroundLayer: {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'absolute', // Make the background fill the container
        width: '100%',
        height: '100%',
        zIndex: -2, // Ensures background is behind everything
    },
    tintLayer: {
        position: 'absolute', // Overlay on top of the background
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black tint
        zIndex: -1, // Above the background, below the content
    },
    content: {
        position: 'relative', // Ensures content is on top
        textAlign: 'center',
        color: 'white',
        zIndex: 1, // Above the overlay
    },
    title: {
        fontSize: '5em',
    },
    contentContainer: {
        position: 'relative', // Needed for the positioning of the overlay
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        overflow: 'hidden', // Prevents any overflow from the container
        flexDirection: 'column',
    },
};

function Landing() {
  return (
    <div>
    <div style={styles.container}>
        <div style={styles.backgroundLayer}></div> {/* Background image */}
        <div style={styles.tintLayer}></div> {/* Dark tint overlay */}
        <Container style={{ position: 'relative' }}> {/* Content */}
            <Row className="justify-content-md-center">
                <Col md="auto" style={styles.content}>
                    <h1 style={styles.title}>STDHelp</h1>
                    <h3>Here for you</h3>
                </Col>
            </Row>
        </Container>
        </div>
        <div style={styles.contentContainer}>
            <div style = {{paddingTop: '3rem'}}>
                <h1>Help us combat STDs in the state of California.</h1>
            </div>

            <h4 style={{paddingTop: '1rem'}}>We provide you valuable information the spread and treatment of Sexually Transmitted Diseses.</h4>
            <h5 style={{width: '70%', paddingTop: '1rem'}}>STDs can drastically impact the quality of life for those affected. Please seek help if you think that you are risk, as treatment is effective. If you think you are at risk, you can find a clinic near you on this website.</h5>
            <h4 style={{paddingTop: '1rem'}}>Testimonies</h4>
            <h5 style={{width: '70%', paddingTop: '1rem', marginBottom: '1rem'}}>"The stigma associated with STDs can be more damaging and hurtful than the infection itself.” – Lelah Foster</h5>
            <h5 style={{width: '70%', paddingTop: '1rem', marginBottom: '1rem'}}>"The stigma associated with STDs can be more damaging and hurtful than the infection itself.” – Lelah Foster</h5>
        </div>
    </div>
  );
}

export default Landing;
