import { HealthCheckStatus } from "./healthCheckStatus";

export interface CheckerInfo {
    name: string;
    status: HealthCheckStatus;
    message: string;
}

export interface HealthCheckInfo {
    status: HealthCheckStatus;
    message: string;
    checkers: CheckerInfo[];
}
