import express from 'express'
import { bugService } from './services/bug.service.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.static('public'))
app.use(cookieParser())
// app.get('/', (req, res) => res.send('Hello there'))
app.listen(3030, () => console.log('Server ready at port 3030'))

app.get('/api/bug', (req, res) => {
    let visitedBugs = req.cookies.visitedBugs || []
    bugService.query(visitedBugs)
        .then(bugs => {
            res.cookie('visitedBugs', bugs.map(bug => bug._id), { maxAge: 7 * 1000 })
            res.send(bugs)
        })
        .catch(err => {
            // loggerService.error('Cannot get bugs', err)
            // res.status(400).send('Cannot get bugs')
            res.status(401).send('Wait for a bit')
        })
})

app.get('/api/bug/save', (req, res) => {
    const bugToSave = {
        title: req.query.title,
        severity: +req.query.severity,
        description: req.query.description,
        _id: req.query._id
    }
    bugService.save(bugToSave)
        .then(bug => res.send(bug))
        .catch((err) => {
            // loggerService.error('Cannot save bug', err)
            res.status(400).send('Cannot save bug')
        })
})

app.get('/api/bug/:bugId', (req, res) => {

    const bugId = req.params.bugId
    console.log(bugId);
    bugService.getById(bugId)
        .then(bug => res.send(bug))
        .catch(err => {
            // loggerService.error(err)
            res.status(400).send('Cannot get bug')
        })
})

app.get('/api/bug/:bugId/remove', (req, res) => {
    console.log('delete....');
    const bugId = req.params.bugId
    bugService.remove(bugId)
        .then(() => res.send(bugId))
        .catch((err) => {
            // loggerService.error('Cannot remove bug', err)
            res.status(400).send('Cannot remove bug')
        })
})

const port = 3030
// app.listen(port, () =>
//     loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
// )
