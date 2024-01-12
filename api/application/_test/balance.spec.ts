import { UserInfo } from "../../domain/user.entity"
import BalanceRepository from "../../infra/repository/balance.repository"
import { BalanceUseCase } from "../balance.usecase"

jest.mock("../../infra/repository/balance.repository")

export const userInfo = {
    id: 'a5dcb5d7-f74c-4d41-ac7c-dba6bf54be2f',
    email: 'oseias@valioze.com.br',
    iat: 1705089085,
    exp: 1705096285
  }

const RepoMock = BalanceRepository as jest.Mock<BalanceRepository>;

function balanceUseCase(){
    const BalanceRepository = new RepoMock() as jest.Mocked<BalanceRepository>
    const balanceUseCase = new BalanceUseCase(BalanceRepository)
    return balanceUseCase
}

describe("should create balance", () => {
    const usecase = balanceUseCase()
    let amount: number

    it("should throw if balance name is empty", async() => {
        let error
    
        try {
            await usecase.CreateBalance(userInfo, "", 1000, "Descript")
        } catch(err) {
            error = err
        }
    
        expect(error).toEqual("Balance Name is required")
    })

    it("should throw if balance amount is empty", async ()=> {
        let error 
        
        try {
            await usecase.CreateBalance(userInfo, "Oséias", amount, "")
        } catch(err) { 
            error = err
        }
        expect(error).toBe("Balance Amount is required")
    })
})