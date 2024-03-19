import fs from 'fs'

import { utilService } from "./utils.service.js";
import { log } from 'console';
export const bugService = {
    query,
    getById,
    remove,
    save
}

const bugs = utilService.readJsonFile('data/bug.json')

function query(filterBy) {
    let bugsToReturn = bugs
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        bugsToReturn = bugsToReturn.filter(bug => regex.test(bug.title))
    }
    if (filterBy.severity) {
        bugsToReturn = bugsToReturn.filter(bug => bug.severity >= filterBy.severity)
    }
    if (filterBy.labels) {
        console.log('im here', filterBy.labels);
        bugsToReturn = bugsToReturn.filter(bug =>bug.labels.includes(filterBy.labels))
    }
    
    return Promise.resolve(bugsToReturn)
}

function getById(id) {
    const bug = bugs.find(bug => bug._id === id)
    if (!bug) return Promise.reject('Bug does not exist!')
    return Promise.resolve(bug)
}

function remove(id) {
    const bugIdx = bugs.findIndex(bug => bug._id === id)
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile()

}

function save(bug) {
    console.log(bug);

    if (bug._id) {
        const bugIdx = bugs.findIndex(_bug => _bug._id === bug._id)
        bugs[bugIdx] = bug
    } else {
        bug._id = utilService.makeId()
        bug.createdAt = Date.now()
        bug.labels = utilService.createLabels()
        bugs.unshift(bug)
    }
    return _saveBugsToFile().then(() => bug)
}


function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs, null, 4)
        fs.writeFile('data/bug.json', data, (err) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            resolve()
        })
    })
}

/// if there is cookies
// let randomNum = utilService.getRandomIntInclusive(0, bugs.length - 4)
// let userBugs = bugs.slice(randomNum, randomNum + 3)
// let user = userBugs.filter((bug) => bug._id === bugsId[0] ||bug._id === bugsId[1]||bug._id === bugsId[2] )
// console.log(user);
// if (user.length) return Promise.reject('Wait for a bit')