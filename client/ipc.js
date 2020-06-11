const { ipcMain } = require('electron')
const { readFile } = require('./file')

function listen () {
    ipcMain.handle('message', async (event, args) => {
        const result = {
            status: true,
            data: ''
        }
        switch (args.type) {
            case 'readFile':
                try {
                    result.data = await readFile(args.params)
                } catch (e) {
                    result.status = false
                }
                break
        }
        return result
    })
}

module.exports = {
    listen
}