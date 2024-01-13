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

    it("should throw if balance name is empty", async () => {
        const t = usecase.CreateBalance(userInfo, "", 1000, "Descript")

        await expect(t).rejects.toThrow("Balance Name is required")
    })

    it("should throw if balance amount is empty", async ()=> {     
        const t = usecase.CreateBalance(userInfo, "Oséias", amount, "")
    
        await expect(t).rejects.toThrow("Balance Amount is required")
    })

    it("Should create balance", async () => {
        const t = usecase.CreateBalance(userInfo, "Valioze", 1000, "")
        const id = jest.mock('uuid', ()=> ({v4: ()=> '123456789'}))

        await expect(t).resolves.toBe({
        "balanceName": "Valioze",
        "description": "",
        "id": "b5282f55-8e1a-42d6-a7a8-6f0dffea6b3c",
        "initialValue": 1000,
        "totalValue": 1000,
        "userId": "a5dcb5d7-f74c-4d41-ac7c-dba6bf54be2f",
        "valueUsed": 0,})
    })
})