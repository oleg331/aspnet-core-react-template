import 'object-assign';
import * as React from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import PortfolioService, { IPortfolioItem } from '../services/PortfolioItems'
import { RoutePaths } from './Routes';

let portfolioService = new PortfolioService();

export class PortfolioForm extends React.Component<RouteComponentProps<any>, any> {
    state = {
        portfolio: null as IPortfolioItem,
        errors: {} as { [key: string]: string }
    }

    componentWillMount() {
        console.log("test")
    }

    componentDidMount() {
        if (this.props.match.path == RoutePaths.PortfolioEdit) {
            portfolioService.fetch(this.props.match.params.id).then((response) => {
                this.setState({ portfolio: response.content });
            });
        } else {
            let newPortfolio: IPortfolioItem = {
                description: '', developentTimeInHours: null, image: null
                // dateAdded: null
            };
            this.setState({ portfolio: newPortfolio });
        }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.savePortfolio(this.state.portfolio);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let portfolioUpdates = {
            [name]: value
        };

        this.setState({
            portfolio: Object.assign(this.state.portfolio, portfolioUpdates)
        });
    }

    savePortfolio(portfolio: IPortfolioItem) {
        this.setState({ errors: {} as { [key: string]: string } });
        portfolioService.save(portfolio).then((response) => {
            if (!response.is_error) {
                this.props.history.push(RoutePaths.Portfolios);
            } else {
                this.setState({ errors: response.error_content });
            }
        });
    }

    _formGroupClass(field: string) {
        var className = "form-group ";
        if (field) {
            className += " has-danger"
        }
        return className;
    }

    render() {
        if (!this.state.portfolio) {
            return <div>Loading...</div>;
        }
        else {
            return <fieldset className="form-group">
                <legend>{this.state.portfolio.id ? "Edit Portfolio" : "New Portfolio" }</legend>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div>
                        <label htmlFor="inputDescription" className="form-control-label">Description</label>
                        <input type="text" autoFocus name="description" id="inputDescription" value={this.state.portfolio.description} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" required />
                    </div>
                    {/* <div>
                        <label htmlFor="inputImage" className="form-control-label">Image</label>
                        <input type="file" name="image" id="inputImage" value={this.state.portfolio.image} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" required />
                    </div> */}
                    {/* <div>
                        <label htmlFor="inputDevelopmentTime" className="form-control-label">Development time</label>
                        <input type="number" name="developmentTime" id="inputDevelopmentTime" value={this.state.portfolio.developentTimeInHours} onChange={(e) => this.handleInputChange(e)} className="form-control form-control-danger" />
                    </div> */}
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                    <Link className="btn btn-lg btn-light btn-block" to="/portfolios">Cancel</Link>
                </form>
            </fieldset>
        }
    }
}
