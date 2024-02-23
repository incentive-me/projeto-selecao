import BalanceRepository from "../../infra/repository/balance.repository"
import { BalanceUseCase } from "../balance.usecase"

jest.mock("../../infra/repository/balance.repository")

export const userInfo = {
    id: 'a5dcb5d7-f74c-4d41-ac7c-dba6bf54be2f',
    email: 'oseias@valioze.com.br',
    iat: 1705089085,
    exp: 1705096285
  }

const balance = {
        "id": "2819c519-b515-4b6f-976d-2af0a8e54dec",
        "balanceName": "teste",
        "initialValue": 50,
        "valueUsed": 0,
        "totalValue": 50,
        "userId": "a5dcb5d7-f74c-4d41-ac7c-dba6bf54be2f",
        "description": "1234"
}

const RepoMock = BalanceRepository as jest.Mock<BalanceRepository>;
const usecase = balanceUseCase()

function balanceUseCase(){
    const BalanceRepository = new RepoMock() as jest.Mocked<BalanceRepository>
    const balanceUseCase = new BalanceUseCase(BalanceRepository)
    return balanceUseCase
}

describe("should create balance", () => {
    let amount: number

    it("should throw if balance name is empty", async () => {
        const t = usecase.CreateBalance(userInfo, "", 1000, "Descript")

        await expect(t).rejects.toThrow("Balance Name is required")
    })

    it("should throw if balance amount is empty", async ()=> {     
        const t = usecase.CreateBalance(userInfo, "Oséias", amount, "")
    
        await expect(t).rejects.toThrow("Balance Amount is required")
    })
})

// describe('Should get all balances', () => {
//     const balances: Balance[] = []
//     const usecase = balanceUseCase()

//     it('Should call GetAllBalances', async () => {
//         const t = await usecase.GetAllBalances(userInfo)

//         await expect(t).resolves.toBe(balances)
//     })
// })

describe('Should update balance Name', () => {
    let id: string

    it('Should more then 3 letters', async () => {
        const t = usecase.UpdateBalanceName(balance, "Ze")

        await expect(t).rejects.toThrow("The balance name is not valid")
    })

    it('Should have id', async ()=> {
        const t = usecase.UpdateBalanceName({...balance, id: id}, "Oseias")

        await expect(t).rejects.toThrow("Balance Id not found")
    })
})

describe('Should delete balance', () => {
    let id: string

    it("Should have id", async () => {
        const t = usecase.DeleteBalance(id)

        await expect(t).rejects.toThrow("Id not found")
    })
})

