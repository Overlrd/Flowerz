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

            console.log(`headers : ${JSON.stringify(headers)}`);
            const queryParams = new URLSearchParams(params);
            const urlWithQuery = `${url}?${queryParams}`;
            const r = await fetch(urlWithQuery, { method: "GET", headers });
                        const data = await r.json();
            if (r.status === 200) {
                return data;
            } else {
                throw new Error(
                `Request failed with status code ${r.status}. Response content: ${JSON.stringify(data)}`
                );
            }
        } catch (e) {
            console.log(e);
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
  
  //const api = new TreffleAPIWrapper("fb7c8Funa_gZnYU5onH0Oj79uapv-vvUMZ9tDqU0JTo");
  //const req = new GetItem("Passion Flower").filter_({ genus: "Passiflora"}).order_by({year : "desc"}).filter_not({year : "null"}).build()
  //console.log(req)
  //api.make_request(req[0], req[1]).then(result => console.log(result));
  export { TreffleAPIWrapper , Query , GetItem , SearchPlants, SearchSpecies}