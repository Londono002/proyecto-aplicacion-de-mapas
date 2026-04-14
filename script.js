let projects = [];


const projectsContainer = document.getElementById("projectsContainer");
function renderProjects() {
    // Sirve para limpiar lo anterior
    projectsContainer.innerHTML = "";

    //recorre los proyectos
    projects.forEach(function(project){
        //crear un elemento
        const projectCard = document.createElement("div");

        projectCard.classList.add("project-card");
        
        //contenido
        projectCard.textContent = project.name;

        //agregar al contenedor
        projectsContainer.appendChild(projectCard);

    });
}

const newProjectBtn = document.getElementById("newProjectBtn");
newProjectBtn.addEventListener("click", function(){

    const projectName = prompt("Nombre del proyecto: ");

    if (projectName) {

        const newProject = {
            name: projectName
        };
        


    projects.push(newProject);

    console.log("click detectado");

    renderProjects();
    }

});

