import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, Redirect, Switch } from 'react-router-dom';
import { SignIn, Register } from './Auth';
import AuthService from '../services/Auth';
import { ErrorPage } from './Error';
import { Contacts } from './Contacts';
import { ContactForm } from './ContactForm';
import { Home } from './Home';
import { Portfolios } from './Portfolios';
import { PortfolioForm } from './PortfolioForm';
import { About } from './About';
import { Header } from './Header';
import { Footer } from './Footer';

export class RoutePaths {
    public static Contacts: string = "/recommendations";
    public static ContactEdit: string = "/recommendationsEdit/:id";
    public static ContactNew: string = "/recommendationsNew";
    public static Portfolios: string = "/portfolios";
    public static PortfolioEdit: string = "/portfolioEdit/:id";
    public static PortfolioNew: string = "/portfolioNew";
    public static SignIn: string = "/login";
    public static Register: string = "/register/";
    public static Portfolio: string = "/portfolio";
    public static About: string = "/aboutme";
    public static Home: string = "/";
}

export default class Routes extends React.Component<any, any> {
    render() {
        return <Switch>
            <Route exact path={RoutePaths.SignIn} component={SignIn} />
            <Route path={RoutePaths.Register} component={Register} />
            <StaticLayout path={RoutePaths.Contacts} component={Contacts} />
            <DefaultLayout path={RoutePaths.ContactNew} component={ContactForm} />
            <DefaultLayout path={RoutePaths.ContactEdit} component={ContactForm} />
            <DefaultLayout path={RoutePaths.Portfolios} component={Portfolios} />
            <DefaultLayout path={RoutePaths.PortfolioNew} component={PortfolioForm} />
            <DefaultLayout path={RoutePaths.PortfolioEdit} component={PortfolioForm} />
            <StaticLayout exact path={RoutePaths.Home} component={Home} />
            <StaticLayout path={RoutePaths.About} component={About} />
            <Route path='/error/:code?' component={ErrorPage} />
        </Switch>
    }
}

const StaticLayout = ({ component: Component, ...rest }: { component: any, path: string, exact?: boolean }) => (
    <Route {...rest} render={props => (
        <div>
            <Header  {...props} />
            <div className="">
                <Component {...props} />
            </div>
            <Footer {...props} />
        </div>
    )} />
);

const DefaultLayout = ({ component: Component, ...rest }: { component: any, path: string, exact?: boolean }) => (
    <Route {...rest} render={props => (
        AuthService.isSignedIn() ? (
            <div>
                <Header  {...props} />
                <div className="">
                    <Component {...props} />
                </div>
                <Footer {...props} />
            </div>
        ) : (
                <Redirect to={{
                    pathname: RoutePaths.SignIn,
                    state: { from: props.location }
                }} />
            )
    )} />
);
