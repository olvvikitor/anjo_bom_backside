export interface IPayment{
      createPayment(transaction_amount: number, description: string, payment_method_id: string, email: string) :Promise<any>
      getPayments(id: number): Promise<any>;
}