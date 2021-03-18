import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import Link from "next/link";

export default function Hero({ hero }) {
  const { src, title, subtitle, buttonText, align } = hero;

  return (
    <Flex
      h="75vh"
      m={0}
      w="100%"
      bg="tomato"
      bgImage={`url(${src})`}
      bgPosition="center"
      bgSize="cover"
      direction="column"
      justify="center"
      align={!align ? "center" : align}
      padding={4}
      color="white"
    >
      <Text my={2}>{title}</Text>
      <Text my={2}>{subtitle || ""}</Text>
      <Link style={{ display: !buttonText ? "none" : "" }} href="#">
        <Button
          display={!buttonText ? "none" : ""}
          colorScheme="yellow"
          my={2}
          size="md"
          w="10%"
        >
          {buttonText}
        </Button>
      </Link>
    </Flex>
  );
}
