import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { useState } from "react";
import { client } from "../../utils/shopify";

const Post = ({ product }) => {
  console.log(product);
  return (
    <Box as="section" w="full" display="flex" px={4} py={10}>
      <ProductImage product={product} />
      <ProductInfo product={product} />
    </Box>
  );
};

function ProductImage({ product }) {
  const [imgIdx, setImgIdx] = useState(0);

  const handleClick = (e, idx) => {
    e.preventDefault();
    setImgIdx(idx);
  };
  return (
    <Box w="50%">
      <Box
        width="100%"
        py={200}
        bgImage={`url(${product.images[imgIdx].src})`}
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPos="center"
        borderRadius="lg"
        mx="auto"
        mb={10}
      ></Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {product.images.map((img, idx) => (
          <Box
            h={150}
            w={150}
            bgImage={`url(${img.src})`}
            bgSize="cover"
            bgRepeat="no-repeat"
            bgPos="center"
            borderRadius="lg"
            onClick={(e) => handleClick(e, idx)}
            cursor="pointer"
            border="1px solid black"
          ></Box>
        ))}
      </Box>
    </Box>
  );
}

function ProductInfo({ product }) {
  return (
    <Box w="50%">
      <Heading>{product.title}</Heading>
      <Text>{product.description}</Text>
      <Button>Add To Cart</Button>
    </Box>
  );
}

export async function getServerSideProps({ query }) {
  const productId = query.productId;
  let product = await client.product.fetch(productId);
  product = JSON.parse(JSON.stringify(product));

  return {
    props: {
      product,
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
        src: "../24seven_homepage_hero.jpg",
        title: product.title,
      },
    },
  };
}

export default Post;
