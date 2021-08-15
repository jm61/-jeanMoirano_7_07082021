import * as _ from './utils.js'
export let dataFormat = []

/**
 * Normalize data with flatText and add raw and tagSelect object
 * @param {*} recipes 
 * @returns  dataFormat
 */
export function formatData(recipes) {
    recipes.forEach(recipe => {
        dataFormat.push({
            "name": _.flatText(recipe.name),
            "description": _.flatText(recipe.description),
            "appliance": _.flatText(recipe.appliance),
            "ingredients": [...recipe.ingredients.map(ingredient => {return _.flatText(ingredient.ingredient)})],
            "ustensils": [...recipe.ustensils.map(utensil => {
                return _.flatText(utensil)})],
            "raw": recipe,
            "tagMerge": [...recipe.ingredients.map(ingredient => {return ingredient.ingredient}),recipe.appliance,...recipe.ustensils]
        })
    })
    //console.log(dataFormat[0].tagMerge)
    return dataFormat;
 }