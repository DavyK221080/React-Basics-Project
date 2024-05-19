import { useState } from "react";
import {
  Center,
  Heading,
  Box,
  Image,
  Text,
  Badge,
  Stack,
  Input,
  Checkbox,
  CheckboxGroup,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { data } from "../utils/data";

export const RecipeListPage = ({ onSelectRecipe }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHealthLabels, setSelectedHealthLabels] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleHealthLabelChange = (labels) => {
    setSelectedHealthLabels(labels);
  };

  const filteredRecipes = data.hits.filter((hit) => {
    const recipe = hit.recipe;
    const nameMatch = recipe.label
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const healthLabelMatch =
      selectedHealthLabels.length === 0 ||
      selectedHealthLabels.every((label) =>
        recipe.healthLabels.includes(label)
      );

    return nameMatch && healthLabelMatch;
  });

  return (
    <Center flexDir="column" p={4} w="100%" bg="blue.100" minH="100vh">
      <Heading mb={4}>Your Recipe App</Heading>
      <Box w="100%" maxW="800px" mb={4}>
        <Input
          id="search-recipe"
          name="search-recipe"
          placeholder="Search by recipe name"
          value={searchTerm}
          onChange={handleSearchChange}
          mb={4}
          aria-label="Search recipes by name"
        />
        <CheckboxGroup colorScheme="green" onChange={handleHealthLabelChange}>
          <HStack align="start" spacing={4}>
            <Checkbox
              id="vegan"
              name="health-label"
              value="Vegan"
              aria-label="Vegan"
            >
              Vegan
            </Checkbox>
            <Checkbox
              id="vegetarian"
              name="health-label"
              value="Vegetarian"
              aria-label="Vegetarian"
            >
              Vegetarian
            </Checkbox>
            <Checkbox
              id="pescatarian"
              name="health-label"
              value="Pescatarian"
              aria-label="Pescatarian"
            >
              Pescatarian
            </Checkbox>
          </HStack>
        </CheckboxGroup>
      </Box>
      <Box
        w="100%"
        maxW="1200px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        bg="white"
      >
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {filteredRecipes.map((hit) => {
            const recipe = hit.recipe;
            return (
              <GridItem key={recipe.label} w="100%" h="350px">
                <Center
                  p={2}
                  borderWidth="1px"
                  borderRadius="lg"
                  cursor="pointer"
                  _hover={{ backgroundColor: "gray.100" }}
                  onClick={() => onSelectRecipe(recipe)}
                  bg="gray.50"
                  w="100%"
                  h="100%"
                >
                  <Stack direction="column" align="center" spacing={2} w="100%">
                    <Image
                      width="100%"
                      height="150px"
                      objectFit="cover"
                      src={recipe.image}
                      alt={recipe.label}
                      borderRadius="md"
                    />
                    <Box textAlign="center" w="100%">
                      <Text color="gray.500" fontSize="sm">
                        {recipe.mealType.join(", ")}
                      </Text>
                      <Text fontSize="lg" fontWeight="bold">
                        {recipe.label}
                      </Text>
                      <Stack
                        direction="row"
                        mt={2}
                        spacing={1}
                        justify="center"
                      >
                        {recipe.healthLabels.includes("Vegetarian") && (
                          <Badge colorScheme="purple" fontSize="xs">
                            Vegetarian
                          </Badge>
                        )}
                        {recipe.healthLabels.includes("Vegan") && (
                          <Badge colorScheme="green" fontSize="xs">
                            Vegan
                          </Badge>
                        )}
                        {recipe.dietLabels.length > 0 && (
                          <Badge colorScheme="green" fontSize="xs">
                            {recipe.dietLabels.join(", ")}
                          </Badge>
                        )}
                      </Stack>
                      <Text color="gray.500" mt={2} fontSize="sm">
                        <strong>Dish:</strong> {recipe.dishType.join(", ")}
                      </Text>
                      <Text color="gray.500" mt={2} fontSize="sm">
                        <strong>Cautions:</strong>
                      </Text>
                      <Stack
                        direction="row"
                        mt={1}
                        spacing={1}
                        justify="center"
                      >
                        {recipe.cautions.length > 0 ? (
                          recipe.cautions.map((caution) => (
                            <Badge
                              key={caution}
                              colorScheme="red"
                              fontSize="xs"
                            >
                              {caution}
                            </Badge>
                          ))
                        ) : (
                          <Badge colorScheme="red" fontSize="xs">
                            None
                          </Badge>
                        )}
                      </Stack>
                    </Box>
                  </Stack>
                </Center>
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </Center>
  );
};

export default RecipeListPage;
