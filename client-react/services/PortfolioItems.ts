import RestUtilities from './RestUtilities';

export interface IPortfolioItem {
    id?: number,
    description: string;
    image: File;
    developentTimeInHours: string;
    // dateAdded: Date;
}

export default class PortfolioItems {
    fetchAll() {
        return RestUtilities.get<Array<IPortfolioItem>>('/api/portfolios');
    }

    fetch(portfolioItemId: number) {
        return RestUtilities.get<IPortfolioItem>(`/api/portfolios/${portfolioItemId}`);
    }

    search(query: string) {
        return RestUtilities.get<Array<IPortfolioItem>>(`/api/portfolios/search/?q=${query}`);
    }

    update(portfolioItem: IPortfolioItem) {
        return RestUtilities.put<IPortfolioItem>(`/api/portfolios/${portfolioItem.id}`, portfolioItem);
    }

    create(portfolioItem: IPortfolioItem) {
        return RestUtilities.post<IPortfolioItem>('/api/portfolios', portfolioItem);
    }

    save(portfolioItem: IPortfolioItem) {
        if (portfolioItem.id) {
            return this.update(portfolioItem);
        } else {
            return this.create(portfolioItem);
        }
    }

    delete(portfolioItemId: number) {
        return RestUtilities.delete(`/api/portfolios/${portfolioItemId}`);
    }
}

