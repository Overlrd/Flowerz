function getFlowerById(id, data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        return data[i];
      }
    }
    return null; // Return null if flower with specified ID is not found
  }

  function BuildDialog(flower) {
    const dialog = document.getElementById('search-dialog');
    const header = dialog.querySelector('header');
    const closeIcon = header.querySelector('.close');
    const commonName = flower.common_name;
  
    // Set the common name in the existing header content
    const headerContent = header.querySelector('p');
    headerContent.innerHTML = `<strong>${commonName}</strong>`;

    // Build an image with the flower's image url
    const FlowerImg = new Image(200,200);
    FlowerImg.src = flower.image_url
    const imageDiv = dialog.querySelector('.dialog-img-div')
    imageDiv.innerHTML = ''
    imageDiv.append(FlowerImg)

    // build description
    const description_template = `${commonName} also called ${commonName} `    

  
    // Add the 'open' attribute to the dialog
    dialog.setAttribute('open', '');
  
    // Close the dialog when the close icon is clicked
    closeIcon.addEventListener('click', () => {
      dialog.removeAttribute('open');
    });
  }
  

document.addEventListener('DOMContentLoaded', () => {
    
    const StringextractedData = document.getElementById('hidden_extracted_data').dataset.extracted_data
    const ValidextractedData = StringextractedData.replace(/'/g, '"')
    const ArrayextrectedData = JSON.parse(ValidextractedData)

    document.querySelectorAll('.flower-card').forEach((card) => {
      card.addEventListener('click', () => {
        const flowerId = parseInt(card.querySelector('.flower-id').dataset.id);
        console.log(flowerId);
        const flower = getFlowerById(flowerId, ArrayextrectedData);
        if (flower) {
            console.log(flower);
            BuildDialog(flower);    
        } else {
            console.log('Flower not found');
          }
      });
    });
  });
