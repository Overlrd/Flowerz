import { fetch_flower_data } from "./handle-predict-Image";

export function handleSearchSubmit(event, setSearchResultData, setSearchResultsVisible){
    event.preventDefault()
    const searchTerm = event.target.querySelector('input[type="search"]').value;
    fetch(`/search/query/${searchTerm}`)
    .then ( response => response.json())
    .then (data => {console.log(data); setSearchResultData(data);  setSearchResultsVisible(true)})
    .catch(error => {
        console.error('Error:', error);
    });}

    export function handleSearchItemClick(
        event,
        setFlowerData,
        setSearchResultsVisible,
        setModalFlowerVisible
      ) {
        const inputElement = event.currentTarget.querySelector('input[type="hidden"]');
        const slug = inputElement.dataset.slug;
        const name = inputElement.dataset.name;
        const imageUrl = inputElement.dataset.imageUrl;
      
        fetch_flower_data(slug, "all").then(additionalData => {
          // Structure the data object to match the expected format in ModalFlowerCard
          const data = {
            first_class_name: name,
            img_urls: [imageUrl], // Assuming img_urls is an array of image URLs
            additionalData:  additionalData  // Wrap additionalData inside an object
          };
      
          setFlowerData(data);
          setSearchResultsVisible(false);
          setModalFlowerVisible(true);
          console.log(data);
        });
      }
      