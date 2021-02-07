const search = document.getElementById('search')
submit = document.getElementById('submit')
random = document.getElementById('random')
mealsElement = document.getElementById('meals')
resultHeading = document.getElementById('result-heading')
singleMealElement = document.getElementById('single-meal')

//Search Meals Function fetch by Name
function searchMeals(e) {
    e.preventDefault()

    singleMealElement = ''
    const term = search.value

    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            resultHeading.innerHTML = `<h2>Search result '${term}':</h2>`

           if (data.meals === null) {
                resultHeading.innerHTML = '<h1 style="color:red">There are no result, Please try again!</h1>'
            }else{
                mealsElement.innerHTML = data.meals.map(meal =>`
                    <div class = "meal">
                    <img src = "${meal.strMealThumb}" alt = "${meal.strMeal}"/>
                    <div class ="meal-info" data-mealID=${meal.idMeal}">
                       <h3>${meal.strMeal}</h3> 
                    </div>
                    </div>
                `)
                .join('')
            }
        })
       search.value=''
    }else{
        alert('Please search any meals or foods ')
    }
          
}

//fetch meal by ID
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
       
        const meal = data.meals[0]

        addMealToDOM(meal)
    })
}

//Add meal to DOM
  function addMealToDOM(meal) {
           const ingredients = []

           for (let i = 1; i <= 20; i++) {
               if (meal[`strIngredient ${i}`]) {
                   ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
               } else {
                   break;
               }
           }
           singleMealElement =`
           <div class ="single-meal">
           <h1>${meal.strMeal}</h1>
           </div>`
       }


//Event Listener
submit.addEventListener('submit', searchMeals)

mealsElement.addEventListener('click', e =>{
    const mealInfo = e.path.find(item=>{
        if(item.classList){
         return item.classList.contains('meal-info')
        }else{
            return false;
      }
    })
 
    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid')
        getMealById(mealID)
    }
})