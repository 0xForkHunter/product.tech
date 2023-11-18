const GRAPH_URL = "https://api.thegraph.com/subgraphs/name/rubensousadinis/product-tech";

const GetHolders = `
query GetHolders($slug: ID){
  product(id: $slug) {
    holders {
      keysAmount
      wallet
    }
  }
}
`;

const GetHoldings = `
query GetHoldings($address: ID){
  keyHolders(where: {wallet: $address}) {
    product {
      supply
      id
    }
  }
}
`;

export interface fetchHoldersResponse {
  product: {
    supply: string;
    id: string;
    holders: {
      wallet: string;
      keysAmount: string;
    }[];
  };
}

export const fetchHolders = async (slug: string) => {
  const res = await fetch(GRAPH_URL, {
    method: "POST",
    body: JSON.stringify({
      query: GetHolders,
      variables: {
        slug: slug.toLowerCase(),
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);

  return res as fetchHoldersResponse;
};

export interface fetchHoldingsResponse {
  keyHolders: {
    product: {
      supply: string;
      id: string;
    };
  }[];
}

export const fetchHoldings = async (address: string) => {
  const res = await fetch(GRAPH_URL, {
    method: "POST",
    body: JSON.stringify({
      query: GetHoldings,
      variables: {
        address: address.toLowerCase(),
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);

  return res as fetchHoldingsResponse;
};
