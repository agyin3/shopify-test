import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { client } from "../../utils/shopify";

const Post = ({ product }) => {
  return (
    <Box as="section" w="full" display="flex" px={4} py={10}>
      <ProductImage product={product} />
      <ProductInfo product={product} />
    </Box>
  );
};

function ProductImage({ product }) {
  const [imgIdx, setImgIdx] = useState(0);
  console.log(product);

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
      <Box
        overflow="scroll"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        {product.images.map((img, idx) => (
          <Box
            flexShrink={0}
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
            ml={idx !== 0 ? 2 : 0}
            mr={idx !== product.images.length - 1 ? 2 : 0}
          ></Box>
        ))}
      </Box>
    </Box>
  );
}

function ProductInfo({ product }) {
  const { title, description, options } = product;
  const [active, setActive] = useState(() =>
    Object.keys(options).reduce((obj, val) => {
      obj[options[val].name] = options[val].values[0].value;
      return obj;
    }, {})
  );

  const setVariant = (name, val) => {
    setActive({ ...active, [name]: val });
  };

  const addToCart = async (e) => {
    const storage = window.localStorage;
    let checkoutId = storage.getItem("checkoutId"); // get checkoutId
    if (!checkoutId) {
      // if no checkoutId create one and save to localstorage
      try {
        checkoutId = await client.checkout.create();
        checkoutId = JSON.parse(JSON.stringify(checkoutId));
        storage.setItem("checkoutId", checkoutId.id);
      } catch (e) {
        console.log("fail", e);
      }
    }
    let variant = Object.values(active).join(" / ").trim(); // combine variant options to get variant title
    let variantId;
    product.variants.every((v) => {
      // search for matching variant title and set to variantId
      if (v.title.includes(variant)) {
        variantId = v.id;
        return false;
      }
      return true;
    });
    // Add item to cart
    let cart = await client.checkout.addLineItems(checkoutId, [
      {
        variantId: variantId ? variantId : product.variants[0].title, // if variantId is null that means there is only one variant which we is set here
        quantity: 1,
      },
    ]);
    cart = JSON.parse(JSON.stringify(cart));
    console.log(cart);
  };
  return (
    <Box w="50%">
      <Heading>{title}</Heading>
      <Text>{description}</Text>
      {options &&
        options[0].name.toLowerCase() !== "title" &&
        options.map((option) => (
          <ProductOptions option={option} setVariant={setVariant} />
        ))}
      <Button onClick={addToCart}>Add To Cart</Button>
    </Box>
  );
}

function ProductOptions({ option, setVariant }) {
  const { name, values } = option;
  const [active, setActive] = useState(0);

  const handleClick = (e, idx, value) => {
    e.preventDefault();
    setActive(idx);
    console.log(name);
    setVariant(name, value);
  };
  return (
    <Box>
      <Heading as="h3">{name}</Heading>
      {values.map((value, idx) => {
        return (
          <Button
            isActive={idx === active}
            variant="ghost"
            colorScheme="yellow"
            onClick={(e) => handleClick(e, idx, value.value)}
          >
            {value.value}
          </Button>
        );
      })}
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
