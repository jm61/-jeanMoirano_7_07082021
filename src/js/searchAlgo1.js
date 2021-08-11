import * as _ from "./utils.js"
import {searchResult} from './mainSearch.js'

export function searchAlgo1(recipes,event) {
    recipes.forEach(recipe => {
      // search on list of ingredients
      getIngredients(recipe).forEach((el) => {
        if (_.flatText(el).includes(event.target.value)) {
          searchResult.push(recipe)
        }
      })
      // search on list of ustensils
      getUstensils(recipe).forEach((el) => {
        if (_.flatText(el).includes(event.target.value)) {
          searchResult.push(recipe)
        }
      })
      // search on name, description and appliance
      if (
        _.flatText(recipe.name).includes(event.target.value) ||
        _.flatText(recipe.description).includes(event.target.value) ||
        _.flatText(recipe.appliance).includes(event.target.value)
      ) {
        searchResult.push(recipe)
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