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

    update(key, updates) {
        if (!this.has(key)) {
            throw new Error(`Key '${key}' does not exist.`);
        }

        const currentValue = this.get(key);

        if (typeof currentValue !== 'object' || currentValue === null) {
            throw new Error(`Current value of key '${key}' is not an object.`);
        }

        // Функция для рекурсивного обновления вложенных объектов
        const mergeDeep = (target, source) => {
            for (const key of Object.keys(source)) {
                if (source[key] instanceof Object && key in target) {
                    Object.assign(source[key], mergeDeep(target[key], source[key]));
                }
            }
            return { ...target, ...source };
        };

        const updatedValue = mergeDeep(currentValue, updates);

        this.set(key, updatedValue);
    }
}

module.exports = new GlobalManager();
