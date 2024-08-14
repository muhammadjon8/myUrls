import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlModelRepository: Repository<Url>,
  ) {}

  async create(createUrlDto: CreateUrlDto) {
    try {
      const deliveryOrder =
        this.urlModelRepository.create(createUrlDto);
      return this.urlModelRepository.save(deliveryOrder);
    } catch (e) {
      return { error: e.message };
    }
  }

  async findAll() {
    return this.urlModelRepository.find();
  }

  async findOne(id: number) {
    try {
      const url = await this.urlModelRepository.findOne({
        where: { id },
      });
      if (!url) {
        throw new NotFoundException(`url with ID ${id} not found`);
      }
      return url;
    } catch (e) {
      return { error: e.message };
    }
  }

  async update(id: number, updateUrlDto: UpdateUrlDto) {
    try {
      await this.urlModelRepository.update({ id }, updateUrlDto);
      return this.findOne(id);
    } catch (e) {
      return { error: e.message };
    }
  }

  async remove(id: number) {
    const urlModelRepository = await this.findOne(id);
    if ('error' in urlModelRepository) {
      // DeliveryOrder not found, return the error
      return urlModelRepository;
    }
    return this.urlModelRepository.remove([urlModelRepository]);
  }
}
