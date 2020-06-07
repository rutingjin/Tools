let IPC = {
    send () {
        return Promise.reject('current environment not support IPC')
    },
    on () {
        return Promise.reject('current environment not support IPC')
    }
}
if (process.env.NODE_ENV === 'production') {
    const { ipcRenderer } = require('electron')
    IPC = ipcRenderer
}


function IPCMessage () {
    const Info = {
        UserInfo: {},
        Token: {
            key: 'ZYBIPSCAS',
            value: ''
        },
        loginStatus: false
    }
    const Context = {
        login (token) {
            Info.Token.value = token
            IPC.send('SET-TOKEN', this.Token)
        },
        getUserInfo () {
            return new Promise((resolve, reject) => {
                if (Object.keys(Info.UserInfo).length === 0) {
                    reject()
                } else {
                    resolve(Info.UserInfo)
                }
            })
        },
        isLogin () {
            return Info.loginStatus
        }
    }
    IPC.on('SET-USER-INFO', (event, info) => {
        Info.loginStatus = true
        Info.UserInfo = info
    })

    IPC.on('TOKEN-EXPIRES', event => {
        Info.Token.value = ''
        Info.UserInfo = {}
        Info.loginStatus = false
    })
    return Context
}

export const Store = IPCMessage()