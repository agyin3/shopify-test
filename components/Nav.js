import {
  Box,
  Flex,
  Heading,
  Slide,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav({ navigation }) {
  const {
    topMenuOne = [],
    topMenuTwo = [],
    title = "",
    cartDirection,
  } = navigation;
  const [scrollPos, setScrollPos] = useState(0);
  const { isOpen, onToggle } = useDisclosure();
  const getScrollPos = () => {
    setScrollPos(window.pageYOffset);
  };
  useEffect(() => {
    window.addEventListener("scroll", getScrollPos);
    return () => window.removeEventListener("scroll", getScrollPos);
  }, []);
  return (
    <>
      <Box
        as="header"
        bg={scrollPos > 0 ? "white" : "transparent"}
        p={6}
        boxShadow="md"
        position="fixed"
        w="100%"
        color={scrollPos > 0 ? "black" : "white"}
        borderBottom="1px solid white"
        zIndex={10}
        _hover={{
          bg: "white",
          color: "black",
        }}
      >
        <Flex as="nav" align="center" justify="space-between">
          <Flex>
            {topMenuOne &&
              topMenuOne.map((link) => (
                <Link href="#">
                  <Box
                    as="p"
                    marginX={5}
                    cursor="pointer"
                    onClick={
                      link.text.toLowerCase() === "cart" ? link.onClick : null
                    }
                  >
                    {link.text}
                  </Box>
                </Link>
              ))}
          </Flex>

          <Link href="/">
            <Heading cursor="pointer">{title}</Heading>
          </Link>

          <Flex>
            {topMenuTwo &&
              topMenuTwo?.map((link) =>
                link.text.toLowerCase() === "cart" ? (
                  <Box as="p" marginX={5} cursor="pointer" onClick={onToggle}>
                    {link.text}
                  </Box>
                ) : (
                  <Link href="#">
                    <Box as="p" marginX={5} cursor="pointer">
                      {link.text}
                    </Box>
                  </Link>
                )
              )}
          </Flex>
        </Flex>
      </Box>
      <CartMenu
        isOpen={isOpen}
        onToggle={onToggle}
        cartDirection={cartDirection}
      />
    </>
  );
}

function CartMenu({ isOpen, onToggle, cartDirection = "right" }) {
  return (
    <Slide direction={cartDirection} in={isOpen}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        pos="fixed"
        w="30vw"
        h="100vh"
        right="0"
        bg="white"
        zIndex={20}
        p={4}
      >
        <Box display="flex" alignItems="center" w="100%">
          <Text onClick={onToggle} fontSize="xl" cursor="pointer">
            X
          </Text>
          <Spacer />
          <Text>Your Cart</Text>
          <Spacer />
        </Box>
        <Box>Image Placeholder</Box>
      </Box>
    </Slide>
  );
}
