const Project = require('../models/project-model')

createProject = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a project',
        })
    }
    
    const project = new Project(body)

    if (!project) {
        return res.status(400).json({ success: false, error: err })
    }

    project
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: project._id,
                message: 'Project created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Project not created!',
            })
        })
}

updateProject = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Project.findOne({ _id: req.params.id }, (err, project) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Project not found!',
            })
        }
        project.name = project.name
        project.link = project.link
        project.image = project.image
        project
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: project._id,
                    message: 'Project updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Project not updated!',
                })
            })
    })
}

deleteProject = async (req, res) => {
    await Project.findOneAndDelete({ _id: req.params.id }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `Project not found` })
        }

        return res.status(200).json({ success: true, data: project })
    }).catch()
}

getProjectById = async (req, res) => {
    await Project.findOne({ _id: req.params.id }, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!project) {
            return res
                .status(404)
                .json({ success: false, error: `Project not found` })
        }
        return res.status(200).json({ success: true, data: project })
    }).catch(err => handleInvalid())
}

getProjects = async (req, res) => {
    
    await Project.find({}, (err, project) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!project.length) {
            return res
                .status(404)
                .json({ success: false, error: `Project not found` })
        }
        return res.status(200).json({ success: true, data: project })
    }).catch(err => console.log(err))
}

handleInvalid = () => {
    console.log('Hi');
}

module.exports = {
    createProject,
    updateProject,
    deleteProject,
    getProjects,
    getProjectById,
}