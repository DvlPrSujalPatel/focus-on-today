const chexkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-lable')
const progressLable = document.querySelector('.progress-lable')
const progressBar = document.querySelector('.progress-bar')
const progressValue = document.querySelector('.progress-value')
const progressQoute = document.querySelector('.qoute')
// const addBtn = document.querySelector('.btn1')

const allLables = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
]

const allQoutes = [
    '“Move one step ahead, today!”',
    '“Keep Going, You’re making great progress!”',
    '“Move one step only”',
    '“I had known  You Can It”',

]



// const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
//     first: {
//         name: '',
//         completed: false,
//     },
//     second: {
//         name: '',
//         completed: false,
//     },
//     third: {
//         name: '',
//         completed: false,
//     },
// }

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}


let completedGoalsCount = Object.values(allGoals).filter(
    (goal) => goal.completed
).length


progressValue.style.width = `${completedGoalsCount / 3 * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`
progressLable.innerText = allLables[completedGoalsCount]
progressQoute.innerText = allQoutes[completedGoalsCount]


chexkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const allGoalsAdded = [...inputFields].every((input) => {
            return input.value
        })

        if (allGoalsAdded) {
            checkbox.parentElement.classList.toggle('completed')
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${completedGoalsCount / inputFields.length * 100}%`
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed`
            progressLable.innerText = allLables[completedGoalsCount]
            progressQoute.innerText = allQoutes[completedGoalsCount]
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }
        else {
            progressBar.classList.add('show-error')
        }
    })
})

inputFields.forEach((input) => {
    input.value = allGoals[input.id].name

    if (allGoals[input.id].completed) {
        input.parentElement.classList.add('completed')
    }


    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error')
    })


     input.addEventListener('input', (e) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name
      return
    }

    if (allGoals[input.id]) {
      allGoals[input.id].name = input.value
    } else {
      allGoals[input.id] = {
        name: input.value,
        completed: false,
      }
    }

        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})
