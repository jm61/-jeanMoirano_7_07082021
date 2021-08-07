import * as _ from './utils.js'
const wrapper = _.$('#recipes-wrapper')

class DisplayRecipes {
  constructor(recipes) {
    this.recipes = recipes
    this.createRecipeCard(recipes)
  }

  createRecipeCard(recipes) {
    recipes.forEach(recipe => {
      const article = _.createEltWithClassName('article', 'recipe')
      article.dataset.id = _.flatText(recipe.name)
      let ingredientsList = []

      recipe.ingredients.forEach(ingredient => {
        if (ingredient.quantity) {
          if (ingredient.unit && ingredient.quantity) {
            ingredientsList += `<li><strong class='ingredient'>${ingredient.ingredient}</strong> : ${ingredient.quantity} ${ingredient.unit}</li>`;
          } else {
            ingredientsList += `<li><strong class='ingredient'>${ingredient.ingredient}</strong> : ${ingredient.quantity}</li>`;
          }
        } else {
          ingredientsList += `<li><strong class='ingredient'>${ingredient.ingredient}</strong></li>`;
        }
      })
      article.innerHTML = `
        <img class='background_picture' src="./public/img/recipes/${recipe.name}.jpg" loading="lazy">
        <footer class="recipe__information">
            <h1 class="recipe__information__name">${recipe.name}</h1>
            <h2 class="recipe__information__time"><i class="far fa-clock"></i> ${recipe.time} min</h2>
            <div class="recipe__information__text">
                <ul class="recipe__information__text__list">
                ${ingredientsList}
                </ul>
                <p class="recipe__information__text__instructions">${recipe.description}</p>
                <p class="ustensils" style = 'display : none'> ${recipe.appliance} ${recipe.ustensils} </p>
            </div>
        </footer>`
      wrapper.appendChild(article)
    })
  }
}

export {DisplayRecipes}