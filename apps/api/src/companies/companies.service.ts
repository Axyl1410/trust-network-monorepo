import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { SearchCompanyDto } from './dto/search-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    // Check if company with same name exists
    const existingCompany = await this.companyModel.findOne({
      name: { $regex: new RegExp(`^${createCompanyDto.name}$`, 'i') },
    });

    if (existingCompany) {
      throw new ConflictException('Company with this name already exists');
    }

    // Check if company with same website domain exists
    const domain = this.extractDomain(createCompanyDto.website);
    const existingCompanyByDomain = await this.companyModel.findOne({
      website: { $regex: new RegExp(domain, 'i') },
    });

    if (existingCompanyByDomain) {
      throw new ConflictException(
        'Company with this website domain already exists',
      );
    }

    const createdCompany = new this.companyModel(createCompanyDto);
    return createdCompany.save();
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find({ exists: true }).exec();
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyModel.findById(id).exec();
    if (!company || !company.exists) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async search(searchDto: SearchCompanyDto) {
    const { keyword, page = 1, limit = 10 } = searchDto;
    const skip = (page - 1) * limit;

    let query: any = { exists: true };

    if (keyword && keyword.trim()) {
      const keywordRegex = new RegExp(keyword.trim(), 'i');
      query = {
        ...query,
        $or: [
          { name: keywordRegex },
          { description: keywordRegex },
          { website: keywordRegex },
          { location: keywordRegex },
        ],
      };
    }

    const [companies, total] = await Promise.all([
      this.companyModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.companyModel.countDocuments(query),
    ]);

    return {
      companies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findByName(name: string): Promise<Company | null> {
    return this.companyModel.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      exists: true,
    });
  }

  async findByWebsite(website: string): Promise<Company | null> {
    const domain = this.extractDomain(website);
    return this.companyModel.findOne({
      website: { $regex: new RegExp(domain, 'i') },
      exists: true,
    });
  }

  async update(
    id: string,
    updateCompanyDto: Partial<CreateCompanyDto>,
  ): Promise<Company> {
    const company = await this.companyModel.findByIdAndUpdate(
      id,
      updateCompanyDto,
      { new: true },
    );

    if (!company || !company.exists) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async remove(id: string): Promise<void> {
    const company = await this.companyModel.findByIdAndUpdate(
      id,
      { exists: false },
      { new: true },
    );

    if (!company) {
      throw new NotFoundException('Company not found');
    }
  }

  private extractDomain(website: string): string {
    // Remove protocol
    let domain = website.replace(/^https?:\/\//, '');

    // Remove path and query parameters
    const parts = domain.split('/');
    domain = parts[0] || '';

    const queryParts = domain.split('?');
    domain = queryParts[0] || '';

    const hashParts = domain.split('#');
    domain = hashParts[0] || '';

    return domain.toLowerCase();
  }
}
