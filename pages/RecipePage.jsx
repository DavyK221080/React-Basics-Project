import React from "react";
import {
  Center,
  Heading,
  Box,
  Image,
  Text,
  Stack,
  Badge,
  Button,
  List,
  ListItem,
} from "@chakra-ui/react";

export const RecipePage = ({ recipe, onBack }) => {
  return (
    <Center flexDir="column" overflow="auto" p={4} w="100%">
      <Box
        w="100%"
        maxW="800px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
      >
        <Button onClick={onBack} mb={4}>
          Back to Recipes
        </Button>
        <Image src={recipe.image} alt={recipe.label} borderRadius="md" mb={4} />
        <Heading mb={4}>{recipe.label}</Heading>
        <Stack spacing={3}>
          <Text>
            <strong>Meal Type:</strong> {recipe.mealType.join(", ")}
          </Text>
          <Text>
            <strong>Dish Type:</strong> {recipe.dishType.join(", ")}
          </Text>
          <Text>
            <strong>Total Cooking Time:</strong> {recipe.totalTime} minutes
          </Text>
          <Text>
            <strong>Diet Label:</strong>{" "}
            {recipe.dietLabels.length > 0
              ? recipe.dietLabels.join(", ")
              : "None"}
          </Text>
          <Text>
            <strong>Health Labels:</strong> {recipe.healthLabels.join(", ")}
          </Text>
          <Text>
            <strong>Cautions:</strong>{" "}
            {recipe.cautions.length > 0 ? recipe.cautions.join(", ") : "None"}
          </Text>
          <Text>
            <strong>Ingredients:</strong>
          </Text>
          <List spacing={2} mb={4}>
            {recipe.ingredientLines.map((ingredient, index) => (
              <ListItem key={index}>{ingredient}</ListItem>
            ))}
          </List>
          <Text>
            <strong>Servings:</strong> {recipe.yield}
          </Text>
          <Text>
            <strong>Total Nutrients:</strong>
          </Text>
          <List spacing={2}>
            <ListItem>
              <strong>Energy:</strong>{" "}
              {recipe.totalNutrients.ENERC_KCAL.quantity.toFixed(2)}{" "}
              {recipe.totalNutrients.ENERC_KCAL.unit}
            </ListItem>
            <ListItem>
              <strong>Protein:</strong>{" "}
              {recipe.totalNutrients.PROCNT.quantity.toFixed(2)}{" "}
              {recipe.totalNutrients.PROCNT.unit}
            </ListItem>
            <ListItem>
              <strong>Fat:</strong>{" "}
              {recipe.totalNutrients.FAT.quantity.toFixed(2)}{" "}
              {recipe.totalNutrients.FAT.unit}
            </ListItem>
            <ListItem>
              <strong>Carbs:</strong>{" "}
              {recipe.totalNutrients.CHOCDF.quantity.toFixed(2)}{" "}
              {recipe.totalNutrients.CHOCDF.unit}
            </ListItem>
            <ListItem>
              <strong>Cholesterol:</strong>{" "}
              {recipe.totalNutrients.CHOLE.quantity.toFixed(2)}{" "}
              {recipe.totalNutrients.CHOLE.unit}
            </ListItem>
            <ListItem>
              <strong>Sodium:</strong>{" "}
              {recipe.totalNutrients.NA.quantity.toFixed(2)}{" "}
              {recipe.totalNutrients.NA.unit}
            </ListItem>
          </List>
        </Stack>
      </Box>
    </Center>
  );
};

export default RecipePage;
