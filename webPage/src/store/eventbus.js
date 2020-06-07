class EventEmitter {
    constructor() {
        this.event = {}
        this.noonFn = () => {}
    }

    emit(type) {
        const fns = this.event[type]
        if (Array.isArray(fns) && fns.length > 0) {
            this.event[type] = fns.map(async fn => {
                await fn.cb()
                if (fn.type === 'once') {
                    return undefined
                }
                return fn
            }).filter(fn => !!fn)
        }
    }

    on(type, fn, isOnce = false) {
        const store = this.event[type]
        const fnItem = typeof fn === 'function' ? { type: 'normal', cb: fn } : { type: 'normal', cb: this.noonFn }
        if (isOnce) {
            fnItem.type = 'once'
        }
        if (Array.isArray(store)) {
            store.push(fnItem)
        } else {
            this.event[type] = [fnItem]
        }
    }

    once (type, fn) {
        this.on(type, fn, true)
    }
}

export default new EventEmitter()