import Client from "shopify-buy";

// initialize shopify client
const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN, // shopify store domain 'your-shopify-store.myshopify.com'
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN, // shopify-access-token
});

export { client };
