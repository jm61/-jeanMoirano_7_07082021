import {recipes} from './data.js'
//import {formatData} from './formatData.js'
import {formatData} from './formatData2.js'
import {dropDownMenus} from './dropDown.js'
import {DisplayRecipes} from './recipes.js'
import {search} from './mainSearch.js'

// normalize data and keep origin raw
formatData(recipes)
new dropDownMenus(recipes)
new DisplayRecipes(recipes)
// main loop search
search()






