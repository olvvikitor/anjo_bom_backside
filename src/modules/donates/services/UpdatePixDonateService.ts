import { getPayments } from "@shared/services/Payment";
import { IDonateWithPixRepository } from '../domain/repositories/IDonateWithPixRepository';
import { inject, injectable } from 'tsyringe';
import { IDonateWithPix } from '../domain/models/IDonateWithPix';

@injectable()
class UpdateStatusWhitPix {
  private donateRepository: IDonateWithPixRepository;

  constructor(@inject('IDonateWithPixRepository')
    donateRepository: IDonateWithPixRepository){
    this.donateRepository = donateRepository;
  }
  public async execute(id: string): Promise<void> {

    let allDonates = await  this.donateRepository.findAll();
    if (allDonates) {
      allDonates.map((donates) =>
        getPayments(donates.id_pix as number)
          .then(async (donaterStatus) => {
            const donater = await  this.donateRepository.findByIdPix(
              donates.id_pix as number
            );
            if (donater != null) {
              donater.status = donaterStatus.status as string;
            }
            await  this.donateRepository.updateDonateWithPix(id,
              donater as IDonateWithPix
            );
          })
          .catch(console.error)
      );
    }
  }
}

export default UpdateStatusWhitPix;
