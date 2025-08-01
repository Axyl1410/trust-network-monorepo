import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { Company } from './schemas/company.schema';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let mockCompanyModel: any;

  beforeEach(async () => {
    mockCompanyModel = {
      find: jest.fn(),
      findOne: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      countDocuments: jest.fn(),
      new: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: getModelToken(Company.name),
          useValue: mockCompanyModel,
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a company successfully', async () => {
      const createCompanyDto = {
        name: 'Test Company',
        description: 'Test Description',
        location: 'Test Location',
        website: 'https://test.com',
        admin: 'test_admin',
      };

      const mockCompany = {
        ...createCompanyDto,
        _id: 'test_id',
        totalComments: 0,
        totalRating: 0,
        exists: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock findOne to return null for both calls (name check and domain check)
      mockCompanyModel.findOne.mockResolvedValue(null);

      // Mock the constructor and save
      const mockInstance = {
        ...createCompanyDto,
        save: jest.fn().mockResolvedValue(mockCompany),
      };
      mockCompanyModel.new.mockReturnValue(mockInstance);

      const result = await service.create(createCompanyDto);

      expect(result).toEqual(mockCompany);
      expect(mockCompanyModel.findOne).toHaveBeenCalledTimes(2);
      expect(mockCompanyModel.new).toHaveBeenCalledWith(createCompanyDto);
    });
  });

  describe('search', () => {
    it('should search companies with keyword', async () => {
      const searchDto = { keyword: 'test', page: 1, limit: 10 };
      const mockCompanies = [
        {
          _id: 'test_id',
          name: 'Test Company',
          description: 'Test Description',
          location: 'Test Location',
          website: 'https://test.com',
          admin: 'test_admin',
          totalComments: 0,
          totalRating: 0,
          exists: true,
        },
      ];

      // Mock the find chain
      const mockFindChain = {
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockCompanies),
            }),
          }),
        }),
      };
      mockCompanyModel.find.mockReturnValue(mockFindChain);

      // Mock countDocuments to return a number
      mockCompanyModel.countDocuments.mockResolvedValue(1);

      const result = await service.search(searchDto);

      expect(result.companies).toEqual(mockCompanies);
      expect(result.pagination.total).toBe(1);
    });
  });

  describe('findAll', () => {
    it('should return all companies', async () => {
      const mockCompanies = [
        {
          _id: 'test_id',
          name: 'Test Company',
          description: 'Test Description',
          location: 'Test Location',
          website: 'https://test.com',
          admin: 'test_admin',
          totalComments: 0,
          totalRating: 0,
          exists: true,
        },
      ];

      mockCompanyModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockCompanies),
      });

      const result = await service.findAll();

      expect(result).toEqual(mockCompanies);
      expect(mockCompanyModel.find).toHaveBeenCalledWith({ exists: true });
    });
  });

  describe('findOne', () => {
    it('should return a company by id', async () => {
      const mockCompany = {
        _id: 'test_id',
        name: 'Test Company',
        description: 'Test Description',
        location: 'Test Location',
        website: 'https://test.com',
        admin: 'test_admin',
        totalComments: 0,
        totalRating: 0,
        exists: true,
      };

      mockCompanyModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockCompany),
      });

      const result = await service.findOne('test_id');

      expect(result).toEqual(mockCompany);
      expect(mockCompanyModel.findById).toHaveBeenCalledWith('test_id');
    });
  });
});
