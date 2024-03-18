import { getRepositoryToken } from '@nestjs/typeorm';
import { Balance } from './entities/balance.entity';
import { DataSource, Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { HttpException } from '@nestjs/common';

const balanceArray: CreateBalanceDto[] = [
  { name: 'Balance 1', description: 'Descricao 1', initialValue: 1000},
  { name: 'Balance 2', description: 'Descricao 2', initialValue: 5000},
  { name: 'Balance 3', description: 'Descricao 3', initialValue: 10000},
];

const oneBalance: CreateBalanceDto = { name: 'Balance 1', description: 'Descricao 1', initialValue: 1000};

const idTest: string = '696457c7-b6b6-4354-9659-504848c81cf4';

describe('BalanceService', () => {
  let service: BalanceService;
  let balanceRepository: Repository<Balance>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BalanceService,
        {
          provide: getRepositoryToken(Balance),
          useClass: Repository,
        },
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BalanceService>(BalanceService);
    balanceRepository = module.get<Repository<Balance>>(getRepositoryToken(Balance))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(balanceRepository).toBeDefined();
  });

  describe('should createBalance', () => {
    it('should successfully insert a balance', async () => {
  
      const newBalance = new Balance();
      newBalance.id = idTest;
      newBalance.name = oneBalance.name;
      newBalance.description = oneBalance.description;
      newBalance.initialValue = oneBalance.initialValue;
      newBalance.finalValue = oneBalance.initialValue;
  
      balanceRepository.create =  jest.fn().mockReturnValueOnce(newBalance);
      balanceRepository.save = jest.fn().mockResolvedValueOnce(newBalance);
  
      const result = await service.insertOne(oneBalance);
      expect(result.id).toEqual(newBalance.id);
      expect(result.name).toEqual(newBalance.name);
      expect(result.initialValue).toEqual(newBalance.initialValue);
      expect(result.finalValue).toEqual(newBalance.finalValue);
    });
  });

  describe('should find all balance', () => {
    it('should return an array of balances', () => {
      balanceRepository.find = jest.fn().mockResolvedValue(balanceArray);
      expect(service.findAll()).resolves.toEqual(balanceArray);
    });

    it('should find empty array', () => {
      balanceRepository.find = jest.fn().mockResolvedValue([]);
      service.findAll()
      .then()
      .catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Você não possui saldos');
        expect(error.status).toBe(404);
      });
    });
  });

  describe('should find a balance', () => {
    it('should get a single balance', () => {
      balanceRepository.findOneOrFail = jest.fn().mockReturnValueOnce(oneBalance);
      expect(service.findOne('uuid')).resolves.toEqual(oneBalance);
    });

    it('should get no balance', () => {
      balanceRepository.findOneOrFail = jest.fn().mockReturnValueOnce(null);
      service.findOne('a uuid')
      .then()
      .catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe('Saldos não encontrado');
        expect(error.status).toBe(404);
      });
    });
  });

  it('Should get an user ok', async () => {
    const id: string = '696457c7-b6b6-4354-9659-504848c81cf4';
  
    service.findOne = jest.fn().mockReturnValueOnce({ id, name: "Balance 1", description: 'Descricao 1', initialValue: 1000});

    const result = await service.findOne(id);
  
    expect(result.id).toEqual(id);
  });
   
});
