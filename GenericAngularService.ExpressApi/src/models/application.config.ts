export interface ApplicationConfig {
    port: string | number;
    controllers?: any[];
    middleware?: any[];
}