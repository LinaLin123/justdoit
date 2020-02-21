const toDoField = document.querySelector('#todo')
const form = document.querySelector('#form')
const collection = document.querySelector('#collection')
const categoryBy = document.querySelector('#categoryfilter')
const filterby = document.querySelector('#filter')

const allTodos = []
let addedToDos = 0

form.addEventListener('submit', function(event) { // Skapar to dos när man lägger add
  event.preventDefault() // pga av submit måste man ha event 

  if (toDoField.value !== '') { // Om väldet är tomt kan man inte lägga till to dos. 
    let newTodo = { // Skappar to dos med text, datum, kategori och index
        text: toDoField.value,
        date: dateField.value,
        category: chooseCategory.value,
        index: addedToDos
    }
    allTodos.push(newTodo) // Lägger till nya to dos
    addedToDos++ 
  
    toDoField.value = '' 
  
    drawListItems(allTodos) // Ritar list items
  }


})

// Skapar datum 
const dateField = document.querySelector('#date')

function today() { // dagens datum
    const now = new Date()
    let yyyy= (now.getFullYear())
    let mm = (now.getMonth()+ 1)
    
    if (mm < 10) {
        mm = '0' + mm
        
    }
    let dd = (now.getDate())
    if (dd < 10) {
        dd = '0' + dd
    }

    dateField.value = yyyy + '-' + mm + '-' + dd // Vad det ska stå i input. 
    
  }
  
  today() // Funktionen kör

const chooseCategory = document.querySelector('#category')


function drawListItems(drawArr) { 
    const filteredArr = filterByFilter(filterByCategory(drawArr)) //anropar på två arrays, först filterByCategory och sedan filterByFilter
    
    collection.innerHTML = ''
    for (let i = 0; i<filteredArr.length; i++) {
        const li = document.createElement('li')

        const span = document.createElement('span')
        span.textContent = filteredArr[i].text 
        li.appendChild(span)

        const span2 = document.createElement('span')
        span2.textContent = ' ' + filteredArr[i].date 
        li.appendChild(span2)

        let now = new Date()
        let todoDate = new Date(filteredArr[i].date + ' 23:59')
        if (todoDate < now) {
            span2.textContent += '⚠️'
        }

        const span3 = document.createElement('span')
        span3.textContent = ' ' + filteredArr[i].category 
        li.appendChild(span3)

        var x = document.createElement("button");
        x.textContent = ' ' + '❌'
        li.appendChild(x)

        x.addEventListener('click', function(event) {
            removeFromArray(filteredArr[i].index)
            drawListItems(allTodos)
        })

        collection.appendChild(li)

    }
}

function removeFromArray(index) {
    for (let i = 0; i < allTodos.length; i++) {
        if(allTodos[i].index === index) {
            allTodos.splice(i, 1)
        }
    }
}



filterby.addEventListener('input', function(event) {
    drawListItems(allTodos)
  })
  

  drawListItems(allTodos)

  categoryBy.addEventListener('click', function(event){
     drawListItems(allTodos)
  })

  drawListItems(allTodos)




function filterByCategory(allTodos) {
    const allRadioBtns = categoryBy.querySelectorAll('input')
    let chosenCategory = ''
    for (let i = 0; i<allRadioBtns.length; i++) {
      if(allRadioBtns[i].checked) {
          chosenCategory = allRadioBtns[i].value
      }
    }
    const filteredCategoryRadio = allTodos.filter(function(todo) {
      if (chosenCategory === 'all') {
          return true
      }
      return todo.category === chosenCategory
    } )
    return filteredCategoryRadio
}


function filterByFilter(allTodos) {
    const searchFor = filterby.value.toLowerCase()
    const filteredCategory = allTodos.filter(function(todo) {
      return todo.text.includes(searchFor)
     } )
    return filteredCategory
}


