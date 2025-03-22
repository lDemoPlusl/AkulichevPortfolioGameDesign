export type TPortfolioItemCard = {
    title: string;
    icon: string;
    items: string[];
}

export type TPortfolioItem = {
    title: string;
    description: string;
    videFileName: string;
    cards: TPortfolioItemCard[];
};

export type TPortfolio = {
    items: {
        title: string;
        items: TPortfolioItem[];
    }
}