

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


function query(filterBy = getDefaultFilter()) {
    return axios.get(BASE_URL,{params:filterBy})
        .then(res => res.data)
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)
        .catch(err => {
            console.log('err:', err)
        })
}

function remove(bugId) {
    return axios.delete(BASE_URL + bugId).then(res => res.data)
}

function save(bug) {
    if (bug._id) {
        return axios.put(BASE_URL, bug)
    } else {
        return axios.post(BASE_URL, bug)
    }
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
    return { title: '', severity: 0,labels:'',sort:'' }
}
