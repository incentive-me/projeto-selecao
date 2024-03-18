"use client";

// IMPORTS
import { ReactNode, createContext, useContext, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

// SERVICES
import { getUserCookie } from "@/services/session";
import { BalanceProps } from "@/@types/balance.type";
import { db } from "@/services/firebase";
import { usePayment } from "./PaymentContext";

// COMPONENTS
import { toast } from "@/components/ui/use-toast";

interface BalanceContextData {
  isLoading: boolean;
  isOpenDelete: boolean;
  isOpenEdit: boolean;

  balances: BalanceProps[];
  balanceForId: BalanceProps | null;

  setIsLoading: (value: boolean) => void;
  setIsOpenDelete: (value: boolean) => void;
  setIsOpenEdit: (value: boolean) => void;

  handleResetStateBalance: () => void;
  getBalanceByUserId: () => void;
  getBalanceById: (documentId: string) => Promise<boolean>;
  createBalance: (value: BalanceProps) => Promise<boolean>;
  editBalance: (value: BalanceProps, documentId: string) => Promise<boolean>;
  deleteBalanceById: (documentId: string) => Promise<boolean>;
}

const BalanceContext = createContext<BalanceContextData>({
  isLoading: false,
  isOpenEdit: false,
  isOpenDelete: false,

  balances: [],
  balanceForId: null,

  setIsLoading: () => {},
  setIsOpenDelete: () => {},
  setIsOpenEdit: () => {},

  handleResetStateBalance: () => {},

  getBalanceByUserId: () => {},
  getBalanceById: () => Promise.resolve(false),
  createBalance: () => Promise.resolve(false),
  editBalance: () => Promise.resolve(false),
  deleteBalanceById: () => Promise.resolve(false),
});

function BalanceProvider({ children }: { children: ReactNode }) {
  const { getPaymentById } = usePayment();
  const userCookie = getUserCookie();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [balances, setBalances] = useState<BalanceProps[]>([]);
  const [balanceForId, setBalanceForId] = useState<BalanceProps | null>(null);

  async function getBalanceByUserId() {
    try {
      setIsLoading(true);

      const balancesCollectionRef = collection(db, "balances");
      const querySnapshot = await getDocs(balancesCollectionRef);

      const formatBalance: BalanceProps[] = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          const balance: BalanceProps = {
            documentId: doc.id,
            initialValue: data.initialValue,
            remainingValue: data.remainingValue,
            name: data.name,
            description: data.description,
            userId: data.userId,
            usedValue: data.initialValue - data.remainingValue,
          };

          return balance;
        })
        .filter((bal) => bal.userId === userCookie?.uid);
      setIsLoading(false);
      setBalances(formatBalance);
    } catch (error) {
      setIsLoading(false);
      setBalances([]);
    }
  }

  async function getBalanceById(docId: string) {
    try {
      setIsLoading(true);

      const docRef = doc(db, "balances", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const balance = {
          ...docSnap.data(),
          documentId: docSnap.id,
          initialValue: docSnap
            .data()
            .initialValue.toString()
            .replace(".", ","),
        } as BalanceProps;
        setBalanceForId(balance);
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        setBalanceForId(null);
        return false;
      }
    } catch (error) {
      setIsLoading(false);
      setBalanceForId(null);
      return false;
    }
  }

  async function createBalance(balance: BalanceProps): Promise<boolean> {
    try {
      const balancesCollectionRef = collection(db, "balances");
      const docSnap = await addDoc(balancesCollectionRef, balance);
      const newBalance = {
        ...balance,
        documentId: docSnap.id,
      };

      setBalances([newBalance, ...balances]);
      toast({
        title: "Sucesso: saldo registro .",
        description: "O saldo foi cadastrado com sucesso!",
      });
      return true;
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Aviso: erro ao registro o saldo.",
        description:
          "Não foi possivel registrar o saldo. Tente novamente mais tarde.",
      });
      return false;
    }
  }

  async function editBalance(
    updatedData: BalanceProps,
    documentId: string
  ): Promise<boolean> {
    try {
      const docRef = doc(db, "balances", documentId);
      await updateDoc(docRef, updatedData as { [key: string]: any });

      setBalances((currentBalance) =>
        currentBalance.map((item) =>
          item.documentId === updatedData.documentId ? { ...updatedData } : item
        )
      );

      toast({
        title: "Sucesso: Saldo autalizado",
        description: "O saldo foi atualizado com sucesso!",
      });

      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Aviso: Erro ao atualizar.",
        description: "Não foi possível atualizar o saldo.",
      });

      return false;
    }
  }

  async function deleteBalanceById(documentId: string): Promise<boolean> {
    try {
      const balance = balances.find((bal) => bal.documentId === documentId);
      const idPayment = balance?.documentId ?? "";
      const isPayment = await checkIdBalance(idPayment);

      if (!isPayment) {
        const docRef = doc(db, "balances", documentId);
        await deleteDoc(docRef);

        setBalances((currentBalances) =>
          currentBalances.filter((balance) => balance.documentId !== documentId)
        );
        toast({
          title: "Sucesso",
          description: "O saldo foi excluído com sucesso!",
        });

        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Aviso: Não foi possível excluir o saldo ",
          description:
            "Esse saldo nao pode ser excluido. No momento ele está em uso.",
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Alerta: Erro ao excluir",
        description: "Não foi possível excluir o saldo.",
      });

      return false;
    }
  }

  async function checkIdBalance(idBalance: string): Promise<boolean> {
    const docRef = collection(db, "payments");
    const q = query(docRef, where("idBalance", "==", idBalance));
    const querySnapshot = await getDocs(q);
    const hasDocuments = !querySnapshot.empty;

    return hasDocuments;
  }

  function handleResetStateBalance() {
    setBalances([]);
    setBalanceForId(null);
  }

  return (
    <BalanceContext.Provider
      value={{
        isLoading,
        isOpenEdit,
        isOpenDelete,

        balances,
        balanceForId,

        setIsOpenDelete,
        setIsLoading,
        setIsOpenEdit,

        handleResetStateBalance,
        getBalanceByUserId,
        getBalanceById,
        createBalance,
        editBalance,
        deleteBalanceById,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

const useBalance = () => useContext(BalanceContext);

export { BalanceProvider, useBalance };
