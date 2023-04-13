import AddressRepository from "../repositories/address";

class AddressService {
  private repository;

  constructor(repository: AddressRepository) {
    this.repository = repository;
  }

  findByClientId = async (id: number) => {
    return this.repository.findWhere({ clientId: { equals: id} });
  }
}

export default AddressService;