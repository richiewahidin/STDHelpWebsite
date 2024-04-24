import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import background from "../images/homeimage.png"; // Import your background image
import HomePageGallery from "../components/Gallery.js";
import countyLanding from "../images/coutnies.jpeg"
import prevLanding from "../images/Landing_P.png"
import treatment from "../images/treatment.webp"


const styles = {
 container: {
   position: "relative", // Needed for the positioning of the overlay
   flexDirection: "row",
   display: "flex",
   justifyContent: "center",
   //alignItems: "center",
   height: "100vh",
   overflow: "hidden", // Prevents any overflow from the container
   backgroundColor: "#A52A2A",
   zIndex: -3
 },
 headingStyle: {
   paddingLeft: "40px",
   fontSize: "4vw",
   fontWeight: "bold",
   //alignSelf: "flex-start", // Align heading to the start (left) of the container
   color: "white"
 },
 backgroundLayer: {
   alignSelf:"center",
   backgroundImage: `url(${background})`,
   backgroundSize: "cover",
   backgroundPosition: "center",
   position: "absolute", // Make the background fill the container
   width: "95%",
   height: "80%",
   zIndex: -2,
   // Ensures background is behind everything
   //margin: "10px 5px"
 },
 tintLayer: {
   alignSelf:"center",
   position: "absolute", // Overlay on top of the background
   width: "95%",
   height: "80%",
   backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent black tint
   zIndex: -1, // Above the background, below the content
 },
 content: {
   position: "relative", // Ensures content is on top
   textAlign: "center",
   color: "white",
   zIndex: 1, // Above the overlay
 },
 title: {
   fontSize: "3.6vw",
   color: "white",
 },
 contentContainer: {
   alignSelf:"flex-end",
   //border: "2px solid #000", // Adding a 2px solid black border
   alignItems: "end",
   position: "absolute",
   height: "30%",
 },
 bodyContainer: {
   display: "flex",
   flexDirection: "column",
 },
 bodyContentWhite: {
   display:"flex",
   flexDirection:"row",
   backgroundColor: "white",
   height:"50vh",
   justifyContent:"center"
   //border: "2px solid #000", // Adding a 2px solid black border
 },
 bodyContentRed: {
   //position: "absolute",
   display:"flex",
   flexDirection:"row",
   backgroundColor: "#A52A2A",
   height:"50vh",
   justifyContent:"center"
   //border: "2px solid #000", // Adding a 2px solid black border
 },
 bodyContentBlack: {
   //position: "absolute",
   display:"flex",
   flexDirection:"row",
   backgroundColor: "black",
   height:"50vh"
   //border: "2px solid #000", // Adding a 2px solid black border
 },
 bodyHeading:{
   alignSelf:"flex-start",
   //marginLeft:"3vw",
   color: "gray",
   fontWeight: "bold",
   fontSize:"70px"
 },
 bodyContentContainer:{
   display:"flex",
   flexDirection:"column",
   marginLeft:"3vw",
   justifyContent:"center"
 }
};

function Landing() {
 return (
   <div>
     <div style={styles.container}>
       <h1 style={styles.headingStyle}>STDHelp</h1>
       <div style={styles.backgroundLayer}></div> {/* Background image */}
       <div style={styles.tintLayer}></div> {/* Dark tint overlay */}
       <div style={styles.contentContainer}>
         <h1 style = {styles.title}>
           Help us combat STDs and raise awareness in the state of California.
         </h1>
       </div>
       <Container style={{ position: "relative" }}>
       </Container>
     </div>
     <div style = {styles.bodyContainer}>
         <div style = {styles.bodyContentWhite}>
           <div style = {styles.bodyContentContainer}>
             <h1 style = {styles.bodyHeading}>Counties</h1>
             <h3 style={{ color: "gray" }}>
               Learn about STDs in different counties in California.
             </h3>
             <a href="https://stdhelp.site/counties" style={{ color: "gray" }}>
               <h5>learn more</h5>
             </a>
           </div>
           <div style = {styles.bodyContentContainer}>
             <img style={{width:"100%", aspectRatio:"1/1"}} width="350px" height ="350px" src={countyLanding} alt="Image could not be loaded"></img>
           </div>
         </div>
         <div style = {styles.bodyContentRed}>
           <div style = {styles.bodyContentContainer}>
             <img style={{width:"100%", aspectRatio:"1/1"}} width="350px" height ="350px" src={prevLanding} alt="Image could not be loaded"></img>
           </div>
           <div style = {styles.bodyContentContainer}>
             <h1 style = {{color:"white", fontWeight:"bold",alignSelf:"flex-start", fontSize:"70px"}}>Statistics</h1>
             <h3 style={{ color: "white" }}>
               You are not alone. Learn about county-wide statistics for different kinds of STDs.
             </h3>
             <a href="https://stdhelp.site/prevalence" style={{ color: "white" }}>
               <h5>learn more</h5>
             </a>
           </div>
         </div>
         <div style = {styles.bodyContentWhite}>
           <div style = {styles.bodyContentContainer}>
             <h1 style = {styles.bodyHeading}>Treatment Centers</h1>
             <h3 style={{ color: "gray" }}>
               Locate treatment centers near you.
             </h3>
             <a href="https://stdhelp.site/locator" style={{ color: "gray" }}>
               <h5>learn more</h5>
             </a>
           </div>
           <div style = {styles.bodyContentContainer}>
             <img style={{width:"100%", aspectRatio:"1/1"}} width="300px" height ="300px" src={treatment} alt="Image could not be loaded"></img>
           </div>
         </div>
     </div>
     <Container fluid style={{ position: "relative", textAlign: "center" }}>
       <h1 style={{paddingBottom: "1rem", fontWeight: "bold", color:"gray", fontSize:"60px"}}>Testimonies</h1>
       {/* Replace the existing placeholder with the HomePageGallery component */}
       <HomePageGallery />
     </Container>
   </div>
 );
}


export default Landing;