import * as React from "react";
import { Link, NavLink, Route } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { RoutePaths } from './Routes'
import AuthService from '../services/Auth';
let authService = new AuthService();

import styles from '../styles/index.styl';

// import logo from "./assets/images/logo.svg";
// import logoMob from "src/assets/images/mobile/logo.svg";
// import logoMobMain from "src/assets/images/mobile/logo-main.svg";

// The Header creates links that can be used to navigate
// between routes.
export class Header extends React.Component<RouteComponentProps<any>, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      activeBurger: false,
      activeIndex: 0,
      activeFormElement: false,
      langText: 'РУС'
    }

    this.toggleBurger = this.toggleBurger.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.handleUnauthorized = this.handleUnauthorized.bind(this);
  }

  toggleBurger() {
    this.setState({
      activeBurger: !this.state.activeBurger
    });
  }

  toggleClass(index: any, e: any) {

    this.setState({ activeIndex: index });
    this.toggleBurger();
  }

  handleUnauthorized(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      authService.signOut()
      this.props.history.push(RoutePaths.Home);
  }

  componentDidMount() {
    
  }

  render() {
    // const typeBurger = this.props.typeBurger
    return (
      <header id="header">
        <Route path="/contacts" />
        <div className="wrapper__container">
          <Link to="/" className="logo">
            {/* <img className="logo-pc" src={logo} alt="kitchen" /> */}
            {/* <img className="logo-mob" src={logoMob} alt="kitchen" /> */}
          </Link>

          <div className="nav header__nav">
            <ul>
                <li>
                  <NavLink exact onClick={this.toggleBurger} activeClassName="active" to={RoutePaths.Home}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={this.toggleBurger} activeClassName="active" to={RoutePaths.Contacts}>
                    Recommendations
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={this.toggleBurger} activeClassName="active" to={RoutePaths.About}>
                    About me
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink onClick={this.toggleBurger} activeClassName="active" to={RoutePaths.Portfolios}>
                    Portfolio
                  </NavLink>
                </li> */}
            </ul>
          </div>
          <a className="header__number" href="tel:+375298808017">
            +375 (29) 880-80-17
          </a>
          <form className="header__number" onSubmit={this.handleUnauthorized}>
          {!AuthService.isSignedIn() && <Link to="/login">Авторизация</Link>}
          {AuthService.isSignedIn() && <button className="btn btn-success" type="submit">Выйти</button>}
          </form>
        </div>
      </header>
    );
  }
}
