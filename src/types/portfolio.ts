export type TPortfolioItemCard = {
    title: string;
    icon: string;
    items: string[];
}

export type TPortfolioItem = {
    title: string;
    description: string;
    videoFileName: string;
    cards: TPortfolioItemCard[];
};

export type TPortfolio = {
    items: {
        videoPathPrefix: string;
        title: string;
        items: TPortfolioItem[];
    }
}