import { useQuery } from "@tanstack/react-query";
import { PaymentValues } from "@/types/all";
import { fetchPayments } from "@/services/paymentService";

export const usePayments = () => {
  return useQuery<PaymentValues[], Error>({
    queryKey: ["payments"],
    queryFn: fetchPayments,
  });
};
