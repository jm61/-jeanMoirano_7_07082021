import { recipes } from "./data.js";
import * as _ from "./utils.js";
let recipesName = [];
const c = console.log;
// tags menus variables
const selectedElement = _.$(".nav__selected__container");
const ingredientsColor = "#3282f7";
const appliancesColor = "#68d9a4";
const utensilsColor = "#ed6454";

/**
 * Dropdown menus control
 * @param {menus} menus controls
 */
export class dropDownMenus {
  constructor(recipes) {
    this.recipes = recipes;
    this.test(recipes);

    // Ingredients
    this.menus("ingredients", "appliances", "utensils");
    // Appliances
    this.menus("appliances", "ingredients", "utensils");
    // Utensils
    this.menus("utensils", "ingredients", "appliances");
  }
  /**
   * @param {*} a menu to open
   * @param {*} b menu to close
   * @param {*} c menu to close
   * @param {event} open menu
   * @param {focus} input open menu
   * @param {event} close menu
   */
  menus(a, b, c) {
    _.$(`#container-${a}-closed`).addEventListener(
      "click",
      (e) => {
        openMenu(a);
        _.$(`#container-${a}-open`).firstChild.nextSibling.focus();
        closeMenu(b);
        closeMenu(c);
      },
      true
    );
    _.$(`#chevron-up-${a}`).addEventListener("click", (e) => {
      closeMenu(a);
    });
  }

  /**
   * @param {array} for menus
   */
  test(recipes) {
    let tempArray = [];
    let appliances = [];
    let utensils = [];
    let ingredients = [];

    const ingredientsUl = _.$(".dropDown__input__active__list__ingredient");
    const applianceUl = _.$(".dropDown__input__active__list__appliance");
    const utensilsUl = _.$(".dropDown__input__active__list__utensils");
    /**
     * @param {array} array sort alpha and unique
     */
    recipes.forEach((el) => {
      recipesName.push(el.name);
      tempArray.push(el.ingredients);
      appliances.push(el.appliance);
      utensils.push(el.ustensils);
      tempArray = new Set(tempArray.flat());
      tempArray = Array.from(tempArray);
      appliances = new Set(appliances.flat());
      appliances = Array.from(appliances).sort();
      utensils = new Set(utensils.flat());
      utensils = Array.from(utensils).sort();
    });
    tempArray.forEach((el) => {
      ingredients.push(el.ingredient);
      ingredients = new Set(ingredients.flat());
      ingredients = Array.from(ingredients).sort();
    });
    /**
     * @param {tags()} tags called for DOM display
     * @static {colors} colors for tags
     */
    ingredientsUl.innerHTML = "";
    ingredients.forEach((el) => {
      ingredientsUl.appendChild(tags(el, ingredientsColor));
    });
    applianceUl.innerHTML = "";
    appliances.forEach((el) => {
      applianceUl.appendChild(tags(el, appliancesColor));
    });
    utensilsUl.innerHTML = "";
    utensils.forEach((el) => {
      utensilsUl.appendChild(tags(el, utensilsColor));
    });
    /**
     * tags controls
     * @param {*} el element from menu array
     * @param {*} menuColor for tag coloring
     * @returns elementLi
     */
    function tags(el, menuColor) {
      const elementLi = document.createElement("li");
      elementLi.textContent = el;
      elementLi.addEventListener(
        "click",
        (e) => {
          const button = _.createEltWithClassName(
            "button",
            "nav__selected__container__tagSelected"
          );
          button.textContent = el;
          const closeIcon = _.createEltWithClassName(
            "i",
            "far",
            "fa-times-circle",
            "nav__selected__container__close"
          );
          button.style.backgroundColor = menuColor;
          button.appendChild(closeIcon);
          closeMenu("ingredients");
          selectedElement.appendChild(button);
          button.addEventListener("click", (e) => {
            selectedElement.removeChild(button);
            removeEventListener("click", e);
          });
        },
        true
      );
      return elementLi;
    }
  }
}

/**
 *
 * @param {*} menu utilities close/open menus
 */
function closeMenu(menu) {
  _.$(`#container-${menu}-closed`).style.display = "block";
  _.$(`#container-${menu}-open`).style.display = "none";
}
function openMenu(menu) {
  _.$(`#container-${menu}-closed`).style.display = "none";
  _.$(`#container-${menu}-open`).style.display = "block";
}
/**
 * @param {event} click outside to close menu
 */
window.addEventListener(
  "click",
  (e) => {
    closeMenu("ingredients");
    closeMenu("appliances");
    closeMenu("utensils");
  },
  true
);
