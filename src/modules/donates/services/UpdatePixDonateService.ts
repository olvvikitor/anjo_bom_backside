import { createPayment, getPayments } from "@shared/services/Payment";
import DonateRepository from "../repositories/DonateRepository";
import { IDonateWithPix } from "../entities/DonateWithPix";
import AppError from "@shared/errors/AppError";

class UpdateStatusWhitPix {
  public async execute(): Promise<void> {
    const donateRepository = new DonateRepository();

    let allDonates = await donateRepository.findAll();
    if (allDonates) {
      allDonates.map((donates) =>
        getPayments(donates.id_pix as number)
          .then(async (donaterStatus) => {
            const donater = await donateRepository.findByIdPix(
              donates.id_pix as number
            );
            if (donater != null) {
              donater.status = donaterStatus.status as string;
            }
            await donateRepository.updateDonateWithPix(
              donater as IDonateWithPix
            );
          })
          .catch(console.error)
      );
    }
  }
}

export default UpdateStatusWhitPix;
