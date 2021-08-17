import {searchResult} from './mainSearch.js'

export function searchAlgo2(dataFormat,event) {
    const value = event.target.value
    dataFormat.some(recipe => {
        recipe.searchMerge.some(el => {
            if(el.startsWith(value)) {
                searchResult.push(recipe.raw)
            }
        })
    })
}