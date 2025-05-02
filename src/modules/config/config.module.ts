import { DynamicModule, Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';


/**
 * Módulo de configuración personalizado que extiende el `ConfigModule` de NestJS
 * y proporciona acceso tipado a variables de entorno a través del `AppConfigService`.
 * 
 * Este módulo está diseñado para ser registrado dinámicamente mediante `forRoot()`,
 * permitiendo una integración clara y reutilizable de la configuración de entorno.
 * 
 * @link https://docs.nestjs.com/fundamentals/dynamic-modules#dynamic-modules
 * @link https://docs.nestjs.com/techniques/configuration
 */
@Module({})
export class AppConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: AppConfigModule,
      imports: [ConfigModule],
      providers: [AppConfigService],
      exports: [AppConfigService],
    };
  }
}
