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

    if (name === ""){
      return alert("Silahkan mengisi nama terlebih dahulu!")
    }
    if (startDate === ""){
        return alert("Silahkan mengisi tanggal awal proyek terlebih dahulu!")
    }
    if (endDate === ""){
        return alert("Silahkan mengisi tanggal akhir proyek terlebih dahulu!")
    }


    projects.push(project)

    renderProjects()
}

function getDurationDetail(startDate, endDate) {
    let start = new Date(startDate)
    let end = new Date(endDate)

    let years = end.getFullYear - start.getFullYear()
    let months = end.getMonth() - start.getMonth()
    let days = end.getDate() - start.getDate()

    // Menghitung jumlah hari (dengan tanggal aktual)
    if (days < 0) {
        // Pengurangan 1 bulan karena "hari" negatif
        months--
        // Menghitung jumlah hari pada bulan sebelumnya
        let prevmonth = new Date(end.getFullYear(), end.getMonth(), 0) //Mendapatkan tanggal terakhir/jumlah hari bulan sebelumnya
        days += prevmonth.getDate() // menambahkan jumlah hari dari bulan sebelumnya ke "hari" tujuan
    }
    
    // Menghitung jumlah bulan
    if (months < 0) {
        // Pengurangan 1 tahun karena "tahun" negatif
        years--
        months += 12 //menambahkan jumlah bulan dalam satu tahun ke "bulan" tujuan
    }
    
    // Menghitung jumlah tahun
    if (years < 0) {
        years = 0 //mendeklarasikan default tahun sama dengan nol
    }
    
    let result = ""
    if (years > 0) {
        result += `${years} tahun `
    } 
    if (months > 0){
        result += `${months} bulan `
    }
    if(days > 0){
        result += `${days} hari `
    }

    // let years = end.getFullYear() - start.getFullYear()
    // let months = end.getMonth() - start.getMonth()
    // let days = end.getDate() - start.getDate()
    
    // if (days < 0) {
    //     months--
    //     days += 30
    // }
    
    // if (months < 0) {
    //     years--
    //     months += 12
    // }
    
    // if (years < 0) {
    //     years = 0
    // }
    
    // let result = ""
    // if (years > 0) {
    //     result += `${years} tahun `
    // }
    // if (months > 0) {
    //     result += `${months} bulan `
    // }
    // if (days > 0) {
    //     result += `${days} hari `
    // }

    return result.trim()
}

function renderProjects() {

    // document.getElementById("cardProjects").innerHTML=''
    // for(let i=0; i < projects.length; i++){
    //     document.getElementById("cardProjects").innerHTML += 
    //     `<div class="card m-3 project-card">
    //             ${projects[i].image
    //                 ? `<img src = "${projects[i].image}" class="project-img" alt="Project Image">`
    //                 : `<div class="project-img">
    //                     <i class="fa-solid fa-image" style="font-size: 48px; color: gray;"></i>
    //                 </div>`
    //             }
    //             <div class="card-body">
    //                 <h5 class="card-title">${projects[i].name}</h5>
    //                 <p class="project-duration">durasi: ${getDurationDetail(projects[i].startDate, projects[i].endDate)}</p>
    //                 <p class="card-text">${projects[i].description}</p>
    //                 <div class="tech-icons">
    //                     ${projects[i].techs.map(tech => {
    //                         if (tech === "NodeJs") {
    //                             return `<i class="fa-brands fa-node-js"></i>`
    //                         } else if (tech === "NextJs") {
    //                             return `<img src="https://img.icons8.com/?size=100&id=yUdJlcKanVbh&format=png&color=000000">`
    //                         } else if (tech === "ReactJs") {
    //                             return `<i class="fa-brands fa-react"></i>`
    //                         } else if (tech === "TypeScript") {
    //                             return `<img src="https://img.icons8.com/?size=100&id=vMqgHSToxrJR&format=png&color=000000">`
    //                         } else {
    //                             return ""
    //                         }
    //                     }).join(" ")}
    //                 </div>
    //                 <div class="button-update">
    //                     <button type="button" class="btn btn-dark">Edit</button>
    //                     <button type="button" class="btn btn-dark">Delete</button>
    //                 </div>
    //             </div>
    //         </div>
    //     `
    // }

    const cardContainer = document.getElementById("cardProjects")
    cardContainer.innerHTML = projects.map((project) => {
        return `<div class="card m-3 project-card">
                ${project.image
                    ? `<img src = "${project.image}" class="project-img" alt="Project Image">`
                    : `<div class="project-img">
                        <i class="fa-solid fa-image" style="font-size: 48px; color: gray;"></i>
                    </div>`
                }
                <div class="card-body">
                    <h5 class="card-title">${project.name}</h5>
                    <p class="project-duration">durasi: ${getDurationDetail(project.startDate, project.endDate)}</p>
                    <p class="card-text">${project.description}</p>
                    <div class="tech-icons">
                        ${project.techs.map(tech => {
                            if (tech === "NodeJs") {
                                return `<i class="fa-brands fa-node-js"></i>`
                            } else if (tech === "NextJs") {
                                return `<img src="https://img.icons8.com/?size=100&id=yUdJlcKanVbh&format=png&color=000000">`
                            } else if (tech === "ReactJs") {
                                return `<i class="fa-brands fa-react"></i>`
                            } else if (tech === "TypeScript") {
                                return `<img src="https://img.icons8.com/?size=100&id=vMqgHSToxrJR&format=png&color=000000">`
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
    }).join("")
}
