class GlobalManager {
    constructor() {
        // Initialize with the global object
        this._global = global;
    }

    /**
     * Set a global variable with a specific key and value.
     * @param {string} key - The key under which the value will be stored.
     * @param {*} value - The value to be stored in the global object.
     */
    set(key, value) {
        this._global[key] = value;
    }

    /**
     * Retrieve the value of a global variable by its key.
     * @param {string} key - The key of the global variable to retrieve.
     * @returns {*} The value associated with the key.
     */
    get(key) {
        return this._global[key];
    }

    /**
     * Check if a global variable with the specified key exists.
     * @param {string} key - The key of the global variable to check.
     * @returns {boolean} True if the key exists, false otherwise.
     */
    has(key) {
        return this._global.hasOwnProperty(key);
    }

    /**
     * Delete a global variable by its key if it exists.
     * @param {string} key - The key of the global variable to delete.
     * @returns {boolean} True if the key was deleted, false if the key did not exist.
     */
    delete(key) {
        if (this.has(key)) {
            delete this._global[key];
            return true; // Successfully deleted
        }
        return false; // Key does not exist
    }

    /**
     * Clear all global variables except for 'global' and 'process'.
     * This method deletes all keys in the global object except for those with names 'global' and 'process'.
     */
    clear() {
        Object.keys(this._global).forEach(key => {
            // Avoid deleting built-in global properties
            if (key !== 'global' && key !== 'process') {
                delete this._global[key];
            }
        });
    }

    /**
     * Update a global variable's value with new properties.
     * @param {string} key - The key of the global variable to update.
     * @param {Object} updates - An object containing the properties to merge into the current value.
     * @throws {Error} If the key does not exist or if the current value is not an object.
     */
    update(key, updates) {
        // Ensure the key exists
        if (!this.has(key)) {
            throw new Error(`Key '${key}' does not exist.`);
        }

        const currentValue = this.get(key);

        // Ensure the current value is an object
        if (typeof currentValue !== 'object' || currentValue === null) {
            throw new Error(`Current value of key '${key}' is not an object.`);
        }

        // Recursive function to deeply merge objects
        const mergeDeep = (target, source) => {
            for (const key of Object.keys(source)) {
                // Recursively merge nested objects
                if (source[key] instanceof Object && key in target) {
                    Object.assign(source[key], mergeDeep(target[key], source[key]));
                }
            }
            // Combine target and source objects
            return { ...target, ...source };
        };

        // Get the updated value by merging current value and updates
        const updatedValue = mergeDeep(currentValue, updates);

        // Set the updated value
        this.set(key, updatedValue);
    }
}

// Export a single instance of GlobalManager
module.exports = new GlobalManager();
