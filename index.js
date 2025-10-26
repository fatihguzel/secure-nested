export function safeGet(obj, path, defaultValue = undefined) {
    if (obj == null) {
        return defaultValue;
    }

    const keys = Array.isArray(path) ? path : path.split(".");

    let current = obj;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (key.startsWith("[") && key.endsWith("]")) {
            const index = parseInt(key.slice(1, -1));
            if (!Array.isArray(current) || isNaN(index)) {
                return defaultValue;
            }
            current = current[index];
        } else {
            current = current?.[key];
        }

        if (current == null) {
            return defaultValue;
        }
    }

    return current;
}

export function safeSet(obj, path, value, createMissing = true) {
    if (!obj || typeof obj !== "object") {
        return false;
    }

    const keys = Array.isArray(path) ? path : path.split(".");
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        if (key.startsWith("[") && key.endsWith("]")) {
            const index = parseInt(key.slice(1, -1));
            if (isNaN(index)) return false;

            if (!Array.isArray(current)) {
                if (!createMissing) return false;
                current[key] = [];
            }
            if (current[index] == null) {
                if (!createMissing) return false;
                current[index] = {};
            }
            current = current[index];
        } else {
            if (current[key] == null) {
                if (!createMissing) return false;
                current[key] = {};
            }
            current = current[key];
        }
    }

    const lastKey = keys[keys.length - 1];
    if (lastKey.startsWith("[") && lastKey.endsWith("]")) {
        const index = parseInt(lastKey.slice(1, -1));
        if (isNaN(index) || !Array.isArray(current)) return false;
        current[index] = value;
    } else {
        current[lastKey] = value;
    }

    return true;
}

export function safeDelete(obj, path) {
    if (!obj || typeof obj !== "object") {
        return false;
    }

    const keys = Array.isArray(path) ? path : path.split(".");

    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        if (key.startsWith("[") && key.endsWith("]")) {
            const index = parseInt(key.slice(1, -1));
            if (!Array.isArray(current) || isNaN(index)) return false;
            current = current[index];
        } else {
            current = current?.[key];
        }

        if (current == null) {
            return false;
        }
    }

    const lastKey = keys[keys.length - 1];
    if (lastKey.startsWith("[") && lastKey.endsWith("]")) {
        const index = parseInt(lastKey.slice(1, -1));
        if (!Array.isArray(current) || isNaN(index)) return false;
        current.splice(index, 1);
    } else {
        delete current[lastKey];
    }

    return true;
}

export function safeHas(obj, path) {
    if (obj == null) {
        return false;
    }

    const keys = Array.isArray(path) ? path : path.split(".");
    let current = obj;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (key.startsWith("[") && key.endsWith("]")) {
            const index = parseInt(key.slice(1, -1));
            if (!Array.isArray(current) || isNaN(index)) {
                return false;
            }
            current = current[index];
        } else {
            if (!(key in current)) {
                return false;
            }
            current = current[key];
        }

        if (current == null) {
            return false;
        }
    }

    return true;
}

export default safeGet;
