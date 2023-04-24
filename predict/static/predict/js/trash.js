
fetch('/predict/', {
    method: "POST",
    body: formData
}).then(response => response.json())
  .then(data => {
    console.log(data)
    const infos = JSON.parse(data['first_result'])
    img = new Image();
    img.src = infos.image_url
    divResultImages.appendChild(img)

    let prediction_html = "";
    let first_class_name;
    for (const [class_name, prediction_value] of Object.entries(data["prediction"])) {
        if (!first_class_name) {
            first_class_name = class_name;
            localStorage.setItem("current_class", first_class_name);
        }
        prediction_html += `<div role="button" tabindex="0" class='prediction_div'> <div >${class_name}</div>  <div>${parseFloat(prediction_value).toFixed(3)}</div> </div>`;
    }
    
    div_result_prediction.innerHTML = prediction_html;

    // Title 
    const  prediction_title = localStorage.getItem("current_class");
    div_result_title.innerHTML = `<h1> ${prediction_title} </h1>`;


    // InfosTable
    const name = `<tr><th scope='row'>Name</th><td> ${infos.name}</td></tr>`
    const scientific_name = `<tr><th scope='row'>Scientific Name</th><td> ${infos.scientific_name}</td></tr>`
    const family = `<tr><th scope='row'>Family</th><td> ${infos.family}</td></tr>`
    const biblio = `<tr><th scope='row'>Bibliography</th><td> ${infos.bibliography}</td></tr>`
    const author = `<tr><th scope='row'>Bibliography Autor</th><td> ${infos.author}</td></tr>`
    const synonyms = `<tr><th scope='row'>Synonyms</th><td> ${infos.synonyms}</td></tr>`
    const genus = `<tr><th scope='row'>Genus</th><td> ${infos.genus}</td></tr>`

    InfosTableBody.innerHTML = `${name}${scientific_name}${family}${genus}${synonyms}${biblio}${author}`;
    InfosTable.appendChild(InfosTableBody);
    div_result_infos.appendChild(InfosTable);

    predictProgress.style.display = "none";
    divResultImages.style.display = `${divResultImagesStyle}`;
    FormArticle.style.display = "none" ;
    div_result_description.innerHTML = infos.wiki_description

});