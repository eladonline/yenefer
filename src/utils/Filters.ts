import { ReadonlyURLSearchParams } from "next/navigation";

class Filters {
  fromJsonToQuery(filters: { [key: string]: string }): string {
    let query = "";
    for (let key in filters) query += `${key}=${filters[key]}`;
    return query;
  }
  fromMapToJson(filters: ReadonlyURLSearchParams) {
    const nextJson: { [key: string]: any[] } = {};
    filters.forEach((value, key) => {
      nextJson[key] = value.split(",");
    });
    return nextJson;
  }
}

const filtersService = new Filters();

export default filtersService;
