import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthenticateAdminUseCase } from "src/domain/delivery/application/use-cases/authenticate-admin";
import { z } from "zod";

const bodySchemaValidation = z.object({
  documentNumber : z.string(),
  password : z.string()
})

type bodyType = z.infer<typeof bodySchemaValidation>

@Controller('/session/admin/authenticate')
export class AuthtenticateAdminController {
  constructor(private authenticateAdmin : AuthenticateAdminUseCase ) {}

  @Post()
  @HttpCode(200)
  async handle(@Body() body : bodyType ) {
    const { documentNumber , password } = bodySchemaValidation.parse(body)
    const result = await this.authenticateAdmin.execute({ documentNumber , password })
    return result
  }
}