let project = null

const savedProject = localStorage.getItem("currentProject");

if (savedProject) {

    project = JSON.parse(savedProject);

    if (!project.tasks) {
    project.tasks = [];
    }

    const title = document.getElementById("projectTitle");
    title.textContent = project.name;
    
}

const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", function(){
    window.location.href = "index.html";
});


const taskContainer = document.getElementById("tasksContainer");

function renderTasks() {
    taskContainer.innerHTML = "";

    project.tasks.forEach(function(task, index) {
        const taskElement = document.createElement("div");
        taskElement.textContent = task;

        taskContainer.appendChild(taskElement);
    });
}

renderTasks()

// aca hacemos los botones para agregar tareas

const addTaskBtn = document.getElementById ("addTaskBtn");
console.log(addTaskBtn);
const taskInput = document.getElementById ("taskInput");

addTaskBtn.addEventListener("click", function(){
    const taskText = taskInput.value;

    if (taskText) {
        project.tasks.push(taskText);

        localStorage.setItem("currentProject", JSON.stringify(project));

        renderTasks();

        taskInput.value = "";
    }
})

