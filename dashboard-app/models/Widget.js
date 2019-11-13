let config = require('../config')

export class Widget {
    constructor({ name, service, refreshRate, access_token, isConnected, isVisible }) {
        this.name = name
        this.refreshRate = refreshRate
        this.service = service
        this.access_token = access_token || undefined
        this.isConnected = isConnected || false
        this.isVisible = isVisible || true
    }
}

const widgets = (() => {
    let widgets = [];
    for (let [key, value] of Object.entries(config.services)) {
        for (let widget of value.widgets) {
            widgets.push(new Widget({ name: widget, service: key, refreshRate: value.refreshRate }))
        }
    }
    return widgets
})()

export default widgets