import Criteria from "./criteria";

type SearchCriteria<T> = {
  [P in keyof T]?: Criteria<T[P]>;
}

export default SearchCriteria;