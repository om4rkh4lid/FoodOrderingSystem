import AddressRepository from "../repositories/address";

class AddressService {
  private repository;

  constructor(repository: AddressRepository) {
    this.repository = repository;
  }

  findByUserId = async (id: number) => {
    return this.repository.findWhere({ userId: { equals: id} });
  }
}

export default AddressService;