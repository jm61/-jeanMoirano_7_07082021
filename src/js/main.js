import {recipes} from './data.js'
import {dropDownMenus} from './dropDown.js'
import {DisplayRecipes} from './recipes.js'
import {search} from './mainSearch.js'

new dropDownMenus(recipes)
new DisplayRecipes(recipes)
// main loop search
search()




