export type TPortfolio = {
    items: {
        title: string;
        items: {
            description: string;
            videFileName: string;
            cards: {
                title: string;
                icon: string;
                items: string[];
            }[];
        }[];
    }
}