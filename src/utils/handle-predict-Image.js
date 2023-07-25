export function predictImage(formData){
    return fetch('/predict/', {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export async function fetch_flower_data(flower_name, to_return){
    return fetch(`/predict/flower/${flower_name}/${to_return}`)
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.error('Error: ', error)
    })
}