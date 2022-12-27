import { IsJWT } from "class-validator";

export class AuthMeDTO {

    @IsJWT()
    token: string;

}