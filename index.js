class GlobalManager {
    constructor() {
        this._global = global;
    }

    // Устанавливает значение по ключу
    set(key, value) {
        this._global[key] = value;
    }

    // Получает значение по ключу
    get(key) {
        return this._global[key];
    }

    // Проверяет наличие ключа
    has(key) {
        return this._global.hasOwnProperty(key);
    }

    // Удаляет значение по ключу
    delete(key) {
        if (this.has(key)) {
            delete this._global[key];
            return true;
        }
        return false;
    }

    // Очищает все ключи, кроме 'global' и 'process'
    clear() {
        Object.keys(this._global).forEach(key => {
            if (key !== 'global' && key !== 'process') {
                delete this._global[key];
            }
        });
    }

    // Частично обновляет объект по ключу
    update(key, updates) {
        if (!this.has(key)) {
            throw new Error(`Key '${key}' does not exist.`);
        }
        
        const currentValue = this.get(key);

        if (typeof currentValue !== 'object' || currentValue === null) {
            throw new Error(`Current value of key '${key}' is not an object.`);
        }

        const updatedValue = { ...currentValue, ...updates };

        this.set(key, updatedValue);
    }
}

module.exports = new GlobalManager();
