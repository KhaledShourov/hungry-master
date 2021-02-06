const search = document.getElementById('search')
submit = document.getElementById('submit')
random = document.getElementById('random')
mealsElement = document.getElementById('meals')
resultHeading = document.getElementById('result-heasing')
singleMealElement = document.getElementById('single-meal')


function searchMeals(e) {
    e.preventDefault()

    singleMealElement = ''
    const term = search.value

    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }else{
        alert('Please search')
    }
          
}

//Event Listener
submit.addEventListener('submit', searchMeals)