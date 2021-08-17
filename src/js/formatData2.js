import * as _ from './utils.js'
export let dataFormat = []

/**
 * Normalize data with flatText and add raw and tagSelect object
 * @param {*} recipes 
 * @returns  dataFormat
 */
export function formatData(recipes) {
    recipes.forEach( recipe => {
        dataFormat.push({
            "searchMerge": [
                _.flatText(recipe.name),
                _.flatText(recipe.description),
                ...recipe.ingredients.map(ingredient => {return _.flatText(ingredient.ingredient)}),
                _.flatText(recipe.appliance),
                ...recipe.ustensils.map(utensil => {
                return _.flatText(utensil)})
            ],
            "raw": recipe,
        })
    })
    //console.log(dataFormat[32].searchMerge)
    return dataFormat
}