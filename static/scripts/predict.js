async function fetch_flower_data(flower_name, to_return){
    return fetch(`/predict/flower/${flower_name}/${to_return}`)
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
  

  function build_image(src,width,height){
    let Img = new Image(width, height)
    Img.src = src 
    return Img
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const PredictForm = document.getElementById("predict_form");
    const MainContainer = document.getElementById("main_container");
    const dialogElement = document.getElementById('rslt_modal')
  
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

        const ButtonGroup = document.createElement('div');
        ButtonGroup.setAttribute('role', 'group');
        ButtonGroup.style.width = '100%';   

        // Build modal
        for (const [key, value] of Object.entries(predictions_results)){
          const button = document.createElement('button');       
          button.textContent = key.split('-')[0];
          ButtonGroup.appendChild(button)
        }

        // build header buttons
        const headerElement = dialogElement.querySelector('header');
        headerElement.innerHTML = '';
        headerElement.appendChild(ButtonGroup);
        dialogElement.setAttribute('open', true);

        // add image and infobox
        const headImage = build_image(predicted_images[0],200,200)
        document.getElementById('head_image').innerHTML = "";
        document.getElementById('head_image').appendChild(headImage)

        // get info 
        fetch_flower_data(first_predicted_class_name,to_return='all') .then((request_data) => {
          console.log(request_data)

          const table = document.createElement('table');
          const thead = document.createElement('thead');
          const tbody = document.createElement('tbody');
          
          const theadRow = document.createElement('tr');
          const thScientific = document.createElement('th');
          thScientific.setAttribute('scope', 'col');
          thScientific.textContent = 'Scientific';
  
          const thClassification = document.createElement('th');
          thClassification.setAttribute('scope', 'col');
          thClassification.textContent = 'Classification';
  
          theadRow.appendChild(thScientific);
          theadRow.appendChild(thClassification);
          thead.appendChild(theadRow);
  
          for (const [key, value] of Object.entries(request_data.data.infobox_data)) {
            const tbodyRow = document.createElement('tr');
            const thScope = document.createElement('th');
            thScope.setAttribute('scope', 'row');
            thScope.textContent = key;
  
            const tdValue = document.createElement('td');
            tdValue.textContent = value;
  
            tbodyRow.appendChild(thScope);
            tbodyRow.appendChild(tdValue);
            tbody.appendChild(tbodyRow);
          }
  
          table.appendChild(thead);
          table.appendChild(tbody);
          console.log(table)
          document.getElementById("table_div").appendChild(table)

          document.getElementById("flower_p_name").innerHTML = first_predicted_class_name
          document.getElementById("wiki_desc").innerHTML = request_data.data.page_text
        
          // add wiki image 
          document.getElementById("wiki_img").appendChild(build_image(request_data.data.page_image,100,100))
          // add footer
          dialogElement.querySelector('footer').innerHTML = `<p>This content is from <a href="https://en.wikipedia.org/wiki/${request_data.name}">Wikipedia</a>.</p>`
        })
      });
    });
  });
