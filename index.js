const express = require("express")
const server = express();
const port = 4000;

const actionRouter = require("./api/actionRouter")
const projectRouter = require("./api/projectRouter")

server.use(express.json())

server.use("/actions", actionRouter)
server.use("/projects", projectRouter)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
