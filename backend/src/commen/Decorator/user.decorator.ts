import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
    (data : unknown , context : ExecutionContext)=>{
        const request = context.switchToHttp().getRequest();
        return request.user;
    }
)