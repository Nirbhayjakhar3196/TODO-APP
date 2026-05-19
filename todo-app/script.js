


let taskArray = []


const taskInput = document.getElementById('taskInput')
const btn = document.getElementById('addbtn')
const Tasks = document.getElementById('taskList')
const totalTasks = document.getElementById("totalTasks")
const completedTasks = document.getElementById("completedTasks")
const emptyMessage = document.getElementById("emptyMessage")



function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(taskArray))
}

function loadTasks(){

    const storedTasks = localStorage.getItem("tasks")

    if(storedTasks){
        taskArray = JSON.parse(storedTasks)

        taskArray.forEach((task) => {
        addTask(task,false)
    });
    }

    
}

btn.addEventListener('click' ,() => {

    addTask(taskInput.value)

})

taskInput.addEventListener('keydown' , (e) => {

    if(e.key === "Enter"){
        addTask(taskInput.value)
    }
})



function addTask (taskText , save = true){

    if(taskText.trim() === ""){
        return
    }

    const li = document.createElement('li')

    const span = document.createElement('span')

    const deletebtn = document.createElement('button')

    deletebtn.innerText = "Delete"

    span.innerText = taskText

    li.appendChild(span)
    li.appendChild(deletebtn)

    

    if(save){
        taskArray.push(taskText)
        saveTasks()
    }

    Tasks.append(li)

    updateTaskStats()

    taskInput.value = ""

    deletebtn.addEventListener('click', () => {
        Tasks.removeChild(li)
        
        taskArray = taskArray.filter(task => task !== taskText)
        saveTasks()
        updateTaskStats()
    })

    li.addEventListener('click', () => {
        li.classList.toggle('done')
        updateTaskStats()
    })

}



function updateTaskStats(){

    totalTasks.innerText = `Total Tasks: ${Tasks.children.length}`
    completedTasks.innerText = `Completed Tasks: ${Tasks.querySelectorAll('.done').length}`


    if(Tasks.children.length === 0){
        emptyMessage.style.display = "block"
    }
    else{
        emptyMessage.style.display = "none"
    }
}

loadTasks()