import * as _ from "./utils.js"
import { recipes } from "./data.js"
//import { DisplayRecipes } from "./recipes.js"
//import { dropDownMenus } from "./dropDown.js"

const mainSearch = _.$("#search")
const recipesWrapper = _.$("#recipes-wrapper")
const hiddenCont = _.$(".search-error-msg")

function algo1(e) {
    console.log(e)
    mainSearch.value = ""
        let searchResult = []
        recipesWrapper.innerHTML = ""
        hiddenCont.textContent = ""
        // start of algo
        /* if (e.target.value.length < 3) {
          new DisplayRecipes(recipes)
        } */
        const rand = Math.random().toFixed(4)
        console.time(rand)
        recipes.forEach((recipe) => {
          // search on list of ingredients
          getIngredients(recipe).forEach((el) => {
            if (_.flatText(el).includes(e)) {
              searchResult.push(recipe)
            }
          })
          // search on list of ustensils
          getUstensils(recipe).forEach((el) => {
            if (_.flatText(el).includes(e)) {
              searchResult.push(recipe)
            }
          })
          // search on name, description and appliance
          if (
            _.flatText(recipe.name).includes(e) ||
            _.flatText(recipe.description).includes(e) ||
            _.flatText(recipe.appliance).includes(e)
          ) {
            searchResult.push(recipe)
          }
        })
        searchResult = new Set(searchResult)
        searchResult = Array.from(searchResult)
        //new DisplayRecipes(searchResult)
        //new dropDownMenus(searchResult)
        //console.log(searchResult)
        console.timeEnd(rand)
       /*  if (recipesWrapper.innerHTML.length === 0) {
          invalidSearch(e.target.value)
        }  */
        console.log(searchResult)
        return searchResult
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

  const invalidSearch = (value) => {
    hiddenCont.textContent = `votre recherche avec "${value}" ne donne aucun résultat`
  }

export {algo1}