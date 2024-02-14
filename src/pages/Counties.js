import React from 'react';
import { Button, Card, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Counties() {
    return (
        <div>
            <div style={{ padding: '20px' }}>
            <h1>Counties</h1>
            </div>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Card style={{ width: '20rem' }}>
                        <Card.Img src="https://static01.nyt.com/images/2020/03/10/realestate/10LIVING-CA-ALAMEDA-slide-3AIH/10LIVING-CA-ALAMEDA-slide-3AIH-articleLarge.jpg?quality=75&auto=webp&disable=upscale" width = "200" height = "200"/>
                        <Card.Body>
                            <Card.Title>Alameda</Card.Title>
                            <Card.Text>
                                <ListGroup className='list-group-flush'>
                                    <ListGroupItem>
                                        County Seat: Oakland<br></br>
                                        Population: 1,682,353<br></br>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        2021 cases:<br></br>
                                        &emsp; Chlamydia: 7,455<br></br>
                                        &emsp; Gonnorhea: 3,810<br></br>
                                        &emsp; Syphilis: 197<br></br>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card.Text>
                            <Link to="/home" className="btn btn-primary">Learn more</Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Card style={{ width: '20rem' }}>
                        <Card.Img src="https://www.visittheusa.com/sites/default/files/styles/hero_l/public/images/hero_media_image/2017-01/Getty_515070156_EDITORIALONLY_LosAngeles_HollywoodBlvd_Web72DPI_0.jpg?h=0a8b6f8b&itok=lst_2_5d"width = "200" height = "200"/>
                        <Card.Body>
                            <Card.Title>Los Angeles</Card.Title>
                            <Card.Text>
                                <ListGroup className='list-group-flush'>
                                    <ListGroupItem>
                                        County Seat: Los Angeles<br></br>
                                        Population: 9,861,224<br></br>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        2021 cases:<br></br>
                                        &emsp; Chlamydia: 56,690<br></br>
                                        &emsp; Gonnorhea: 30,840<br></br>
                                        &emsp; Syphilis: 2,693<br></br>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card.Text>
                            <Button variant="primary">Learn more</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="d-flex justify-content-center">
                    <Card style={{ width: '20rem' }}>
                        <Card.Img src="https://assets3.thrillist.com/v1/image/3083374/1200x630/flatten;crop_down;webp=auto;jpeg_quality=70" width = "200" height = "200"/>
                        <Card.Body>
                            <Card.Title>Merced</Card.Title>
                            <Card.Text>
                                <ListGroup className='list-group-flush'>
                                    <ListGroupItem>
                                        County Seat: Merced<br></br>
                                        Population: 281,202<br></br>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        2021 cases:<br></br>
                                        &emsp; Chlamydia: 1,101<br></br>
                                        &emsp; Gonnorhea: 490<br></br>
                                        &emsp; Syphilis: 75<br></br>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card.Text>
                            <Button variant="primary">Learn more</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Counties;
