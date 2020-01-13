import firebase from './FirebaseConfig'
const uid = localStorage.getItem('uid')

export function setNotesIntoFirebase(noteTitle, noteContent, pinStatus, archive) {

    firebase.database().ref('/users/' + uid + '/Notes/').push({
        Title: noteTitle,
        Content: noteContent,
        PinStatus: pinStatus,
        Archive: archive,
        Trash: false,
        BgColor: '#ffffff',
        ReminderDate: null,
        ReminderTime: null
    })
}

export function getNotes(callback) {
    const ref = firebase.database().ref('/users/' + uid + '/Notes/')
    ref.on('value', (snapshot) => {
        callback(snapshot.val())
    })
}

export function getArchivedNotes(callback) {
    const ref = firebase.database().ref('/users/' + uid + '/Notes/').orderByChild('Archive').equalTo(true)
    ref.on('value', (snapshot) => {
        callback(snapshot.val())
    })
}

export function getTrashNotes(callback) {
    const ref = firebase.database().ref('/users/' + uid + '/Notes/').orderByChild('Trash').equalTo(true)
    ref.on('value', (snapshot) => {
        callback(snapshot.val())
    })
}

export function deleteNotesdata(key) {
    firebase.database().ref('/users/' + uid + '/Notes/' + key + '/').remove()
}

export function updatePinStatus(key, pinStatus) {
    firebase.database().ref('/users/' + uid + '/Notes/' + key + '/').update({
        PinStatus: pinStatus
    })
}

export function updateArchiveStatus(key, archive) {
    firebase.database().ref('/users/' + uid + '/Notes/' + key + '/').update({
        PinStatus: false,
        Archive: archive
    })
}

export function trashAndRestore(key, trashStatus) {
    firebase.database().ref('/users/' + uid + '/Notes/' + key + '/').update({
        PinStatus: false,
        Trash: trashStatus
    })
}

export function updateNotesIntoFirebase(key, title, content, pinStatus, archive) {
    firebase.database().ref('/users/' + uid + '/Notes/' + key + '/').update({
        Title: title,
        Content: content,
        PinStatus: pinStatus,
        Archive: archive
    })
}

export function updateBgColor(key, color) {
    firebase.database().ref('/users/' + uid + '/Notes/' + key + '/').update({
        BgColor: color
    })
}

export function addLabel(label) {
    firebase.database().ref('/users/' + uid + '/Labels/').push({
        Label: label
    })
}

export function getLabels(callback) {
    firebase.database().ref('/users/' + uid + '/Labels/').on('value', (snapshot) => {
        callback(snapshot.val())
    })
}

export function updateLabels(key, label) {
    firebase.database().ref('/users/' + uid + '/Labels/' + key + '/').update({
        Label: label
    })
}

export function deleteLabel(key) {
    firebase.database().ref('/users/' + uid + '/Labels/' + key + '/').remove()
}

export function addLabelsInNote(noteKey, labelKey, labelName) {
    firebase.database().ref('/users/' + uid + '/Notes/' + noteKey + '/NoteLabels/' + labelKey + '/').set({
        LabelName: labelName
    });
    firebase.database().ref('/users/' + uid + '/Labels/' + labelKey + '/LabeledNotes/').push({
        NoteId: noteKey
    })
}

export function removeLabelsInNote(noteKey, labelKey, labeledNoteKey) {
    firebase.database().ref('/users/' + uid + '/Notes/' + noteKey + '/NoteLabels/' + labelKey + '/').remove();
    firebase.database().ref('/users/' + uid + '/Labels/' + labelKey + '/LabeledNotes/' + labeledNoteKey + '/').remove()
}

export function getLabelsFromNote(noteKey, callback) {
    const ref = firebase.database().ref('/users/' + uid + '/Notes/' + noteKey + '/NoteLabels/')
    ref.on('value', (snapshot) => {
        callback(snapshot.val())
    })
}

export function setReminderDateTime(noteKey, date, time) {
    firebase.database().ref('/users/' + uid + '/Notes/' + noteKey + '/').update({
        ReminderDate: date,
        ReminderTime: time
    });
}

export function removeReminder(noteKey){
    firebase.database().ref('/users/' + uid + '/Notes/' + noteKey + '/').update({
        ReminderDate: null,
        ReminderTime: null
    })
}