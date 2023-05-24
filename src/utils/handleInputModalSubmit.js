import { predictImage } from "./PredictImage";
export const handleSubmit = (event, setFlowerData, setInputFormVisible, setModalFlowerVisible) => {
    event.preventDefault();
    
    // Retrieve CSRF token from the hidden field
    const csrfToken = document.getElementById('csrf_token').value;
    console.log(csrfToken);
  
    const formData = new FormData(event.target);
    formData.append('csrfmiddlewaretoken', csrfToken);
  
    // Find the submit input element
    const submitInputElement = event.target.querySelector('input[type="submit"]');
    
    if (submitInputElement) {
        // Create a new link element
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        linkElement.setAttribute('aria-busy', 'true');
        linkElement.textContent = 'Please wait…';
    
        // Replace the submit input with the link element
        submitInputElement.parentNode.replaceChild(linkElement, submitInputElement);
      }

    predictImage(formData).then(data => {
      // Update the state with the predicted data
      setFlowerData(data);
      setInputFormVisible(false);
      setModalFlowerVisible(true);
    });
  };
  