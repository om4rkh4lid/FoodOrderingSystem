export default interface Repository<T> {
  create(entity: T): Promise<T>;
  findById(id: any): Promise<T | null>;
  update(id: any, updates: any): Promise<T | null>;
  delete(id: any): Promise<void>;
  findAll(): Promise<T[]>;
}