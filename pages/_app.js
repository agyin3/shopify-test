import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

function MyApp({ Component, pageProps }) {
  const { navigation, footerNavigation, hero } = pageProps;
  return (
    <ChakraProvider>
      <Nav navigation={navigation} />
      <Hero hero={hero} />
      <Component {...pageProps} />
      <Footer navigation={footerNavigation} />
    </ChakraProvider>
  );
}

export default MyApp;
