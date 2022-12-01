import { dataWithoutId } from "./recipes";

export async function seedRecipes() {
    await fetch('https://restapi.fr/api/recipesSG',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataWithoutId)
    });
};