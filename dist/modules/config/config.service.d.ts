import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/lib/utils/validateShema';
export declare class AppConfigService {
    private readonly config;
    constructor(config: ConfigService<EnvironmentVariables>);
    get<K extends keyof EnvironmentVariables>(value: K): import("@nestjs/config").PathValue<EnvironmentVariables, K> | undefined;
}
