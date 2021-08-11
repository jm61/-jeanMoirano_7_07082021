import {recipes} from './data.js'
import {tagSelected} from './dropDown.js'
import * as _ from "./utils.js"
import {DisplayRecipes} from './recipes.js'
const ingredientsColor = "#3282f7";
const appliancesColor = "#68d9a4";
const utensilsColor = "#ed6454";
const recipesWrapper = _.$('#recipes-wrapper')
let tagSelectResult = []

export const tagsSearch = (tag,menu) => {
    recipesWrapper.innerHTML = ''
    console.log(tagSelected.length)
    switch(menu) {
        case ingredientsColor:
            recipes.forEach(recipe => {
                // search on list of ingredients
                getIngredients(recipe).forEach((el) => {
                  if (el.includes(tag)) {
                    tagSelectResult.push(recipe)
                  }
                })
            })
            displayResults(tagSelectResult)
            break
        case appliancesColor:
            recipes.forEach(recipe => {
                if (recipe.appliance.includes(tag)) {
                    tagSelectResult.push(recipe)
                  }
            })
            displayResults(tagSelectResult)
            break
        case utensilsColor:
            recipes.forEach(recipe => {
                getUstensils(recipe).forEach((el) => {
                    if (el.includes(tag)) {
                      tagSelectResult.push(recipe)
                    }
                  })
            })
            displayResults(tagSelectResult)
    }
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
  function displayResults(tagSelectResult) {
      tagSelectResult = new Set(tagSelectResult)
      tagSelectResult = Array.from(tagSelectResult)
      console.log(tagSelectResult)
      new DisplayRecipes(tagSelectResult)
  }
  export function resetRecipes(recipes) {
    if(tagSelected.length === 0) {
        recipesWrapper.innerHTML = ''
        tagSelectResult = []
        new DisplayRecipes(recipes)
    }
  }