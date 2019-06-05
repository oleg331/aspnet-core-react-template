import * as React from "react";
import { Link, NavLink, Route } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { RoutePaths } from './Routes'

import styles from '../styles/index.styl';

// import logo from "src/assets/images/logo.svg";
// import logoMob from "src/assets/images/mobile/logo.svg";
// import logoMobMain from "src/assets/images/mobile/logo-main.svg";

// The Header creates links that can be used to navigate
// between routes.
export class Footer extends React.Component<RouteComponentProps<any>, any> {
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

  componentDidMount() {
    
  }

  render() {
    // const typeBurger = this.props.typeBurger
    return (
    <footer id="footer">
        <div className="wrapper__container">
          <div className="nav footer__nav">
            <ul>
              <li>
                <NavLink exact activeClassName="active" to={RoutePaths.Home}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to={RoutePaths.Contacts}>
                  Recommendations
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to={RoutePaths.About}>
                  About me
                </NavLink>
              </li>
              {/* <li>
                <NavLink activeClassName="active" to={RoutePaths.Portfolios}>
                  Portfolio
                </NavLink>
              </li> */}
            </ul>
          </div>
          {/* <ul className="socials">
            <li>
              <a target="_blank" href="">
                <span className="icon-socials icon-twitter" />
              </a>
            </li>
            <li>
              <a target="_blank" href="">
                <span className="icon-socials icon-vk" />
              </a>
            </li>
            <li>
              <a target="_blank" href="">
                <span className="icon-socials icon-facebook" />
              </a>
            </li>
            <li>
              <a target="_blank" href="">
                <span className="icon-socials icon-instagram" />
              </a>
            </li>
          </ul> */}
        </div>
      </footer>
    );
  }
}
