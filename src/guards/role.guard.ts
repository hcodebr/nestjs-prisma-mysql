import {CanActivate,Injectable,ExecutionContext} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    )  {}

    async canActivate(context: ExecutionContext) {

      

        const requeridRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

        console.log({requeridRoles})

        if (!requeridRoles) {
            return true;
        }       
        
        const {user} = context.switchToHttp().getRequest();
        
        const rolesFilted = requeridRoles.filter(role => role === user.role);

        return rolesFilted.length > 0;

    }

}