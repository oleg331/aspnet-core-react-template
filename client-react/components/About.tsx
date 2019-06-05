import * as React from "react";
import { Link, Redirect, NavLink } from 'react-router-dom';
import * as $ from "jquery";
import { RoutePaths } from './Routes';
import { RouteComponentProps } from "react-router";

interface Iresolution {
  url: string
}

interface Iimage {
  standard_resolution: Iresolution
}

interface Iphoto {
  id: string
  images: Iimage
  caption: string
  link: string
}

export class About extends React.Component<RouteComponentProps<any>, any> {

  state = {
    photos: null as Array<Iphoto>,
    usernameApi: null as Object,
    access_token: "1237258608.1677ed0.7608c3f0e1934eea91e4e390d3d591f5"
  };

  componentWillMount() {

    this.api('https://api.instagram.com/v1/users/self/media/recent/?access_token='+this.state.access_token)
    .then(({ response }) => {
      console.log(this.state.photos)
    })
  }

  api<T>(url: string): Promise<T> {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json() as Promise<{ data: T }>
      })
      .then(data => {
          this.setState({
            photos: data.data
          })
          return data.data
      })
  }

  componentDidMount() {
  }

  render() {

    const photos = this.state.photos
    return (
      <div id="content">
        <section className="section-general section__instagram">
          <div className="content__container">
            <h2>About me</h2>
              <ul>
                <li>I pursue the goal of becoming successful graduate courses and becoming a qualified Frontend developer. I am hardworking, quickly assimilate the material, capable of self-learning. I will do everything to find out the material I need and master the technology and information I need.</li>
                <li>Second year student of Mechanics and Mathematics faculty of Belarusian State University Passed online courses on the site hexlet.io by profession Frontend JS-programmer Passed courses of company RetaCorp.by by profession Frontend-developer</li>
              </ul>
          </div>
        </section>
        <section className="section-general section__instagram active">
          <div className="content__container">
            <h2>Instagram</h2>
            <div className="instagram">
              {!photos && <svg width="100" height="100" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#000"> <g fill="none" fill-rule="evenodd"> <g transform="translate(1 1)" stroke-width="2"> <circle stroke-opacity=".5" cx="18" cy="18" r="18"/> <path d="M36 18c0-9.94-8.06-18-18-18"> <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/> </path> </g> </g></svg>}
              {
                photos && photos
                  .filter((photo: any, key) => key < 10)
                  .map((photo, key) => {
                    return (
                      <a
                        href={photo.link}
                        target="_blank"
                        className="instagram__block"
                        key={photo.id}
                      >
                        <img
                          key={photo.images.standard_resolution.url}
                          src={photo.images.standard_resolution.url}
                          alt={photo.caption}
                        />
                      </a>
                    );
                  })
              }
            </div>
          </div>
        </section>
      </div>
    );
  }
}
