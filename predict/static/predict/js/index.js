document.addEventListener('DOMContentLoaded', () => {
    const predictProgress = document.getElementById("predict_progress");
    const predictForm = document.getElementById("predict_form");
    const divResultImages = document.getElementById("div_result_images");
    const div_result_description = document.getElementById("div_result_description") ;
    const div_result_prediction = document.getElementById("div_result_prediction") ;
    const divResult = document.getElementById('div_result') ;
    const FormArticle = document.getElementById("form_article")
    const div_result_infos = document.getElementById("div_result_infos")
    const div_result_title = document.getElementById("div_result_title")
    let predictionDivs ;
    
    const InfosTable = document.createElement("table")
    InfosTable.setAttribute("data-theme","dark")
    const InfosTableBody = document.createElement("tbody")
    predictProgress.style.display = "none";
    divResult.style.display = "none" ;

    function getFlowerData(flowerName) {
        const url = `/predict/flower/${flowerName}`;
        return fetch(url)
          .then(response => response.json())
          .then(data => {
            return data
          })
          .catch(error => {
            console.error(error);
          });
      }

    function getWikiData(flowerName){
        const url = `/flower/${flowerName}?wiki_only=true`;
        return fetch(url)
         .then(response => response.json())
         .then(data => {
            return data
        })
    }
    
      function makePrediction(formData) {
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
    
    

    function CreateResultImage(class_infos){
        img = new Image()
        img.src = class_infos.image_url
        divResultImages.innerHTML = ''
        divResultImages.appendChild(img)
    }

    function CreateResultPercentDivs(predictions_infos){
        let prediction_html = "";
        let first_class_name;
        for (const [class_name, prediction_value] of Object.entries(predictions_infos)) {
            if (!first_class_name) {
                first_class_name = class_name;
                localStorage.setItem("current_class", first_class_name);
            }
            prediction_html += `<div role="button" tabindex="0" class='prediction_div'> <div >${class_name}</div>  <div>${parseFloat(prediction_value).toFixed(3)}</div> </div>`;
        }
        div_result_prediction.innerHTML = prediction_html;
    }

    function CreateResultTable(class_infos){
        // Info Title 
        const  prediction_title = localStorage.getItem("current_class");
        div_result_title.innerHTML = `<h1> ${prediction_title} </h1>`;        
        // Infos Table
        const name = `<tr><th scope='row'>Name</th><td> ${class_infos.name}</td></tr>`
        const scientific_name = `<tr><th scope='row'>Scientific Name</th><td> ${class_infos.scientific_name}</td></tr>`
        const family = `<tr><th scope='row'>Family</th><td> ${class_infos.family}</td></tr>`
        const biblio = `<tr><th scope='row'>Bibliography</th><td> ${class_infos.bibliography}</td></tr>`
        const author = `<tr><th scope='row'>Bibliography Autor</th><td> ${class_infos.author}</td></tr>`
        const synonyms = `<tr><th scope='row'>Synonyms</th><td> ${class_infos.synonyms}</td></tr>`
        const genus = `<tr><th scope='row'>Genus</th><td> ${class_infos.genus}</td></tr>`
        InfosTableBody.innerHTML = `${name}${scientific_name}${family}${genus}${synonyms}${biblio}${author}`;
        InfosTable.appendChild(InfosTableBody);
        div_result_infos.appendChild(InfosTable);
    }

    function CreateDescription(class_infos){
        div_result_description.innerHTML = class_infos.wiki_description

    }
    
    predictForm.addEventListener('submit', function(event){
        event.preventDefault();
        const formData = new FormData(this);

        predictForm.style.display = "none";
        divResult.style.display = "flex" ;
        predictProgress.style.display = "block";
        divResultImages.style.display = "none";
        let divResultImagesStyle = ''


        // get predicted data
        makePrediction(formData)
        .then(request_data => {
            console.log(request_data)
            const first_class_infos = JSON.parse(request_data['first_class_infos'])
            const predictions_infos = request_data['prediction']
            // create image and prediction percent divs 
            CreateResultImage(first_class_infos)
            CreateResultPercentDivs(predictions_infos)
            CreateResultTable(first_class_infos)
            CreateDescription(first_class_infos)  
            predictionDivs = document.querySelectorAll('.prediction_div');
            console.log(predictionDivs)
            ListenForPredictionClassesClick(predictionDivs)

        })


    
        predictProgress.style.display = "none";
        divResultImages.style.display = `${divResultImagesStyle}`;
        FormArticle.style.display = "none" ;


    });

    function ListenForPredictionClassesClick(prediction_divs){
        prediction_divs.forEach(predictionDiv => {
            predictionDiv.addEventListener('click', function(event) {
              const flower_name = event.target.querySelector(':first-child').textContent;
              console.log(flower_name);
              getFlowerData(flower_name)
              .then(class_data => {
                localStorage.setItem("current_class", class_data['name']);
                CreateResultImage(class_data)
                CreateResultTable(class_data)
              })
            });
          });
            
    }


});
