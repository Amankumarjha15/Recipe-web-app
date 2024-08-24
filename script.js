const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeCloseButton = document.querySelector(".recipe-close-btn");
const recipeDetailContent = document.querySelector(".recipe-detail-content");





const fetchRecipe = async (query) => {
    recipeContainer.innerHTML="<h1>Fetching Recipes ...</h1>";

    try{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    console.log(response);





     recipeContainer.innerHTML="";

    response.meals.forEach(meal => {
       const recipeDiv = document.createElement('div');
       recipeDiv.classList.add('recipe');
       recipeDiv.innerHTML = `
           <img src="${meal.strMealThumb}">
           <h3>${meal.strMeal}</h3>
           <p><span>${meal.strArea}</span> Dish</p>
           <p>Belongs to <span>${meal.strCategory}</span> Category</p>

       `

       const button = document.createElement('button');
       button.textContent='View Recipe';
       recipeDiv.appendChild(button);

       recipeContainer.appendChild(recipeDiv);

      
    //    adding event listener to the recipe button to show popup

    button.addEventListener('click', ()=> {
        openRecipePopup(meal);
    })



    })
}
catch(error){
    recipeContainer.innerHTML=`<h1>Type correct recipe name . This <span> ${query} </span> recipe is not found.</h1>`;
}

}



const fetchIngredents = (meal) => {
    let Ingredientslist = '';
    for(let i=1; i<=20 ; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            Ingredientslist += `<li> ${measure} ${ingredient} </li>`
        }
        else{
            break;
        }
    }
    return Ingredientslist;
}





const openRecipePopup = (meal)=> {
    recipeDetailContent.innerHTML= `
    <h2 class="recipename">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientlist">${fetchIngredents(meal)}</ul>
    <div>
    <h3>Instructions:</h3>
    <p class="instructions">${meal.strInstructions}</p>
    </div>
    `

    recipeDetailContent.parentElement.style.display="block";
}


recipeCloseButton.addEventListener('click', ()=>{
    recipeDetailContent.parentElement.style.display="none";
})


searchBtn.addEventListener("click" , (e)=> {
     e.preventDefault();
     const searchinput = searchBox.value.trim();  
     if(!searchinput){
       recipeContainer.innerHTML = `<h1>Type the meal name you want to search.</h1>`
       return;
     }
     fetchRecipe(searchinput);
})