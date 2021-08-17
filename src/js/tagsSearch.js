import {recipes} from './data.js'
//list of selected tags
import {tagSelected} from './dropDown.js'
//initial data optimized
import {dataFormat} from './formatData2.js'
// Js utilities
import * as _ from "./utils.js"
import {DisplayRecipes} from './recipes.js'
import {dropDownMenus} from './dropDown.js'
// Selection of dropdown menus
const ingredientsColor = "#3282f7";
const appliancesColor = "#68d9a4";
const utensilsColor = "#ed6454";
// UL list dropdown menus
const ingredientsUl = _.$(".dropDown__input__active__list__ingredient");
const applianceUl = _.$(".dropDown__input__active__list__appliance");
const utensilsUl = _.$(".dropDown__input__active__list__utensils")
const recipesWrapper = _.$('#recipes-wrapper')
const c = console.log
// tag selection search output array
let tagSelectResult = []

// function attached to <li> event
export const tagsSearch = (tag,menu) => {
    recipesWrapper.innerHTML = ''
    // selection dropdown menus
    switch(menu) {
        case ingredientsColor:
            menu = ingredientsUl
            recipes.forEach(recipe => {
                getIngredients(recipe).forEach((el) => {
                  if (el.includes(tag)) {
                    tagSelectResult.push(recipe)
                  }
                })
            })
            displayResults(tagSelectResult)
            break
        case appliancesColor:
            menu = applianceUl
            recipes.forEach(recipe => {
                if (recipe.appliance.includes(tag)) {
                    tagSelectResult.push(recipe)
                  }
            })
            displayResults(tagSelectResult)
            break
        case utensilsColor:
            menu = utensilsUl
            recipes.forEach(recipe => {
                getUstensils(recipe).forEach((el) => {
                    if (el.includes(tag)) {
                      tagSelectResult.push(recipe)
                    }
                  })
            })
            displayResults(tagSelectResult)            
        }
        removeSelectedTagFromMenu(tag,menu)
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
  // Preparation of search results
  function displayResults(tagSelectResult) {
      let countTags = tagSelected.length
      tagSelectResult = new Set(tagSelectResult)
      tagSelectResult = Array.from(tagSelectResult)
      if(tagSelected.length > 1) {
        // temp result array
        let tempResult = []
        c('process multi tags')
        // logical AND of tagSelected
        dataFormat.forEach(recipe => {
          let match = 0
          tagSelected.forEach(tag => {
             recipe.searchMerge.forEach(el => {
               if(el === _.flatText(tag)) {
                     match++
                     if(match === countTags){
                      tempResult.push(recipe.raw)
                      }
                  }
              })
          })
      })
      new DisplayRecipes(tempResult)
      new dropDownMenus(tempResult)                   
      } else {
        new DisplayRecipes(tagSelectResult)
        new dropDownMenus(tagSelectResult)
      }  
  }
  export function resetRecipes(recipes) {
    if(tagSelected.length === 0) {
        recipesWrapper.innerHTML = ''
        tagSelectResult = []
        new DisplayRecipes(recipes)
        new dropDownMenus(recipes)
    }
  }
  const removeSelectedTagFromMenu = (tag,menu) => {
    menu.childNodes.forEach(el => {
        if(el.textContent === tag) {
            el.parentNode.removeChild(el)
        }
    })
      
}