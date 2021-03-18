import Link from "next/link";

export default function FourOhFour() {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
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
