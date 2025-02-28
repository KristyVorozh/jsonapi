export type TInfo = {
  success: boolean;
  data: {
    info: string;
  };
};

export type TAuthBody = {
  email: string;
  password: string;
};

export type TAuthorData = {
  success: boolean;
  data: {
    authorId: number;
    name: string;
  };
};

export type TQuoteData = {
  success: boolean;
  data: {
    quoteId: never;
    authorId: number;
    quote: string;
  };
};

export type TProfileData = {
  success: boolean;
  data: {
    fullName: string;
    email: string;
  };
};
