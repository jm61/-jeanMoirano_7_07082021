import {searchResult} from './mainSearch.js'

export function searchAlgo2(dataFormat,event) {
    const value = event.target.value
    dataFormat.forEach(recipe => {
        recipe.searchMerge.some(el => {
            if(el.includes(value)) {
                searchResult.push(recipe.raw)
            }
        })
    })
}