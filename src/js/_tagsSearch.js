import * as _ from "./utils.js"
import { tagSelectResult } from "./mainSearch.js"

export function filterAlgo1(recipes,tagSelected) {
  console.log({ tagSelected })
  recipes.forEach(recipe => {
    // search on list of ingredients
    getIngredients(recipe).forEach((el) => {
      if (el.includes(tagSelected)) {
        tagSelectResult.push(recipe)
      }
    })
    // search on list of ustensils
    getUstensils(recipe).forEach((el) => {
      if (el.includes(tagSelected)) {
        tagSelectResult.push(recipe)
        console.log(tagSelectResult)
      }
    })
    // search on name, description and appliance
    if (recipe.appliance.includes(tagSelected)) {
      tagSelectResult.push(recipe)
    }
  })
}
/**
 * @param recipe
 * @returns listUstensils of one recipe
 */
function getUstensils(recipe) {
  let listUstensils = []
  const {
    id,
    name,
    servings,
    time,
    description,
    appliance,
    ingredients,
    ...getUstensils
  } = recipe
  getUstensils.ustensils.forEach((el) => {
    listUstensils.push(el)
  })
  return listUstensils
}
/**
 * @param recipe
 * @returns listIngredientq of one recipe
 */
function getIngredients(recipe) {
  let listIngredients = []
  const {
    id,
    name,
    servings,
    time,
    description,
    appliance,
    ustensils,
    ...getIngredients
  } = recipe
  getIngredients.ingredients.forEach((el) => {
    listIngredients.push(el.ingredient)
  })
  return listIngredients
}
