import { string } from 'joi';
import  {MercadoPagoConfig, Payment} from 'mercadopago';

const accessToken = process.env.ACCESS_TOKEN as string;

// Step 2: Initialize Mercado Pago SDK
const client = new MercadoPagoConfig({
  accessToken: accessToken,
  options: {
    timeout:5000
  },
});
const payment = new Payment(client)

export async function createPayment(transaction_amount: number, description: string, payment_method_id: string, email: string) {
  const body = {
    transaction_amount,
    description,
    payment_method_id,
    payer: {
      email,
    },
  };
    //Retorna o id do pedido para fazer as consultas necessarias posteriormente 
     const paymentData =  await payment.create({body}).then(p=>p.id).catch(console.error);

    return paymentData;
}
  export async function getPayments(id: number){
    const paymentData =  await payment.get({
      id:id
    })
    return paymentData;
  }

  // const paymentData =  await payment.create({body}).then(p=>p.point_of_interaction?.transaction_data).catch(console.error);
  
