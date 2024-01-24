export function fetchCode(): Promise<string> {
    return fetch('http://localhost:5000/code')
        .then(resp => resp.text())
}