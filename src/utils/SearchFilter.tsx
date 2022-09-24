interface ISearchFilter {
  data: any;
  query: string;
}
export const SearchFilter = ({data, query}: ISearchFilter) => {
  if (query) {
    return data.filter((item: any) => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().includes(query.toLowerCase());
      });
    });
  }
  return data;
};
