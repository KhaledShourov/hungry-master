const search = document.getElementById('search')
submit = document.getElementById('submit')
random = document.getElementById('random')
mealsElement = document.getElementById('meals')
resultHeading = document.getElementById('result-heading')
singleMealElement = document.getElementById('single-meal')

//Search Meals Function
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
                resultHeading.innerHTML = '<h1>There are no result, Please try again!</h1>'
           resultHeading.style.color = "red";
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

//Event Listener
submit.addEventListener('submit', searchMeals) 