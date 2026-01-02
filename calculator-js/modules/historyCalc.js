const HISTORY_KEY = "calc_history";
const POINTER_KEY = "calc_pointer";

export function getHistory() {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
}

export function getPointer() {
    return Number(localStorage.getItem(POINTER_KEY)) || -1;
}

export function saveHistory(value) {
    const history = getHistory();
    let pointer = getPointer();

    // remove forward history if new calc happens
    history.splice(pointer + 1);

    history.push(value);
    pointer++;

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    localStorage.setItem(POINTER_KEY, pointer);
}

export function moveHistory(step) {
    let history = getHistory();
    let pointer = getPointer();

    pointer += step;

    if (pointer < 0 || pointer >= history.length) return null;

    localStorage.setItem(POINTER_KEY, pointer);
    return history[pointer];
}
