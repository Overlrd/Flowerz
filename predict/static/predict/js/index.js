document.addEventListener('DOMContentLoaded', () => {
    const predictForm = document.getElementById("predict_form");
    const divResultImages = document.getElementById("div_result_images");
    const div_result_description = document.getElementById("div_result_description") ;
    const div_result_prediction = document.getElementById("div_result_prediction") ;
    const divResult = document.getElementById('div_result') ;
    const FormArticle = document.getElementById("form_article")
    const div_result_infos = document.getElementById("div_result_infos")
    const div_result_title = document.getElementById("div_result_title")
    const close_result_icon = document.getElementById("close-icon")
    const ResultLoading = document.getElementById("result_loading")

    let predictionDivs ;
    
    const InfosTable = document.createElement("table")
    InfosTable.setAttribute("data-theme","dark")
    const InfosTableBody = document.createElement("tbody")
    divResult.style.display = "none" ;


    history.pushState({'view': 'form' ,'flower':'','data':''}, '', '')


    function getFlowerData(flowerName) {
        const url = `/predict/flower/${flowerName}/${0}`;
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
        const url = `/predict/flower/${flowerName}/${1}`;
        return fetch(url, {

        })
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
        let hue = 120; 
    
        for (const [class_name, prediction_value] of Object.entries(predictions_infos)) {
            if (!first_class_name) {
                first_class_name = class_name;
                localStorage.setItem("current_class", first_class_name);
            }
    
            let prediction_percent = parseFloat(prediction_value);
            prediction_percent = (prediction_percent * 100).toFixed(2) + '%';
    
            prediction_html += `<div role="button" tabindex="0" class='prediction_div' style='background-color: hsl(${hue}, 60%, 70%); color: #000;'> <div style='color: black;'>${class_name}</div>  <div style='color: black;'>${prediction_percent}</div> </div>`;
            
            // reduce the hue by 20 for each subsequent div
            hue = (hue - 20) % 360;
        }
    
        div_result_prediction.innerHTML = prediction_html;
    }
    
    

    function CreateResultTable(class_infos){
        // Info Title 
        div_result_title.innerHTML = `<div><h1> ${class_infos.name} </h1></div>`;        
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
        let summary = class_infos.summary;
        
        if (summary.includes("== Description ==")) {
            const description = summary.split("== Description ==")[1].trim();
            summary = summary.split("== Description ==")[0].trim();
    
            div_result_description.innerHTML = summary;
            div_result_description.innerHTML += `<br><br><strong>Description:</strong> ${description}`;
        } else {
            div_result_description.innerHTML = summary;
        }

        div_result_title.innerHTML += `<div> <a href="${class_infos.link}">Wikipedia</a> </div>`

    }
    

    function set_display(elements , display){
        elements.forEach(element => {
            element.style.display = display
        })
    }


    window.onpopstate = function(event){
        console.log('popstate action ')
        console.log('loading back ', event.state.flower)
        FormArticle.style.display = "none";
        predictForm.style.display = "none";
        divResult.style.display = "flex";
        infos = event.state.data
        console.log(infos)
        if (event.state.view == 'prediction'){
        // create image and prediction percent divs 
        CreateResultImage(infos)
        CreateResultTable(infos)
        predictionDivs = document.querySelectorAll('.prediction_div');
        console.log(predictionDivs)
        ListenForPredictionClassesClick(predictionDivs)
        div_result_description.innerHTML = ''
        div_result_description.setAttribute('aria-busy','true')
        getWikiData(infos['scientific_name'])
        .then(wiki_data => {
            CreateDescription(wiki_data)  
            div_result_description.setAttribute('aria-busy','false')

        })
        }
        else{
            console.log("should pop to form ")
            set_display([divResult ,],'none')
            set_display([FormArticle, predictForm], 'flex')
        }

    }
    
    predictForm.addEventListener('submit', function(event){
        event.preventDefault();
        const formData = new FormData(this);

        set_display([predictForm,divResultImages], 'none')
        set_display([divResult, ], 'flex')
        ResultLoading.style.display = 'block'

        // get predicted data
        makePrediction(formData)
        .then(request_data => {
            console.log(request_data)

            const first_class_infos = JSON.parse(request_data['first_class_infos'])
            const predictions_infos = request_data['prediction']

            history.pushState({'view': 'prediction' ,'flower':first_class_infos['name'],'data':first_class_infos}, '', '')
            
            // create image and prediction percent divs 
            CreateResultImage(first_class_infos)
            CreateResultPercentDivs(predictions_infos)
            CreateResultTable(first_class_infos)
            predictionDivs = document.querySelectorAll('.prediction_div');
            console.log(predictionDivs)
            ListenForPredictionClassesClick(predictionDivs)

            div_result_description.setAttribute('aria-busy','true')
            getWikiData(first_class_infos['scientific_name'])
            .then(wiki_data => {
                CreateDescription(wiki_data)  
                div_result_description.removeAttribute('aria-busy')
            }) 
        })
        FormArticle.style.display = "none" ;
        ResultLoading.style.display = 'none'
        divResultImages.style.display = `block`;

        close_result_icon.addEventListener('click', function(){
            predictForm.reset()
            divResultImages.innerHTML = ''
            div_result_prediction.innerHTML = ''
            div_result_infos.innerHTML = ''
            div_result_title.innerHTML = ''
            div_result_description.innerHTML = ''

            divResult.style.display = "none";
            set_display([FormArticle, predictForm], 'flex');
    
        })
    });

    function ListenForPredictionClassesClick(prediction_divs){
        prediction_divs.forEach(predictionDiv => {
            predictionDiv.addEventListener('click', function(event) {
              const flower_name = event.target.querySelector(':first-child').textContent;
              console.log(flower_name);
              InfosTable.innerHTML = ''
              InfosTable.setAttribute('aria-busy','true')

              divResultImages.innerHTML = ''
              divResultImages.setAttribute('aria-busy','true')

              getFlowerData(flower_name)
              .then(class_data => {
                localStorage.setItem("current_class", class_data['name']);
                divResultImages.removeAttribute('aria-busy','false')
                CreateResultImage(class_data)
                InfosTable.removeAttribute('aria-busy','false')
                CreateResultTable(class_data)
                console.log("calling wiki description")

                history.pushState({'view': 'prediction','flower':class_data['name'],'data':class_data}, '', '')


                div_result_description.innerHTML = ''
                div_result_description.setAttribute('aria-busy','true')
                
                getWikiData(class_data['scientific_name'])
                .then(wiki_data => {
                    console.log(wiki_data)
                    CreateDescription(wiki_data)  
                    div_result_description.setAttribute('aria-busy','false')                    
                })
              })
            });
          });
            
    }


});
