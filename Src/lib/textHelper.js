export function isTextObject(input) {
    const regex = /text\-(\d{13})/gm;
    if (regex.exec(input)) {
        return true;
    }
    return false;
}

export function isShapeObject(input) {
    const regex = /shape\-(\d{13})/gm;
    if (regex.exec(input)) {
        return true;
    }
    return false;
}

export function isActiveFontStyle(value, obj) {
    if (!obj) {
        return false;
    }
    if (!obj.fontStyle) {
        return false;
    }
    if (!obj.fontStyle.includes(value)) {
        return false;
    }
    return true;
}

export function isActiveTextDecoration(value, obj) {
    if (!obj) {
        return false;
    }
    if (!obj.textDecoration) {
        return false;
    }
    if (!obj.textDecoration.includes(value)) {
        return false;
    }
    return true;
}

export function isActiveTextAlign(value, obj) {
    if (!obj) {
        return false;
    }
    if (!obj.align) {
        return false;
    }
    if (!obj.align.includes(value)) {
        return false;
    }
    return true;
}