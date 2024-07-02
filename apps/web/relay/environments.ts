import {
  Environment,
  Network,
  RecordSource,
  Store,
  RequestParameters,
  Variables,
} from "relay-runtime";

interface FetchQueryResponse {
  data: any;
  errors?: any[];
}

async function fetchQuery(
  operation: RequestParameters,
  variables: Variables
): Promise<FetchQueryResponse> {
  const token = localStorage.getItem("tabnews.auth.token");

  const response = await fetch(
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }
  );

  return response.json();
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export { environment, fetchQuery };
