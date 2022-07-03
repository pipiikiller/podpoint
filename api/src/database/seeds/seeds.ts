import { UnitStatus } from "../../types/entities/Unit";
import Charge from "../entities/Charge";
import Unit from "../entities/Unit";
import ChargeService from "../services/ChargeService";
import UnitService from "../services/UnitService";

export default class Seed {
    private chargeService: ChargeService;
    private unitService: UnitService;

    constructor() {
        this.chargeService = new ChargeService();
        this.unitService = new UnitService();
    }
    private async createFinishedCharge(): Promise<Charge> {
        const charge = new Charge();
        charge.started_at = new Date().toISOString();
        charge.finished_at = new Date().toISOString();

        const savedCharge = await this.chargeService.create(charge);

        return savedCharge;
    }

    private async createInUseCharge(): Promise<Charge> {
        const charge = new Charge();
        charge.started_at = new Date().toISOString();

        const savedCharge = await this.chargeService.create(charge);

        return savedCharge;
    }

    public async seed() {
        console.log(`-------------- Seeding Started --------------`);

        try {
            const unit1 = new Unit();
            unit1.status = UnitStatus.CHARGING;

            unit1.charges = [await this.createInUseCharge(), await this.createFinishedCharge()];

            const unit2 = new Unit();
            unit2.status = UnitStatus.CHARGING;
            unit2.charges = [
                await this.createFinishedCharge(),
                await this.createFinishedCharge(),
                await this.createInUseCharge(),
            ];

            const unit3 = new Unit();
            unit3.status = UnitStatus.AVAILABLE;
            unit3.charges = [await this.createFinishedCharge(), await this.createFinishedCharge()];

            await this.unitService.create(unit1);
            await this.unitService.create(unit2);
            await this.unitService.create(unit3);

            console.log(`-------------- Seeding Eneded --------------`);
        } catch (error) {
            throw new Error(error);
        }
    }
}
