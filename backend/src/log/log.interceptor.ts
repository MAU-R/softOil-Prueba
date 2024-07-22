import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { LogService } from './log.service';
  
  @Injectable()
  export class LogInterceptor implements NestInterceptor {
    constructor(private logService: LogService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const method = request.method;
      const url = request.url;
  
      return next
        .handle()
        .pipe(
          tap(() =>
            this.logService.logActivity(`Method: ${method}, URL: ${url}`),
          ),
        );
    }
  }
  