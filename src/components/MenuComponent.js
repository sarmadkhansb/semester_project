import React from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  Label,
  FormGroup,
  Form,
  Input,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
//import { response } from "express";
Axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

function RenderMenuItem({ dish, onClick }) {
  const [id, setID] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editName, setEditName] = React.useState("");
  const [editCategory, setEditCategory] = React.useState("");
  const [editPrice, setEditPrice] = React.useState("");
  const [editFeatured, setEditFeatured] = React.useState(false);
  const [editDescription, setEditDescription] = React.useState("");

  Axios.get("http://localhost:4000/dishes/name/" + dish.name)
    .then((response) => {
      setID(response.data);
    })
    .catch((err) => {
      window.location = "/home";
    });

  return (
    <>
      <Button
        variant="contained"
        color="danger"
        onClick={() => {
          Axios.get("http://localhost:4000/dishes/delete/" + id)
            .then((response) => {
              window.location = "/menu";
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        Delete
      </Button>

      <Button
        variant="contained"
        color="dark"
        onClick={() => {
          setModalOpen(true);
          Axios.get("http://localhost:4000/dishes/" + id)
            .then((response) => {
              console.log(response.data);
              setEditName(response.data.name);
              setEditCategory(response.data.category);
              setEditPrice(response.data.price);
              setEditDescription(response.data.description);
              setEditFeatured(response.data.featured);
            })
            .catch((err) => {
              console.log("cannot get dish");
              window.location = "/menu";
            });
        }}
      >
        Edit
      </Button>

      <Card>
        <Link to={`/menu/${id}`}>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
          </CardImgOverlay>
        </Link>
      </Card>

      <Modal isOpen={modalOpen} style={{ padding: "20px" }}>
        <h1>Edit a dish</h1>
        <Form
          style={{ padding: "20px" }}
          method="post"
          action={"http://localhost:4000/dishes/edit/" + id}
        >
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name of the Dish"
              value={editName}
              onChange={(e) => {
                setEditName(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="category">Select Category</Label>
            <select
              name="category"
              id="category"
              value={editCategory}
              onChange={(e) => {
                setEditCategory(e.target.value);
              }}
            >
              <option>mains</option>
              <option>appetizer</option>
              <option>dessert</option>
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="text"
              name="price"
              id="price"
              placeholder="Price of the Dish"
              value={editPrice}
              onChange={(e) => {
                setEditPrice(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={editDescription}
              onChange={(e) => {
                setEditDescription(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Featured</legend>
            <FormGroup check>
              <Label check>
                <Input
                  id="editfeatured1"
                  type="radio"
                  name="featured"
                  value="true"
                  checked={editFeatured === true ? true : false}
                  onChange={() => {
                    if (document.getElementById("editfeatured1").checked)
                      setEditFeatured(true);
                    if (document.getElementById("editfeatured2").checked)
                      setEditFeatured(false);
                  }}
                />{" "}
                True
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  id="editfeatured2"
                  type="radio"
                  name="featured"
                  value="false"
                  checked={editFeatured === false ? true : false}
                  onChange={() => {
                    if (document.getElementById("editfeatured1").checked)
                      setEditFeatured(true);
                    if (document.getElementById("editfeatured2").checked)
                      setEditFeatured(false);
                  }}
                />{" "}
                False
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Label for="imageFile">Choose Picture</Label>
            <Input type="file" name="image" id="image" />
          </FormGroup>

          <Button
            style={{
              float: "right",
            }}
            onClick={() => setModalOpen(false)}
            variant="contained"
            color="danger"
          >
            Close
          </Button>

          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              setModalOpen(false);
              window.location = "/menu";
            }}
          >
            Save
          </Button>
        </Form>
      </Modal>
    </>
  );
}

const Menu = (props) => {
  const [modelIsOpen, setModelIsOpen] = React.useState(false);
  const menu = props.dishes.map((dish) => {
    return (
      <div className="col-12 col-md-5 m-1" key={dish._id}>
        <RenderMenuItem dish={dish} onClick={props.onClick} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <Button
            onClick={() => {
              setModelIsOpen(true);
            }}
            style={{ float: "right" }}
            variant="contained"
            color="success"
          >
            Add
          </Button>
          <Modal isOpen={modelIsOpen} style={{ padding: "20px" }}>
            <h1>Add a dish</h1>
            <Form
              style={{ padding: "20px" }}
              method="post"
              action="http://localhost:4000/dishes/add"
            >
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name of the Dish"
                />
              </FormGroup>
              <FormGroup>
                <Label for="category">Select Category</Label>
                <Input type="select" name="category" id="category">
                  <option>mains</option>
                  <option>appetizer</option>
                  <option>dessert</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Price of the Dish"
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description" />
              </FormGroup>
              <FormGroup tag="fieldset">
                <legend>Featured</legend>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="featured" value="true" /> True
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="featured" value="false" /> False
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup>
                <Label for="imageFile">Choose Picture</Label>
                <Input type="file" name="image" id="image" />
              </FormGroup>

              <Button
                style={{
                  float: "right",
                }}
                onClick={() => setModelIsOpen(false)}
                variant="contained"
                color="danger"
              >
                Close
              </Button>

              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                  setModelIsOpen(false);
                  return <Redirect to="/menu" />;
                }}
              >
                Save
              </Button>
            </Form>
          </Modal>
          <h3>Menu</h3>
          <hr />
        </div>
      </div>
      <div className="row">{menu}</div>
    </div>
  );
};

export default Menu;
