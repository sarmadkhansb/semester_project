import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import About from "./AboutComponent";

//import { DISHES } from '../shared/dishes';
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import axios from "axios";
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
console.log(localStorage.getItem("token"));
class Main extends Component {
  state = {
    dishes: [],
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS,
    isReady: false,
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/dishes/")
      .then((response) => {
        this.setState({ dishes: response.data });
        this.setState({ isReady: true });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // constructor(props) {
  //   super(props);
  // }

  render() {
    if (this.state.isReady) {
      const HomePage = () => {
        return (
          <Home
            dish={this.state.dishes.filter((dish) => dish.featured)[0]}
            promotion={
              this.state.promotions.filter((promo) => promo.featured)[0]
            }
            leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
        );
      };

      const DishWithId = ({ match }) => {
        const [result, setResult] = React.useState({});
        return (
          <DishDetail
            dish={
              this.state.dishes.filter((dish) => {
                let value = false;
                axios
                  .get("http://localhost:4000/dishes/name/" + dish.name)
                  .then((response) => {
                    value = response.data === match.params.dishId;
                    if (value) setResult(response.data);
                  })
                  .catch((err) => console.log(err));
                return result;
              })[0]
            }
            comments={this.state.comments.filter(
              (comment) => comment.dishId === match.params.dishId
            )}
          />
        );
      };

      return (
        <div>
          <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route
              exact
              path="/menu"
              component={() => <Menu dishes={this.state.dishes} />}
            />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contactus" component={Contact} />
            <Route
              path="/aboutus"
              component={() => <About leaders={this.state.leaders} />}
            />
            <Redirect to="/home" />
          </Switch>
          <Footer />
        </div>
      );
    } else return <h1>Loading</h1>;
  }
}

export default Main;
