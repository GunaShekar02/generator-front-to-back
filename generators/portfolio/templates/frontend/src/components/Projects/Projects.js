import React from "react";
import { Card } from "react-bootstrap";
//import './Projects.css'
import FeatherIcon from "feather-icons-react";

const data=[
    {
        title:"Indie-Threads",
        subtitle:"Discussion forum for indie games",
        text:"Lorem ip[sum lorem ipsum Lorem ip[sum lorem ipsum Lorem ip[sum lorem ipsum",
        link:"View",
    },
    {
        title:"Attack on Web",
        subtitle:"Testing tool for API keys",
        text:"Lorem ip[sum lorem ipsum Lorem ip[sum lorem ipsum Lor",
        link:"View",
    },
    {
        title:"Deck",
        subtitle:"Access management tool",
        text:"Lorem ip[sum lorem Lorem ip[sum lorem  Lorem ip[sum lorem ipsum ipsum",
        link:"View",
    }
]

function Projects() {
  return (
      <>
      <h2 style={{textAlign:"center",marginTop:"50px",marginBottom:"20px"}}>Projects</h2>
    <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
      {data.map((item) => {
          return(
            <Card className="card_style" style={{ width: '18rem',margin:"20px 10px",minHeight:"250px" }}>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.subtitle}</Card.Subtitle>
              <Card.Text>
                {item.text}
              </Card.Text>
              <Card.Link className="card_link" href="#">
              <FeatherIcon className="user__icon p-1" icon="external-link"/>
                {item.link}
                </Card.Link>
            </Card.Body>
          </Card>
          ) 
      }
      )}
      
    </div>
    </>
  );
}

export default Projects;
