import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from "@apollo/client";
import { DisplayData } from "./DisplayData";

export const App = () => {

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });

  return (
    <>
      <ApolloProvider client={client}>
          <DisplayData/>
      </ApolloProvider>
    </>
  );
};
