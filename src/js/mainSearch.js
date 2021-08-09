import { recipes } from "./data.js"
import { DisplayRecipes } from "./recipes.js"
import { dropDownMenus } from "./dropDown.js"
import * as _ from "./utils.js"
const mainSearch = _.$("#search")
const hiddenCont = _.$(".search-error-msg")
const recipesWrapper = _.$("#recipes-wrapper")
export let searchResult = []

export function search() {
  mainSearch.value = ""
  mainSearch.addEventListener("input", event => {
    searchResult = []
    recipesWrapper.innerHTML = ""
    hiddenCont.textContent = ""

    if (event.target.value.length < 3) {
      new DisplayRecipes(recipes)
    }
    // init counter
    const rand = Math.random().toFixed(4)
    console.time(rand)
    // search function
    searchAlgo1(recipes,event)
    // format results
    searchResult = new Set(searchResult)
    searchResult = Array.from(searchResult)
    // refresh recipes list and dropDown menus
    refreshDOM(searchResult)
    console.timeEnd(rand)
    if (recipesWrapper.innerHTML.length === 0) {
      invalidSearch(event.target.value)
    }
  })
}
const invalidSearch = (value) => {
  hiddenCont.textContent = `votre recherche avec "${value}" ne donne aucun résultat`
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

function searchAlgo1(recipes,event) {
  recipes.forEach((recipe) => {
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

function refreshDOM(searchResult) {
  new DisplayRecipes(searchResult)
  new dropDownMenus(searchResult)
}

