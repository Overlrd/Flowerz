export function fetch_trefle_flowers(){
    return fetch("/search")
    .then (response => response.json())
    .then (data => {return data})
    .catch(error => {
        console.error('Error:', error);
    });
}