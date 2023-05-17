async function fetch_flower_data(flower_name, to_return){
  return fetch(`flower/${flower_name}/${to_return}`)
  .then(response => response.json())
  .then(data => {
    return data
  })
  .catch(error => {
    console.error('Error: ', error)
  })
}

function make_prediction(formData) {
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


document.addEventListener('DOMContentLoaded', () => {
  const PredictForm = document.getElementById("predict_form");
  const Root = document.getElementById("main_container");

  PredictForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(PredictForm);
    
    make_prediction(formData).then((request_data) => {
      // Extract necessary data
      const first_predicted_class_name = request_data['first_class_name'];
      const predictions_results = request_data['prediction'];
      const predicted_images = request_data['img_urls'];
      
      // Log the extracted data
      console.log('First Predicted Class Name:', first_predicted_class_name);
      console.log('Predictions Results:', predictions_results);
      console.log('Predicted Images:', predicted_images);

      // get info 
      fetch_flower_data(first_predicted_class_name,to_return='all') .then((request_data) => {
        console.log(request_data)
      })
      
      // Create a div element and set its contents
      const resultDiv = document.createElement('div');
      resultDiv.innerHTML = `
        <p>First Predicted Class Name: ${first_predicted_class_name}</p>
        <p>Predictions Results: ${predictions_results}</p>
        <p>Predicted Images: ${predicted_images}</p>
      `;
      
      // Append the div element to the Root element
      Root.appendChild(resultDiv);
    });
  });
});
