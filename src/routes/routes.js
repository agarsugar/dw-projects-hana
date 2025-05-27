// Import modules
import express from "express";
import { getDurationDetail } from "../helpers/duration.js";
import pool from "../config/db.js";

const router = express.Router();

// Route Setup
router.get("/", home);
router.get("/home", home);
router.get("/contact", contact);
router.post("/contact", handleContact);
router.get("/projects", projects);
router.post("/projects", handleProjects);
router.get("/projects-detail/:id", projectsDetail);
router.get("/edit-project/:id", projectEdit);
router.post("/edit-project/:id", handlerProjectEdit);
router.post("/delete-project/:id", projectDeletion);

// Route Handlers
function home(req, res) {
    res.render("home");
}

function contact(req, res) {
    res.render("contact-me");
}

async function handleContact(req, res) {
    const { name, email, phone, selectSubject, messages } = req.body;
    
    if (!name || !email || !selectSubject || !messages) {
        return res.status(400).send("Mohon lengkapi semua data.");
    }

    const contactSubmitted = new Date().toISOString();
   
    const subjectMap = {
        "1": "Subject 1",
        "2": "Subject 2",
        "3": "Subject 3",
        "Subject 1": "Subject 1",
        "Subject 2": "Subject 2",
        "Subject 3": "Subject 3"
    };

    const realSubject = subjectMap[selectSubject] || null;

    if (!realSubject) {
        return res.status(400).send("Subject tidak valid");
    }

    try {
        await pool.query(
            `INSERT INTO contacts (name, email, "phoneNumber", "subjectSelect", messages)
            VALUES ($1, $2, $3, $4, $5)`,
            [name, email, phone, realSubject, messages]
        );

        console.log("\n======= New Contact Submission =======");
        console.log(`Name   : ${name}`);
        console.log(`Email : ${email}`);
        console.log(`Phone   : ${phone}`);
        console.log(`Submitted at   : ${new Date(contactSubmitted).toLocaleString()}`);
        console.log("\n======================================");
        
        res.redirect("/home");
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal insert data ke database");
    }
}

async function projects(req, res) {
    try {
        const result = await pool.query("SELECT * FROM projects ORDER BY id DESC");
        const projects = result.rows.map(project => {
            return {
                ...project,
                techs: project.techstack ? project.techstack.split(',') : []
            };
        });
        res.render("my-projects", { projects });
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal mengambil data project.");
    }
}

async function handleProjects(req, res) {
    const { projectName, startDate, endDate, projectDesc, techs } = req.body;

    if (!projectName || !startDate || !endDate || !projectDesc) {
        return res.status(400).send("Mohon lengkapi semua field yang diperlukan.");
    }

    const techArray = Array.isArray(techs) ? techs : [techs];
    const techString = techArray.join();

    const projectSubmitted = new Date().toISOString();
    const duration = getDurationDetail(startDate, endDate);

    try {
        await pool.query(
            `INSERT INTO projects (project_name, start_date, end_date, project_desc, techstack, duration)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [projectName, startDate, endDate, projectDesc, techString, duration]
        );
       
        console.log("\n======= New Project Submission =======");
        console.log(`Name   : ${projectName}`);
        console.log(`Start Date : ${startDate}`);
        console.log(`End Date   : ${endDate}`);
        console.log(`Project Technologies   : ${techArray}`);
        console.log(`Submitted at   : ${new Date(projectSubmitted).toLocaleString()}`);
        console.log("\n======================================");
       
        res.redirect("/projects");
    } catch (error) {
        console.error(error);
        res.status(500).send("Gagal insert data ke database.");
    }
}

async function projectsDetail(req, res) {
    const { id } = req.params;
    
    try {
        const result = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
        const project = result.rows[0];

        if (!project) {
            return res.status(404).send("Project not found");
        }
        
        project.techs = project.techstack ? project.techstack.split(',') : [];
        res.render("project-details", { project });
    } catch (err) {
        console.error(err);
        res.status(500).send("Gagal mengambil data project dari database.");
    }
}

async function projectEdit(req, res) {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
        const project = result.rows[0];

        if (!project) {
            return res.status(404).send('Project tidak ditemukan');
        }

        project.techs = project.techstack ? project.techstack.split(',') : [];
        res.render('edit-project', { project });
    } catch (err) {
        console.error('Gagal mengambil data untuk edit:', err);
        res.status(500).send('Error mengambil data project.');
    }
}

async function handlerProjectEdit(req, res) {
    const { id } = req.params;
    const { projectName, startDate, endDate, projectDesc, techs } = req.body;

    // if (!projectName || !startDate || !endDate || !projectDesc) {
    //     return res.status(400).send("Mohon lengkapi semua field yang diperlukan.");
    // }

   
    try {
        const techArray = Array.isArray(techs) ? techs : [techs];
        const techString = techArray.join();
        const duration = getDurationDetail(startDate, endDate);

        await pool.query(
            `UPDATE projects SET 
            project_name = $1, 
            start_date = $2, 
            end_date = $3, 
            project_desc = $4, 
            techstack = $5, 
            duration = $6
            WHERE id = $7`,
            [projectName, startDate, endDate, projectDesc, techString, duration, id]
        );

        res.redirect('/projects/${id}');
    } catch (err) {
        console.error('Gagal update project:', err);
        res.render('edit-project', {
            project: {
                id,
                project_name: projectName,
                start_date: startDate,
                end_date: endDate,
                project_desc: projectDesc,
                techs: Array.isArray(techs) ? techs : [techs]
            },
            error: 'Gagal update project'
        });
    }
}

// async function projectDeletion(req, res) {
//     try {
//         const result = await pool.query('DELETE FROM projects WHERE id', [req.params.id]);
        
//         if (result.rowCount === 0) {
//             return res.status(404).send('Project tidak ditemukan');
//         }

//         console.log('Deleted project:', result.rows[0]);
//         res.redirect('/projects');
//     } catch (err) {
//         console.error('Gagal menghapus project', err);
//         res.status(500).send('Error hapus project');
//     }
// }

async function projectDeletion(req, res) {
    const { id } = req.params;
    
    try {
        // Add proper column name in WHERE clause
        const result = await pool.query(
            'DELETE FROM projects WHERE id = $1 RETURNING *',
            [id]
        );
        
        if (result.rowCount === 0) {
            return res.status(404).send('Project not found');
        }
        
        console.log('Deleted project:', result.rows[0]);
        res.redirect('/projects');
    } catch (err) {
        console.error('Gagal menghapus project:', err);
        res.status(500).render('error', {
            message: 'Gagal menghapus project',
            error: err.message
        });
    }
}

export default router;