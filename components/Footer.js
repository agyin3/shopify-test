import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import Link from "next/link";

export default function Footer({ navigation }) {
  return (
    <Box as="footer" w="full" bg="black" color="white" px={4} py={10}>
      <Flex justify="space-evenly">
        <FooterSubscribe />
        {navigation &&
          Object.values(navigation).map(({ title, links }) => (
            <FooterNav title={title} links={links} />
          ))}
      </Flex>
    </Box>
  );
}

function FooterSubscribe() {
  return (
    <Box>
      <Text fontSize="4xl" fontWeight="bold">
        24Seven Coffee
      </Text>
      <Box as="label" fontWeight="bold">
        Sign up FOR UPDATES + 10% OFF FIRST ORDER
        <InputGroup size="md">
          <Input
            type="text"
            placeholder="name@email.com"
            borderColor="yellow.400"
            focusBorderColor="yellow.400"
            py={0}
            _hover={{
              borderColor: "yellow.400",
            }}
          />
          <InputRightElement w="4rem" h="100%">
            <Button colorScheme="yellow" size="md">
              Submit
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
}

function FooterNav({ title, links }) {
  return (
    <Box as="nav" display="flex" flexDirection="column">
      <Heading as="h3" fontSize="2xl">
        {title}
      </Heading>
      {links.map((link) => (
        <Link href={link.href}>{link.text}</Link>
      ))}
    </Box>
  );
}
