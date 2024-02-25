import { Injectable } from "@nestjs/common";
import { Admin } from "../../enterprise/entities/admin";

@Injectable()
export abstract class AdminRepository {
  abstract create(admin : Admin) : Promise<void>
  abstract update(admin : Admin) : Promise<void>
  abstract delete(id : string) : Promise<void>
  abstract getByDocumentNumber(documentNumber : string): Promise<Admin>
  abstract getByID(id : string) : Promise<Admin>
}