class Query {
    constructor(route, query, page = 1, limit = 3, ...kwargs) {
        this.filters = {};
        this.filters_not = {}
        this.orderers = {};
        this.q = query;
        this.page = page;
        this.limit = limit;
        this.kwargs = kwargs;
        this.base_url = "https://trefle.io/api/v1";
        this.route = route;
        this.url = `${this.base_url}${this.route}`;
    }
  
    filter_(kwargs) {

        const filters = {};
        for (const [key, value] of Object.entries(kwargs)) {
            filters[key] = value;
        }
        this.filters = filters;
        console.log("filters :::", this.filters);
        return this;
      }

    filter_not(kwargs) {

        const filters_not = {};
        for (const [key, value] of Object.entries(kwargs)) {
            filters_not[key] = value;
        }
        this.filters_not = filters_not;
        console.log("filters_not :::", this.filters_not);
        return this;
    }
      
    order_by(kwargs) {
        const orderers = {}
        for (let [key, value] of Object.entries(kwargs)) {
            orderers[key] = value;
        }
        this.orderers = orderers
        return this;
    }
  
    build() {
        const params = { page: this.page };
        if (this.limit) {
            params.limit = this.limit;
        }
        if (this.q !== null) {
            params.q = this.q;
        }
        if (Object.keys(this.filters).length !== 0) {
            for (let [key, value] of Object.entries(this.filters)) {
            params[`filter[${key}]`] = value;
            }
        }
        if (Object.keys(this.filters_not).length !== 0) {
            for (let [key, value] of Object.entries(this.filters_not)) {
            params[`filter_not[${key}]`] = value;
            }
        }
        if (Object.keys(this.orderers).length !== 0) {
            for (let [key, value] of Object.entries(this.orderers)) {
            params[`order[${key}]`] = value;
            }
        }
        console.log("Filters", this.filters)
        console.log("Request Build finished}", params)
        return [this.url, params];
        }
  }
  
class TreffleAPIWrapper {
#token 
#base_url
constructor(token) {
        
    this.#base_url = "https://trefle.io/api/v1";
    this.#token = token;
}

async make_request(url, params) {
    const headers = { Authorization: `Bearer ${this.#token}` };
    try {
      const queryParams = new URLSearchParams(params);
      const urlWithQuery = `${url}?${queryParams}`;
      console.log(urlWithQuery)
      const response = await fetch(urlWithQuery, { method: "GET", headers });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(`Request failed with status code ${response.status}. Response content: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.log(error);
      return {};
    }
  }
  
    
}
  
class SearchSpecies extends Query {
constructor(query, page = 1, limit = 5, ...kwargs) {
    const route = "/species/search";
    super(route, query, page, limit, ...kwargs);
}
}

class SearchPlants extends Query {
constructor(query, page = 1, limit = 3, ...kwargs) {          
    const route = "/plants/search";
    super(route, query, page, limit, ...kwargs);
}
}

class GetItem extends Query {
constructor(query = null, page = 1, limit = 10, ...kwargs) {
    const route = "/plants";
    super(route, query, page, limit, ...kwargs);
}
}
document.addEventListener("DOMContentLoaded", () => {
  // Get client side token
  const token = document.getElementById("token-input").dataset["token"];
  console.log(token);

  const ResultGrid = document.getElementById("search-result-grid");
  const SearchInput = document.getElementById("search-input");

  SearchInput.addEventListener("submit", (event) => {
    event.preventDefault();
    const content = SearchInput.value;
    console.log("submitted here")
    console.log(content);

    // Build and send a GetItem request with the search input content as query
    const api = new TreffleAPIWrapper(token);
    const req = new GetItem(content, 1, 3).build();
    console.log(req);
    alert(req)

    api.make_request(req[0], req[1]).then((result) => {
      console.log(result);
      
      // Extract the content of each item in the result and structure it as follows for each item
      for (let i = 0; i < result.data.length; i++) {
        const item = result.data[i];
        const scientific_name = item.scientific_name;
        const family = item.family;
        const common_name = item.common_name;
        const image_url = item.image_url;

        // Create an article element
        const article = document.createElement("article");

        // Write the scientific_name in the head of the article
        const header = document.createElement("header");
        header.textContent = scientific_name;
        article.appendChild(header);

        // Create an image element with the image_url in the body of the article
        const img = document.createElement("img");
        img.src = image_url;
        article.appendChild(img);

        // Write a description with the 'family' and 'common_name' in the foot of the article
        const footer = document.createElement("footer");
        footer.textContent = `Family: ${family}, Common name: ${common_name}`;
        article.appendChild(footer);

        ResultGrid.appendChild(article);
      }
    });
  });
});
