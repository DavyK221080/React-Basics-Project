import { useState } from "react";
import {
  Center,
  Heading,
  Box,
  List,
  ListItem,
  Image,
  Text,
  Badge,
  Stack,
  Input,
  Checkbox,
  CheckboxGroup,
  VStack,
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
    const healthLabelMatch = selectedHealthLabels.every((label) =>
      recipe.healthLabels.includes(label)
    );

    return nameMatch && healthLabelMatch;
  });

  return (
    <Center flexDir="column" p={4} w="100%">
      <Heading mb={4}>Your Recipe App</Heading>
      <Box w="100%" maxW="800px" mb={4}>
        <Input
          id="search-recipe"
          name="search-recipe"
          placeholder="Search by recipe name"
          value={searchTerm}
          onChange={handleSearchChange}
          mb={4}
        />
        <CheckboxGroup colorScheme="green" onChange={handleHealthLabelChange}>
          <VStack align="start">
            <Checkbox id="vegan" name="health-label" value="Vegan">
              Vegan
            </Checkbox>
            <Checkbox id="vegetarian" name="health-label" value="Vegetarian">
              Vegetarian
            </Checkbox>
            <Checkbox id="pescatarian" name="health-label" value="Pescatarian">
              Pescatarian
            </Checkbox>
          </VStack>
        </CheckboxGroup>
      </Box>
      <Box
        w="100%"
        maxW="800px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
      >
        <List spacing={3}>
          {filteredRecipes.map((hit) => {
            const recipe = hit.recipe;
            return (
              <ListItem
                key={recipe.label}
                p={4}
                borderBottomWidth="1px"
                cursor="pointer"
                _hover={{ backgroundColor: "gray.100" }}
                onClick={() => onSelectRecipe(recipe)}
              >
                <Stack direction={["column", "row"]} spacing={4}>
                  <Image
                    boxSize="100px"
                    src={recipe.image}
                    alt={recipe.label}
                    borderRadius="md"
                  />
                  <Box flex="1">
                    <Text fontSize="xl" fontWeight="bold">
                      {recipe.label}
                    </Text>
                    <Text mt={2}>
                      <strong>Diet Label:</strong>{" "}
                      {recipe.dietLabels.length > 0
                        ? recipe.dietLabels.join(", ")
                        : "None"}
                    </Text>
                    <Text>
                      <strong>Cautions:</strong>{" "}
                      {recipe.cautions.length > 0
                        ? recipe.cautions.join(", ")
                        : "None"}
                    </Text>
                    <Text>
                      <strong>Meal Type:</strong> {recipe.mealType.join(", ")}
                    </Text>
                    <Text>
                      <strong>Dish Type:</strong> {recipe.dishType.join(", ")}
                    </Text>
                    <Stack direction="row" mt={2} spacing={2}>
                      {recipe.healthLabels.includes("Vegan") && (
                        <Badge colorScheme="green">Vegan</Badge>
                      )}
                      {recipe.healthLabels.includes("Vegetarian") && (
                        <Badge colorScheme="purple">Vegetarian</Badge>
                      )}
                      {recipe.healthLabels.includes("Pescatarian") && (
                        <Badge colorScheme="blue">Pescatarian</Badge>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Center>
  );
};

export default RecipeListPage;
