export interface Quote {
    _id: string;
    dialog: string;
    movie: string;
    character: string;
  }

export interface Quotes {
    docs: Quote[];
    total: number;
    limit: number;
    pages: number;
  }
export interface Movie {
    _id: string;
    academyAwardNominations: number;
    academyAwardWins: number;
    boxOfficeRevenueInMillions: number;
    budgetInMillions: number;
    name: string;
    rottenTomatesScore: number;
    runtimeInMinutes: number;
  }
