let projects = [];

function getData(e) {
    e.preventDefault()

    let name = document.getElementById("project-name").value
    let startDate = document.getElementById("startdate").value
    let endDate = document.getElementById("enddate").value
    let description = document.getElementById("project-desc").value
    let imageInput = document.getElementById("input-img")
    let image = imageInput.files.length > 0 ? URL.createObjectURL(imageInput.files[0]) : ""

    let techs = []
    if (document.getElementById("nodejs-check").checked) {
        techs.push("NodeJs")
    }
    if (document.getElementById("nextjs-check").checked) {
        techs.push("NextJs")
    } 
    if (document.getElementById("reactjs-check").checked) {
        techs.push("ReactJs")
    } 
    if (document.getElementById("typescript-js").checked) {
        techs.push("TypeScript")
    } 

    let project = {
        name,
        startDate,
        endDate,
        description,
        techs,
        image
    }

    projects.push(project)

    renderProjects()
}

function getDurationDetail(startDate, endDate) {
    let start = new Date(startDate)
    let end = new Date(endDate)
    
    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()
    let days = end.getDate() - start.getDate()
    
    if (days < 0) {
        months--
        days += 30
    }
    
    if (months < 0) {
        years--
        months += 12
    }
    
    if (years < 0) {
        years = 0
    }
    
    let result = ""
    if (years > 0) {
        result += `${years} tahun `
    }
    if (months > 0) {
        result += `${months} bulan `
    }
    if (days > 0) {
        result += `${days} hari `
    }

    return result.trim()
}

function renderProjects() {

    document.getElementById("cardProjects").innerHTML=''
    for(let i=0; i < projects.length; i++){
        document.getElementById("cardProjects").innerHTML += 
        `<div class="card m-3 project-card">
                ${projects[i].image
                    ? `<img src = "${projects[i].image}" class="project-img" alt="Project Image">`
                    : `<div class="project-img">
                        <i class="fa-solid fa-image" style="font-size: 48px; color: gray;"></i>
                    </div>`
                }
                <div class="card-body">
                    <h5 class="card-title">${projects[i].name}</h5>
                    <p class="project-duration">durasi: ${getDurationDetail(projects[i].startDate, projects[i].endDate)}</p>
                    <p class="card-text">${projects[i].description}</p>
                    <div class="tech-icons">
                        ${projects[i].techs.map(tech => {
                            if (tech === "NodeJs") {
                                return `<i class="fa-brands fa-node-js"></i>`
                            } else if (tech === "NextJs") {
                                return `<img src="https://img.icons8.com/?size=100&id=yUdJlcKanVbh&format=png&color=000000" alt="NextJs" >`
                            } else if (tech === "ReactJs") {
                                return `<i class="fa-brands fa-react"></i>`
                            } else if (tech === "TypeScript") {
                                return `<img src="https://img.icons8.com/?size=100&id=vMqgHSToxrJR&format=png&color=000000" alt="TypeScript">`
                            } else {
                                return ""
                            }
                        }).join(" ")}
                    </div>
                    <div class="button-update">
                        <button type="button" class="btn btn-dark">Edit</button>
                        <button type="button" class="btn btn-dark">Delete</button>
                    </div>
                </div>
            </div>
        `
    }

}
