const express = require("express")

const router = express.Router();
const actions = require("../data/helpers/actionModel")
// const projects = require("../data/helpers/projectModel")


router.get("/", (req, res, next) => {
  actions.get()
        .then((action) => {
            res.status(200).json(action)
        })
        .catch((error) => {
            next(error)
        })
});

router.get("/:id", validateActionId(), (req, res, next) => {
  actions.get(req.action.id)
    .then((action) => {
      res.status(200).json(action)
    })
    .catch((error) => {
      next(error)
    })
  
});

router.post("/", validateBody(),(req, res, next) => {
  actions.insert(req.body)
        .then((action) => {
            res.status(201).json(action)
        } )
        .catch((error) => {
            next(error);
        })
});

router.put("/:id", validateActionId(), (req, res, next) => {
  actions.update(req.params.id, req.body)
      .then((action) => {
        res.status(200).json(action)
      })
      .catch((error) => {
        next(error)
      })
});

router.delete("/:id", validateActionId(), (req, res, next) => {
  actions.remove(req.params.id)
    .then((action) => {
      res.status(200).json({message: "The action has been nuked"})
    })
    .catch((error) => {
      next(error)
    })
});



function validateActionId() {
    return (req, res, next) => {
      if (req.params.id) {
        actions.get(req.params.id)
          .then((action) => {
            if (action) {
              req.action = action;
              next();
            } else {
              res.status(400).json({message: "action not found"})
            }
        })
          .catch((error) => {
          next(error)
        })
      }
     
       
    }
  }
  

  function validateBody() {
    return (req, res, next) => {
      if (!req.body) {
        return res.status(400).json({ message: "missing post data" });
      }
      if (!req.body.notes || !req.body.description) {
        
        return res.status(400).json({ message: "missing required notes or description field" });
      }
      next();
    }
  }
  
  

  module.exports = router;