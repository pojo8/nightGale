export function getFromStorage(key) {
    if (!key) {
        console.error('no key supplied')

        return null;
    }

    try {
        const valueStr = localStorage.getItem(key);
        if (valueStr) {
            return JSON.parse(valueStr);
        }
        console.error('not found 2')

        return null;
    } catch (err){
        console.error('not found 2')
        return null;
    }
}

export function setInStorage( key, obj) {
    if (!key) {
        console.error('Error: key is missing');
    }

    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (err){
        console.error(err);
    }
}

export function clearStorage( key) {
    if (!key) {
        console.error('Error: key is missing');
    }

    try {
        localStorage.removeItem(key);
    } catch (err){
        console.error(err);
    }
}