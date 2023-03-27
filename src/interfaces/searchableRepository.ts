import SearchCriteria from "../types/searchCriteria";
import Repository from "./repository";

export default interface SearchableRepository<T> extends Repository<T> {
  findWhere(searchCriteria: SearchCriteria<T>): Promise<T[]>;
}