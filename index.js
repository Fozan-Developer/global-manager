class GlobalManager {
    constructor() {
        this._global = global;
    }

    set(key, value) {
        this._global[key] = value;
    }

    get(key) {
        return this._global[key];
    }

    has(key) {
        return this._global.hasOwnProperty(key);
    }

    delete(key) {
        if (this.has(key)) {
            delete this._global[key];
            return true;
        }
        return false;
    }

    clear() {
        Object.keys(this._global).forEach(key => {
            if (key !== 'global' && key !== 'process') {
                delete this._global[key];
            }
        });
    }
}

module.exports = new GlobalManager();
