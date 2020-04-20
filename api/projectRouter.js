const express = require("express")

const router = express.Router();
const projects = require("../data/helpers/projectModel")

router.get('/', (req, res, next) => {
    projects.get()
        .then((project) => {
            res.status(200).json(project)
        })
        .catch((err) => {
            next(err);
        })
});

router.get('/:id', validateProjectId(), (req, res, next) => {
    projects.get(req.params.id)
        .then((project) => {
            res.status(200).json(project)
        })
        .catch((err) => {
            next(err);
        })
});

router.post('/', (req, res, next) => {
    projects.insert(req.body)
        .then((project) => {
            res.status(201).json(project)
        })
        .catch((err) => {
            nexr(err);
        })
});

router.put('/:id', validateProjectId(), (req, res, next) => {
    projects.update(req.params.id, req.body)
        .then((project) => {
            res.status(200).json(project)
        })
        .catch((err) => {
            next(err);
        })
});

router.delete('/:id', validateProjectId(), (req, res, next) => {
    projects.remove(req.params.id)
        .then((project) => {
            res.status(200).json({
                message: "The project has been nuked"
            })
        })
        .catch((err) => {
            next(err)
        })
});



function validateProjectId() {
    return (req, res, next) => {
        if (req.params.id) {
            projects.get(req.params.id)
                .then((project) => {
                    if (project) {
                        req.project = project;
                        next();
                    } else {
                        res.status(400).json({message: "project not found"})
                    }
                })
                .catch((err) => {
                    next(err);
                })
        }
    }
}

module.exports = router;