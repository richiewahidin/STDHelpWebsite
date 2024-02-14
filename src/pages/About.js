import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import k from '../images/k.png';
import b from '../images/b.png';
import r from '../images/r.png';
import m from '../images/m.png';
import t from '../images/t.png';
import axios from 'axios';

const styles = {
    container: {
        position: 'relative', // Needed for the positioning of the overlay
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '4.5rem',

    },
    subTextContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '1.2rem',
    },
    title: {
        fontSize: '3rem',
    },

    paragraphContainer: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '1rem',
    },
    paragraph: {
        fontSize: '1.05rem',
        textAlign: 'center',
    },
    cardImageStyle: {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
    }
}

function About() {

    // get gitlab api data
    const [totalCommits, setTotalCommits] = useState(0);
    const [individualCommits, setIndividualCommits] = useState([]);
    const [totalIssues, setTotalIssues] = useState(0);
    const [individualIssues, setIndividualIssues] = useState([]);


    useEffect(() => {
        axios.get("https://gitlab.com/api/v4/projects/54614721/repository/contributors/")
        .then((res) => {
            let indC = [0, 0, 0, 0, 0];
            let t = 0;
            res.data.forEach((contributor) => {
                switch(contributor.name) {
                    case "tommyh2o": indC[0] += contributor.commits; break;
                    case "Richie Wahidin": indC[1] += contributor.commits; break;
                    case "Kshitij Kapoor": indC[2] += contributor.commits; break;
                    case "KshitijKapoor8": indC[2] += contributor.commits; break;
                    case "Huang Max": indC[3] += contributor.commits; break;
                    case "Brendan": indC[4] += contributor.commits; break;
                    default: console.log("Default hit"); break;
                }
                t += contributor.commits;
            });
            setIndividualCommits(indC);
            setTotalCommits(t);
        })
        .catch((error) => {
            console.error("Error fetching contributors: ", error);
        });

        let names = ["tommyhuynh02n", "richiewahidin", "kshitij9250504", "maxyuzehuang", "bmalonepub"];
        let issues = [0, 0, 0, 0, 0];
        var count = 0;
        for (let i = 0; i < names.length; i++) {
            axios.get(`https://gitlab.com/api/v4/projects/54614721/issues_statistics?author_username=${names[i]}`)
            .then((res) => {
                issues[i] = res.data.statistics.counts.all;
                count += res.data.statistics.counts.all;
                setTotalIssues(count);
                i++;
            })
            .catch((error) => {
                console.error("Error fetching issues: ", error);
            });
        }

        setIndividualIssues(issues);


}, []);


    return (
    <div>
        <div style={styles.container}>
            <div style={styles.titleContainer}>
                <h1 style={styles.title}>About STDHelp</h1>
            </div>
            <div style={styles.subTextContainer}>
                <h4>The state of California has an STD problem. We are here to help.</h4>
            </div>

            <div style={styles.paragraphContainer}>
                <h6 style={styles.paragraph}>STDs, or sexually transmitted diseases, are infections that are transmitted through sexual contact, caused by bacteria, viruses, or parasites. Symptoms of STDs can occur in many different ways. Common symptoms include unusual pain in your genital areas, lumps, rashes, and more. If you see any of these symptoms, please visit a treatment center which you can find on our website. We care about fighting against STDs. We really hope that we can help you.</h6>
            </div>
            <div style={styles.titleContainer}>
                <h1 style={styles.title}>Meet the Team</h1>
            </div>
            <Row style={{paddingTop: '1rem'}}>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={t} style={styles.cardImageStyle}/>
                        <Card.Body>
                            <Card.Title>Tommy Huynh</Card.Title>
                            <Card.Text>
                                I am a senior studying Computer Science at UT Austin. I am interested in soccer and fashion.
                            </Card.Text>
                            <Card.Text>
                                Commits: {individualCommits[0]}
                            </Card.Text>
                            <Card.Text>
                                Issues : {individualIssues[0]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={r} style={styles.cardImageStyle}/>
                        <Card.Body>
                            <Card.Title>Richie Wahidin</Card.Title>
                            <Card.Text>
                                I am a senior studying Computer Science from Indonesia. I like to play soccer and pingpong.
                            </Card.Text>
                            <Card.Text>
                                Commits: {individualCommits[1]}
                            </Card.Text>
                            <Card.Text>
                                Issues : {individualIssues[1]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={k} style={styles.cardImageStyle}/>
                        <Card.Body>
                            <Card.Title>Kshitij Kapoor</Card.Title>
                            <Card.Text>
                                I am a sophomore studying Computer Science. I like to draw and watch American Football.
                            </Card.Text>
                            <Card.Text>
                                Commits: {individualCommits[2]}
                            </Card.Text>
                            <Card.Text>
                                Issues : {individualIssues[2]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row style = {{paddingTop: '1.2rem'}}>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={m} style={styles.cardImageStyle}/>
                        <Card.Body>
                            <Card.Title>Max Huang</Card.Title>
                            <Card.Text>
                                I am a junior studying Computer Science. I like to play chess and practice wushu.
                            </Card.Text>
                            <Card.Text>
                                Commits: {individualCommits[3]}
                            </Card.Text>
                            <Card.Text>
                                Issues : {individualIssues[3]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={b} style={styles.cardImageStyle}/>
                        <Card.Body>
                            <Card.Title>Brendan Malone</Card.Title>
                            <Card.Text>
                                I am a junior studying Computer Science. I like bouldering and playing video games.
                            </Card.Text>
                            <Card.Text>
                                Commits: {individualCommits[4]}
                            </Card.Text>
                            <Card.Text>
                                Issues : {individualIssues[4]}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row style = {{paddingTop: '1.2rem'}}>
                <Col>
                    <h2>Total Commits: {totalCommits}</h2>
                    <h2>Total Issues: {totalIssues}</h2>
                </Col>
            </Row>
            <h5>Link to API: https://www.postman.com/bmaloneut/workspace/stdhelp/api/c441db53-30a6-4e53-91ac-4842697ffc21"</h5>
        </div>
    </div>
  );

}
export default About;
