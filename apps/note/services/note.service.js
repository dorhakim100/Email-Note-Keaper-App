import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'
// import { storageAsyncService } from '../../../services/async-storage.service.js'

export const NOTE_KEY = 'noteDB'

export const noteService = {
    notes,
    // query,
    // get,
    // remove,
    // save,

}

function notes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)

    if (!notes || notes.length === 0) {
        notes = [
            {
                id: utilService.makeId(),
                type: 'NoteTxt',
                style: { backgroundColor: '#b0c4de' },
                info: {
                    txt: utilService.makeLorem()
                }
            }
        ]
        storageService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}

// function query(filterBy = {}) {
//     return storageAsyncService.query(NOTE_KEY)
//         .then(notes => {
//             if (filterBy.txt) {
//                 const regExp = new RegExp(filterBy.txt, 'i')
//                 notes = notes.filter(note => regExp.test(note.type))
//             }
//             return notes
//         })
// }

// function get(noteId) {
//     return storageAsyncService.get(NOTE_KEY, noteId)
//         .then(note => {
//             return note
//         })
// }
//
// function remove(noteId) {
//     return storageAsyncService.remove(NOTE_KEY, noteId)
// }
//
// function save(note) {
//     if (note.id) {
//         return storageService.put(NOTE_KEY, note)
//     } else {
//         return storageService.post(NOTE_KEY, note)
//     }
// }
//
// note service
// const notes = [
//     {
//         id: 'n101',
//         createdAt: 1112222,
//         type: 'NoteTxt',
//         isPinned: true,
//         style: {
//             backgroundColor: '#00d'
//         },
//         info: {
//             txt: 'Fullstack Me Baby!'
//         }
//     },
//     {
//         id: 'n102',
//         type: 'NoteImg',
//         isPinned: false,
//         info: {
//             url: 'http://some-img/me',
//             title: 'Bobi and Me'
//         },
//         style: {
//             backgroundColor: '#00d'
//         }
//     },
//     {
//         id: 'n103',
//         type: 'NoteTodos',
//         isPinned: false,
//         info: {
//             title: 'Get my stuff together',
//             todos: [
//                 { txt: 'Driving license', doneAt: null },
//                 { txt: 'Coding power', doneAt: 187111111 }
//             ]
//         }
//     }
// ]

