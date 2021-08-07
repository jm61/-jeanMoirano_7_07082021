import {recipes} from './data.js'
import {DisplayRecipes} from './recipes.js'
import * as _ from './utils.js'
const mainSearch = _.$('#search')
const hiddenCont = _.$('.search-error-msg')
const recipesWrapper = _.$('#recipes-wrapper')

   export function search () {
        mainSearch.value = ''
        mainSearch.addEventListener('input', e => {
            recipesWrapper.innerHTML = ''
            hiddenCont.textContent = ''
            let searchResult = []

            if(e.target.value.length < 3) return
            const rand = Math.random().toFixed(4)
            console.time(rand)
            recipes.forEach(recipe => {
                if(_.flatText(recipe.name).includes(e.target.value)) {
                    searchResult.push(recipe)
                }  
            })          
            new DisplayRecipes(searchResult)
            console.timeEnd(rand) 
            if(recipesWrapper.innerHTML.length === 0) {
                invalidSearch(e.target.value)
            }
        })   
    }
 


const invalidSearch = value => {
    hiddenCont.textContent = `votre recherche avec "${value}" ne donne aucun résultat`
}



