export default () => {
        /* eslint-disable-next-line no-restricted-globals */
        self.addEventListener('message', e => {
                const snapObj = e.data
                let pinNotes = {}
                let unpinNotes = {}
                if (snapObj !== undefined && snapObj !== null) {
                        Object.getOwnPropertyNames(snapObj).map((key) => {
                                if (snapObj[key].PinStatus === false && snapObj[key].Archive === false && snapObj[key].Trash === false) {
                                        unpinNotes[key] = snapObj[key]
                                }
                                else if (snapObj[key].PinStatus === true && snapObj[key].Archive === false && snapObj[key].Trash === false) {
                                        pinNotes[key] = snapObj[key]
                                }
                                return 0
                        })
                }
                /* eslint-disable-next-line no-restricted-globals */
                self.postMessage([pinNotes, unpinNotes])
        })
}

