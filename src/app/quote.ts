export interface Quote {
    _id: number;
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
