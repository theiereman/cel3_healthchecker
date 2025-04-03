export interface HealthCheckerMeta {
    [key: string]: unknown;
}

export interface HealthCheckerBase {
    name: string;
    checker_disabled: boolean;
    healthy: boolean;
    available: boolean;
    message: string;
    meta: HealthCheckerMeta;
}

export interface EdiCheckerMeta extends HealthCheckerMeta {
    last_edi: string;
    last_complete_edi: string;
}

export interface WorkerCheckerMeta extends HealthCheckerMeta {
    queue_growing: boolean;
    workers: number;
    processed: number;
    failed: number;
    enqueued: number;
    scheduled: number;
    retries: number;
    dead: number;
}

export interface GedCheckerMeta extends HealthCheckerMeta {
    adapter: string;
    enabled: boolean;
    temporary_disabled: boolean;
    server: string;
    port: number;
    message: string;
}

export interface FvaCheckerMeta extends HealthCheckerMeta {
    enabled: boolean;
    last_call: string;
}

export interface HealthCheckResponse {
    healthy: boolean;
    available: boolean;
    message: string;
    checkers_disabled: string;
    edi: HealthCheckerBase & { meta: EdiCheckerMeta };
    worker: HealthCheckerBase & { meta: WorkerCheckerMeta };
    ged: HealthCheckerBase & { meta: GedCheckerMeta };
    maintenance: HealthCheckerBase;
    key: HealthCheckerBase;
    fixuuidapi: HealthCheckerBase;
    fva: HealthCheckerBase & { meta: FvaCheckerMeta };
}
