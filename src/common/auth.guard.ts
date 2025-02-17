
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from '../admin/constants';
  import { Request } from 'express';
  import { Reflector } from '@nestjs/core';
  import { IS_PUBLIC_KEY } from 'src/common/excludeAuth';
import { AdminJwt } from 'src/admin/dto/admin.jwt';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
          if (isPublic) {
            // 💡 See this condition
            return true;
          }
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('验证失败,你没登录');
      }
      try {
        const payload = await this.jwtService.verifyAsync(// TODO:后端校验token过期，前端该如何做出反应
          token,
          {
            secret: jwtConstants.secret
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['admin'] = payload as AdminJwt;

      } catch {
        throw new UnauthorizedException('验证失败');
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  