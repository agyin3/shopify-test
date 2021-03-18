import { Image } from "@chakra-ui/image";
import { Box, Flex, LinkBox, Spacer, Text } from "@chakra-ui/layout";
import Link from "next/link";

export default function BestSellers({ products }) {
  return (
    <Box as="section" p={4}>
      <Flex justify="space-between">
        <Flex
          direction="column"
          p={4}
          bg="#5F370E"
          borderRadius="lg"
          flexBasis="23%"
          color="white"
          justify="center"
        >
          <Text fontSize="3xl" fontWeight="bold">
            Best Sellers
          </Text>
          <Text>
            The pour-over people have spoken. This was our top gear of the last
            year!
          </Text>
        </Flex>
        {products.map((product) => (
          <BestSellersCard product={product} />
        ))}
      </Flex>
    </Box>
  );
}

function BestSellersCard({ product }) {
  console.log(product);
  return (
    <Flex
      direction="column"
      p={4}
      bg="#5F370E"
      borderRadius="lg"
      flexBasis="23%"
      color="white"
    >
      <Box
        boxSize="xs"
        bgImage={`url(${product.images[0].src})`}
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPos="center"
        mb="1rem"
        borderRadius="lg"
      ></Box>
      <Flex fontWeight="bold" align="center">
        <Link href={`/product/${product.id}`}>
          <Text
            fontSize="xl"
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
          >
            {product.title}
          </Text>
        </Link>
        <Spacer />
        <Text>${product.variants[0].price}</Text>
      </Flex>
    </Flex>
  );
}
