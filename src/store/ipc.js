const { ipcRenderer } = require('electron')

export function emit (type, data) {
    return new Promise((resolve, reject) => {
        ipcRenderer.invoke('message', {
            type,
            params: data
        }).then(data => {
            if (data.status === true) {
                resolve(data)
            } else {
                reject()
            }
        })
    })
}