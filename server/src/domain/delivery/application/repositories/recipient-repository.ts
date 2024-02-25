import { Injectable } from "@nestjs/common";
import { Recipient } from "../../enterprise/entities/recipient";

@Injectable()
export abstract class RecipientRepository {
  abstract create(recipient : Recipient) : Promise<void>
  abstract update(recipient : Recipient) : Promise<void>
  abstract delete(id : string) : Promise<void>
  abstract getById(id : string) : Promise<Recipient>
  abstract getByDocumentNumber(documentNumber : string) : Promise<Recipient>
  abstract fetchAllRecipients() : Promise<Recipient[]>
}