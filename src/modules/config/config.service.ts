import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/lib/utils/validateShema';

/**
 * Servicio de configuración centralizada que proporciona acceso tipado
 * a las variables de entorno validadas mediante `ConfigService` de NestJS.
 * @link https://docs.nestjs.com/techniques/configuration
 */
@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService<EnvironmentVariables>) {}

  /**
   * Obtiene el valor de una variable de entorno de forma segura y con inferencia de tipos.
   *
   * @typeParam K - Clave de las variables definidas en `EnvironmentVariables`.
   * @param value - Nombre de la variable de entorno a recuperar.
   * @returns El valor de la variable, con el tipo inferido automáticamente.
   *
   * @example
   * const dbUrl = appConfigService.get('DATABASE_URL');
   */
  get<K extends keyof EnvironmentVariables>(value: K) {
    return this.config.get(value, { infer: true });
  }
}
