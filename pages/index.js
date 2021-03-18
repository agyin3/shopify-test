import Head from "next/head";
import Link from "next/link";
import { client } from "../utils/shopify"; // import shopfy client
import Hero from "../components/Hero";
import Reviews from "../components/Reviews";
import BestSellers from "../components/BestSellers";

export default function Home({ products, reviews, hero }) {
  return (
    <div>
      <Head>
        <title>24Seven Coffee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Reviews reviews={reviews} />
      <BestSellers products={products} />
      {products.map((product) => (
        <Link href={`/product/${product.id}`}>
          <p>{product.title}</p>
        </Link>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  let products = await client.product.fetchAll();
  products = JSON.parse(JSON.stringify(products));

  const reviews = [
    {
      text:
        "Society has put up so many boundaries, so many limitations on what’s right and wrong that it’s almost impossible to get a pure thought out.",
      img: "./company-logos/designmilk_400x.jpg",
    },
    {
      text:
        "I always felt like I could do anything. That’s the main thing people are controlled by!",
      img: "./company-logos/gq_400x.jpg",
    },
    {
      text:
        "The time is now for it to be okay to be great. People in this world shun people for being great.",
      img: "./company-logos/wired_400x.jpg",
    },
  ];

  return {
    props: {
      products,
      reviews,
      navigation: {
        title: "24Seven Coffee",
        topMenuOne: [{ text: "Shop" }, { text: "Explore" }, { text: "About" }],
        topMenuTwo: [{ text: "Search" }, { text: "Log In" }, { text: "Cart" }],
        cartDirection: "right",
      },
      footerNavigation: {
        footerMenuOne: {
          title: "Shop",
          links: [
            { text: "Coffee", href: "#" },
            { text: "Merch", href: "#" },
            { text: "Subscriptions", href: "#" },
          ],
        },
        footerMenuTwo: {
          title: "About",
          links: [
            { text: "About Us", href: "#" },
            { text: "Recipes", href: "#" },
            { text: "Blogs", href: "#" },
          ],
        },
        footerMenuThree: {
          title: "Help",
          links: [
            { text: "Privacy Policy", href: "#" },
            { text: "Return Policy", href: "#" },
            { text: "Support & FAQ", href: "#" },
          ],
        },
      },
      hero: {
        src: "./24seven_homepage_hero.jpg",
        title: "ALL STYLE, ALL SUBSTANCE",
        subtitle: "ODE DOES THINGS DIFFERENTLY",
        buttonText: "Shop Now",
      },
    },
  };
}
