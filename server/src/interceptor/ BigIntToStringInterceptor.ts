import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BigIntToStringInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.convertBigIntToString(data)));
  }

  private convertBigIntToString(data: any): any {
    if (data instanceof Date) {
      return data;
    } else if (Array.isArray(data)) {
      return data.map((item) => this.convertBigIntToString(item));
    } else if (typeof data === 'object' && data !== null) {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          typeof value === 'bigint' ? value.toString() : this.convertBigIntToString(value),
        ]),
      );
    } else {
      return data;
    }
  }
}
