import { recipes } from "./data.js"
import {dataFormat} from './formatData2.js'
import { DisplayRecipes } from "./recipes.js"
import { dropDownMenus } from "./dropDown.js"
import {searchAlgo1} from './searchAlgo1.js'
import {searchAlgo2} from './searchAlgo2.js'
import {tagSelected} from './dropDown.js'
import * as _ from "./utils.js"
const mainSearch = _.$("#search")
const hiddenCont = _.$(".search-error-msg")
const recipesWrapper = _.$("#recipes-wrapper")
export let searchResult = []
export let tagSelectResult = []

export function search() {
  mainSearch.value = ""
  mainSearch.addEventListener("change", event => {
    searchResult = []
    tagSelectResult = []
    recipesWrapper.innerHTML = ""
    hiddenCont.textContent = ""

    if (event.target.value.length < 3) {
      new DisplayRecipes(recipes)
    }
    // init counter
    console.time('running time')
    //const t0 = performance.now()
    // search function
    //searchAlgo1(recipes,event)
    searchAlgo2(dataFormat,event)
    //const t1 = performance.now()
    //console.log(`Running time: ${t1-t0}ms`)
    console.timeEnd('running time')
    // format results
    //searchResult = new Set(searchResult)
    searchResult = [... new Set(searchResult)]
    //searchResult = Array.from(searchResult)
    //tagSelectResult = new Set(tagSelectResult)
    tagSelectResult = [... new Set(tagSelectResult)]
    //console.log({tagSelectResult})
    // refresh recipes list and dropDown menus
    refreshDOM(searchResult)
    if (recipesWrapper.innerHTML.length === 0) {
      invalidSearch(event.target.value)
    }
  })
}
const invalidSearch = (value) => {
  hiddenCont.textContent = `votre recherche avec "${value}" ne donne aucun résultat`
  new DisplayRecipes(recipes)
}
function refreshDOM(source) {
  new DisplayRecipes(source)
  new dropDownMenus(source)
}

