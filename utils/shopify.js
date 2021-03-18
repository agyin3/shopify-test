import Client from "shopify-buy";

// initialize shopify client
const client = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN, // shopify store domain 'your-shopify-store.myshopify.com'
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN, // shopify-access-token
});

export { client };
