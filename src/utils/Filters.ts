class Filters {
  fromJsonToQuery(filters: { [key: string]: string }): string {
    let query = "";
    for (let key in filters) query += `${key}=${filters[key]}`;
    return query;
  }
}

const filtersService = new Filters();

export default filtersService;
