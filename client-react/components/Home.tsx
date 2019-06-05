import * as React from "react";
import { Link, Redirect, NavLink } from 'react-router-dom';
import * as $ from "jquery";
import { RoutePaths } from './Routes';
import { RouteComponentProps } from "react-router";

// import logoMain from "../assets/images/logo-main.png";
// import logoFooter from "../assets/images/logo-footer.svg";

// The Header creates links that can be used to navigate
// between routes.

export class Home extends React.Component<RouteComponentProps<any>, any> {

  state = {
      animateTime: 1000
  };

  render() {
      return (
        <main role="main" id="main">
          <div className="main__container">
            <div className="block-main skills-block">
              <div className="block-main__container">
                <h2 className="block-main__head">Front-end Developer</h2>
                <p>I pursue the goal of becoming successful graduate courses and becoming a qualified Frontend developer. I am hardworking, quickly assimilate the material, capable of self-learning. I will do everything to find out the material I need and master the technology and information I need.</p>
                <button className="block-main__url block-url__left">
                  <div className="circle">
                    <span className="icon arrow" />
                  </div>
                  <Link to="/aboutme" className="button-text">About me</Link>
                </button>
              </div>
              <div className="block-main__line" />
              <span className="block-main__arrow arrow-top" />
            </div>
            <div className="block-main dev-block">
              <div className="block-main__container">
                <h2 className="block-main__head">Professional skills</h2>
                <p>
                  React.js, Javascript, jQuery, HTML5, CSS3 (Sass, LESS), Webpack 4, Git, BEM, TypeScript (learning), Scrum methodology
                </p>
                <button className="block-main__url block-url__right">
                  <div className="circle">
                    <span className="icon arrow" />
                  </div>
                  <Link to={RoutePaths.Contacts} className="button-text">Recommendations</Link>
                </button>
              </div>
              <span className="block-main__arrow arrow-bottom" />
            </div>
            <div className="main__logo">
              <div className="author-name">Oleg Petrush</div>
            </div>
          </div>
        </main>
      )
  };
}
