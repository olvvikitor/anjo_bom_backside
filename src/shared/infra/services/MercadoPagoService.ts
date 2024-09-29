import { IPayment } from '@shared/domain/models/IPaymentService';
import { MercadoPagoConfig, Payment } from 'mercadopago';

export class MercadoPagoService implements IPayment {
  private client: MercadoPagoConfig;
  private payment: Payment;
  constructor() {

    const accessToken = process.env.ACCESS_TOKEN as string;
    this.client = new MercadoPagoConfig({
      accessToken: accessToken,
      options: {
        timeout: 5000
      },
    });
    this.payment = new Payment(this.client)
  }
  async createPayment(transaction_amount: number, description: string, payment_method_id: string, email: string) {
    const body = {
      transaction_amount,
      description,
      payment_method_id,
      payer: {
        email,
      },
    };
    //Retorna o id do pedido para fazer as consultas necessarias posteriormente 
    const paymentData = await this.payment.create({ body }).then(p => p.id).catch(console.error);

    return paymentData;
  }

  async getPayments(id: number) {
    const paymentData = await this.payment.get({
      id: id
    })
    return paymentData;
  }
}

