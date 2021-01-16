import React from "react";
// import {
//   Card,
//   CardImg,
//   CardText,
//   CardBody,
//   CardTitle,
//   CardSubtitle,
// } from "reactstrap";


// New Cards
function RenderCard({ item }) {
  return (
    <div className="card text-center shadow">
      <div className="overflow">
        <img src={item.image} alt={item.name} className="card-img-top"></img>
      </div>
      <div className="card-body text-dark">
        <h4 className="card-title card-text"> {item.name} </h4>
        <h5 className="card-subtitle text-muted card-text"> {item.designation} </h5>
        <p className="card-text text-secondary">
        {item.description}
        </p>

      </div>
    </div> 
  );
}



// function RenderCard({ item }) {
//   return (
//     <Card>
//       <CardImg top width="100%" src={item.image} alt={item.name} />
//       <CardBody>
//         <CardTitle tag="h5">{item.name}</CardTitle>
//         {item.designation ? (
//           <CardSubtitle >{item.designation}</CardSubtitle>
//         ) : null}
//         <CardText>{item.description}</CardText>
//       </CardBody>
//     </Card>
//   );
// }

function Home(props) {
  return (
    <div className="container-fluid flex justify-content-center">
      <div className="row">
      <div className="col-md-4">
          <RenderCard item={props.dish} />
        </div>
        <div className="col-md-4">
          <RenderCard item={props.leader} />
        </div>
        <div className="col-md-4">
          <RenderCard item={props.promotion} />
        </div>
        
      </div>
    </div>
  );
}

export default Home;