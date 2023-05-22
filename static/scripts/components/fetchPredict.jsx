const fetchPredict = ({ formData }) => {
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

export default fetchPredict