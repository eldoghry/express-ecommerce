import { ObjectLiteral, Repository } from "typeorm";
import { ProductEntity } from "../database/entity/product.entity";
import { useTypeORM } from "../database/typeorm";

export class ProductService {
  repo: Repository<ObjectLiteral>;
  constructor() {
    this.repo = useTypeORM(ProductEntity);
  }

  getAll() {
    return this.repo.find();
  }
}
