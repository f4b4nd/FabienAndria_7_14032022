export const getIngredients = (recipes) => (
    recipes.reduce((acc, recipe) => {

        const newIngredients = recipe.ingredients.reduce((newAcc, item) => (
            acc.includes(item.ingredient) ? newAcc : [...newAcc, item.ingredient]
        ), [])

        return [...acc, ...newIngredients]
    }, [])
)

export const getAppliances = (recipes) => (
    recipes.reduce((acc, recipe) => acc.includes(recipe.appliance) ? acc : [...acc, recipe.appliance], [])
)

export const getUstensils = (recipes) => (
    recipes.reduce((acc, recipe) => {

        const newUstensils = recipe.ustensils.reduce((newAcc, ustensil) => (
            acc.includes(ustensil) ? newAcc : [...newAcc, ustensil]
        ), [])

        return [...acc, ...newUstensils]
    }, [])
)