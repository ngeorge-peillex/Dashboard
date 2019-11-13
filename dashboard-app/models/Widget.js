class Widget {
    constructor(name, access_token, isConnected, isVisible) {
        this.name = name
        this.access_token = access_token || undefined
        this.isConnected = isConnected || false
        this.isVisible = isVisible || true
    }
}

export default Widget