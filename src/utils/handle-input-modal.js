import { predictImage } from "./handle -predict-Image";
import { fetch_flower_data } from "./handle -predict-Image";
export const handleSubmit = (event, setFlowerData, setInputFormVisible, setModalFlowerVisible) => {
    event.preventDefault();
    
    // Retrieve CSRF token from the hidden field
    const csrfToken = document.getElementById('csrf_token').value;
  
    const formData = new FormData(event.target);
    formData.append('csrfmiddlewaretoken', csrfToken);
  
    // Find the submit input element
    const submitInputElement = event.target.querySelector('input[type="submit"]');
    
/*     
    if (submitInputElement) {
        // Create a new link element
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        linkElement.setAttribute('aria-busy', 'true');
        linkElement.textContent = 'Please wait…';
    
        // Replace the submit input with the link element
        submitInputElement.parentNode.replaceChild(linkElement, submitInputElement);
      }
 */

    predictImage(formData).then(BasicData => {
      // Update the state with the predicted data
      // Reset the form inputs
      event.target.reset();
      setFlowerData(BasicData);
      setInputFormVisible(false);
      setModalFlowerVisible(true);

  
      const flowerRequestName = BasicData['first_class_name'].split('-')[1] || BasicData['first_class_name'].split('-')[0];
      fetch_flower_data(flowerRequestName, '*').then(additionalData => {
        // Update the state with the additional data
        console.log(additionalData)
        setFlowerData(BasicData => ({
          ...BasicData,
            additionalData
        }));
    });
  });
};