import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const { description, name } = createProductDto;

    const product = this.productRepo.create({ name, description });

    return this.productRepo.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productRepo.findOne(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<void> {
    await this.productRepo.update(id, { ...updateProductDto });
  }

  async remove(id: number): Promise<void> {
    await this.productRepo.delete(id);
  }
}
