let projects = [];

const savedProjects = localStorage.getItem("projects");

// Si hay algo guardado=
if (savedProjects) {
    projects = JSON.parse(savedProjects);
}



const projectsContainer = document.getElementById("projectsContainer");
function renderProjects() {
    // Sirve para limpiar lo anterior
    projectsContainer.innerHTML = "";

    //recorre los proyectos
    projects.forEach(function(project, index){
        //crear un elemento
        const projectCard = document.createElement("div");

        projectCard.classList.add("project-card");
        
        //contenido
        projectCard.textContent = project.name;

        
                        //Boton para borrar
        const deleteBton = document.createElement("button");
        deleteBton.textContent = "X";

        deleteBton.addEventListener("click", function(e){
            e.stopPropagation();
            projects.splice(index, 1);
            localStorage.setItem("projects", JSON.stringify(projects));
            renderProjects();
        });

                // Con esto vamos a abrir los proyectos
        projectCard.addEventListener("click", function(){
            openProject(index);
        });

        function openProject(index) {
            const selectedProject = projects[index];

            localStorage.setItem("currentProject", JSON.stringify(selectedProject));
            window.location.href = "project.html";
        }

        //agregar al contenedor
        projectCard.appendChild(deleteBton);
        projectsContainer.appendChild(projectCard);

    });
}

const newProjectBtn = document.getElementById("newProjectBtn");
newProjectBtn.addEventListener("click", function(){

    const projectName = prompt("Nombre del proyecto: ");

    if (projectName) {

        const newProject = {
            name: projectName,
            tasks: []
        };
        


    projects.push(newProject);

    localStorage.setItem("projects", JSON.stringify(projects));

    console.log("click detectado");

    renderProjects();
    }

});

renderProjects();


