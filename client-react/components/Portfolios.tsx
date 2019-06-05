import * as React from "react";
import { Link, Redirect, NavLink, RouteComponentProps } from 'react-router-dom';
import * as $ from "jquery";
import { RoutePaths } from './Routes';
import PortfolioService, { IPortfolioItem } from '../services/PortfolioItems';


let portfolioService = new PortfolioService();

export class Portfolios extends React.Component<RouteComponentProps<any>, any> {
  refs: {
      query: HTMLInputElement;
  };

  state = {
      portfolioItems: [] as Array<IPortfolioItem>,
      editContact: null as Object,
      isAddMode: false as boolean,
      searchQuery: '' as string
  };

  componentWillMount() {
  }

  showAll() {
    portfolioService.fetchAll().then((response) => {
          this.setState({ searchQuery: '', portfolioItems: response.content });
      });
  }

  handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
      this.setState({ searchQuery: event.target.value });
  }

  handleSeachSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if(!this.state.searchQuery){
          this.showAll();
          return;
      }

      portfolioService.search(this.state.searchQuery).then((response) => {
          this.setState({ portfolioItems: response.content });
      });
  }

  delete(portfolioItem: IPortfolioItem) {
    portfolioService.delete(portfolioItem.id).then((response) => {
          let updatedPortfolioItems = this.state.portfolioItems;
          updatedPortfolioItems.splice(updatedPortfolioItems.indexOf(portfolioItem), 1);
          this.setState({ portfolioItems: updatedPortfolioItems });
      });
  }

  componentDidMount() {
    this.showAll();
  }

  render() {

    return (
      <div id="content">
        <div className="content__container">
            <h2>Portfolio</h2>
            <form className="form-inline my-2 my-lg-0" onSubmit={(e) => this.handleSeachSubmit(e)}>
                <input className="form-control form-control form-control-sm" type="text" value={this.state.searchQuery} onChange={(e) => this.handleSearchQueryChange(e)} placeholder="Search" />
                <button className="btn btn-outline-success btn-sm" type="submit">Search</button>&nbsp;
            </form>
            {this.state.searchQuery && this.state.portfolioItems && this.state.portfolioItems.length == 0 &&
                <p>No results!</p>
            }
            {this.state.portfolioItems && this.state.portfolioItems.length > 0 &&
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Development time</th>
                            <th>Date added</th>
                            <th>rip</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.portfolioItems.map((portfolioItem, index) =>
                            <tr key={portfolioItem.id}>
                                <td>{portfolioItem.description}</td>
                                <td>{portfolioItem.developentTimeInHours}</td>
                                {/* <td>{portfolioItem.dateAdded}</td> */}
                                <td><Link to={RoutePaths.ContactEdit.replace(":id", portfolioItem.id.toString())}>edit</Link>
                                    <button type="button" className="btn btn-link" onClick={(e) => this.delete(portfolioItem)}>delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
            {this.state.searchQuery &&
                <button type="button" className="btn btn-primary" onClick={(e) => this.showAll()}>clear search</button>
            }
            <Link className="btn btn-success" to={RoutePaths.PortfolioNew}>add</Link>
        </div>
      </div>
    );
  }
}
