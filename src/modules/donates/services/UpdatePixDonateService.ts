import { IDonateWithPixRepository } from '../domain/repositories/IDonateWithPixRepository';
import { inject, injectable } from 'tsyringe';
import { IDonateWithPix } from '../domain/models/IDonateWithPix';
import { IPayment } from '@shared/domain/models/IPaymentService';

@injectable()
class UpdateStatusWhitPix {
  
  private donateRepository: IDonateWithPixRepository;
  private paymentService: IPayment;

  constructor(
    @inject('IDonateWithPixRepository')
    donateRepository: IDonateWithPixRepository,
    @inject('IPaymentService')
    paymentService: IPayment
  ){
    this.donateRepository = donateRepository;
    this.paymentService = paymentService;

  }
  public async execute(id: string): Promise<void> {

    let allDonates = await  this.donateRepository.findAll();
    if (allDonates) {
      allDonates.map((donates) =>
        this.paymentService.getPayments(donates.id_pix as number)
          .then(async (donaterStatus) => {
            const donater = await  this.donateRepository.findByIdPix(
              donates.id_pix as number
            );
            if (donater != null) {
              donater.status = donaterStatus.status as string;
            }
            await  this.donateRepository.updateDonateWithPix(donates._id,
              donater as IDonateWithPix
            );
          })
          .catch(console.error)
      );
    }
  }
}

export default UpdateStatusWhitPix;
