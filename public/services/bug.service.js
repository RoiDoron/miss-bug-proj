

import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'
const BASE_URL = '/api/bug/'


export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter
}


function query(filterBy) {
    return axios.get(BASE_URL)
        .then(res => res.data)
        .then(bugs => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                bugs = bugs.filter(bug => regex.test(bug.title))
            }
            if (filterBy.severity) {
                bugs = bugs.filter(bug => bug.severity >= filterBy.severity)
            }
            console.log(bugs);

            return bugs
        })
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)
        .catch(err => {
            console.log('err:', err)
        })
}

function remove(bugId) {
    return axios.get(BASE_URL + bugId + '/remove')
        .then(res => res.data)
}

function save(bug) {
    console.log(bug._id);

    const url = BASE_URL + 'save'
    let queryParams = `?title=${bug.title}&severity=${bug.severity}&description=${bug.description}&`
    if (bug._id) {
        queryParams += `_id=${bug._id}`
    }
    return axios.get(url + queryParams).then(res => res.data)

}




function _createBugs() {
    let bugs = utilService.loadFromStorage(STORAGE_KEY)
    if (!bugs || !bugs.length) {
        bugs = [
            {
                title: "Infinite Loop Detected",
                severity: 4,
                _id: "1NF1N1T3",
                description: "very serious bug"
            },
            {
                title: "Keyboard Not Found",
                severity: 3,
                _id: "K3YB0RD",
                description: "very serious bug"
            },
            {
                title: "404 Coffee Not Found",
                severity: 2,
                _id: "C0FF33",
                description: "very serious bug"
            },
            {
                title: "Unexpected Response",
                severity: 1,
                _id: "G0053",
                description: "very serious bug"
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, bugs)
    }



}

function getDefaultFilter() {
    return { title: '', severity: 0 }
}