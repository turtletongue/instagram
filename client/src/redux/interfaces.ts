export interface RequestOptions {
  testData?: any;
  query?: GraphqlQuery;
  input?: any;
}

export interface GraphqlQuery {
  query: string;
  variables?: any;
}
