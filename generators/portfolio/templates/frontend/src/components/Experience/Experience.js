import React from "react";
import { Card } from "react-bootstrap";

const data=[
    {
        title:"hello",
        subtitle:"subtitle",
        text:"Lorem ip[sum lorem ipsum",
        link:"View more..",
    },
    {
        title:"hello",
        subtitle:"subtitle",
        text:"Lorem ip[sum lorem ipsum",
        link:"View more..",
    },
    {
        title:"hello",
        subtitle:"subtitle",
        text:"Lorem ip[sum lorem ipsum",
        link:"View more..",
    }
]

function Experience() {
  return (
      <>
      <h2 style={{textAlign:"center",marginTop:"50px",marginBottom:"20px"}}>Experience</h2>
    <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
      {data.map((item) => {
          return(
            <Card style={{ width: '18rem',margin:"20px 10px" }}  className="card_style">
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.subtitle}</Card.Subtitle>
              <Card.Text>
                {item.text}
              </Card.Text>
              <Card.Link className="card_link" href="#">
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

export default Experience;
