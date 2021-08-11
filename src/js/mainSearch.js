import { recipes } from "./data.js"
import { DisplayRecipes } from "./recipes.js"
import { dropDownMenus } from "./dropDown.js"
import {searchAlgo1} from './searchAlgo1.js'
import {tagSelected} from './dropDown.js'
import * as _ from "./utils.js"
const mainSearch = _.$("#search")
const hiddenCont = _.$(".search-error-msg")
const recipesWrapper = _.$("#recipes-wrapper")
export let searchResult = []
export let tagSelectResult = []

export function search() {
  mainSearch.value = ""
  mainSearch.addEventListener("input", event => {
    searchResult = []
    tagSelectResult = []
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
    tagSelectResult = new Set(tagSelectResult)
    tagSelectResult = Array.from(tagSelectResult)
    console.log({tagSelectResult})
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
function refreshDOM(source) {
  new DisplayRecipes(source)
  new dropDownMenus(source)
}

