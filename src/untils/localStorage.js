export function SetStorage(key, val) {

    window.localStorage.setItem(key, JSON.stringify(val))
}
export function GetStorage(key) {

    return window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : ''
}
export function ClearStorage(key) {

    key ? window.localStorage.removeItem(key) : window.localStorage.clear()

}