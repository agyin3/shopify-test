import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";

export default function Reviews(props) {
  return (
    <Flex justify="space-between" align="stretch" p={4}>
      {props.reviews.map((review) => (
        <Flex flexBasis="30%" height="100%" direction="column" align="center">
          <Box
            width="30%"
            p="3rem"
            flex="1 1 auto"
            bgImage={`url(${review.img})`}
            bgSize="contain"
            bgRepeat="no-repeat"
            bgPos="center"
            mb="1rem"
          ></Box>
          <Text flex="1 1 auto" fontSize="xl" fontWeight="bold">
            {review.text}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}
