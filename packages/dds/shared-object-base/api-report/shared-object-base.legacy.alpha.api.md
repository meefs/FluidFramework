## Alpha API Report File for "@fluidframework/shared-object-base"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @alpha @legacy (undocumented)
export interface IFluidSerializer {
    decode(input: unknown): unknown;
    encode(value: unknown, bind: IFluidHandle): unknown;
    parse(value: string): unknown;
    stringify(value: unknown, bind: IFluidHandle): string;
}

// @alpha @legacy
export interface ISharedObject<TEvent extends ISharedObjectEvents = ISharedObjectEvents> extends IChannel, IEventProvider<TEvent> {
    bindToContext(): void;
}

// @alpha @legacy
export interface ISharedObjectEvents extends IErrorEvent {
    // @eventProperty
    (event: "pre-op", listener: (op: ISequencedDocumentMessage, local: boolean, target: IEventThisPlaceHolder) => void): any;
    // @eventProperty
    (event: "op", listener: (op: ISequencedDocumentMessage, local: boolean, target: IEventThisPlaceHolder) => void): any;
}

// @alpha @legacy
export interface ISharedObjectKind<TSharedObject> {
    create(runtime: IFluidDataStoreRuntime, id?: string): TSharedObject;
    getFactory(): IChannelFactory<TSharedObject>;
}

// @alpha @legacy
export function makeHandlesSerializable(value: unknown, serializer: IFluidSerializer, bind: IFluidHandle): unknown;

// @alpha @legacy
export function parseHandles(value: unknown, serializer: IFluidSerializer): unknown;

// @alpha @legacy
export abstract class SharedObject<TEvent extends ISharedObjectEvents = ISharedObjectEvents> extends SharedObjectCore<TEvent> {
    constructor(id: string, runtime: IFluidDataStoreRuntime, attributes: IChannelAttributes,
    telemetryContextPrefix: string);
    getAttachSummary(fullTree?: boolean, trackState?: boolean, telemetryContext?: ITelemetryContext): ISummaryTreeWithStats;
    getGCData(fullGC?: boolean): IGarbageCollectionData;
    protected processGCDataCore(serializer: IFluidSerializer): void;
    // (undocumented)
    protected get serializer(): IFluidSerializer;
    summarize(fullTree?: boolean, trackState?: boolean, telemetryContext?: ITelemetryContext, incrementalSummaryContext?: IExperimentalIncrementalSummaryContext): Promise<ISummaryTreeWithStats>;
    protected abstract summarizeCore(serializer: IFluidSerializer, telemetryContext?: ITelemetryContext, incrementalSummaryContext?: IExperimentalIncrementalSummaryContext, fullTree?: boolean): ISummaryTreeWithStats;
}

// @alpha @legacy
export abstract class SharedObjectCore<TEvent extends ISharedObjectEvents = ISharedObjectEvents> extends EventEmitterWithErrorHandling<TEvent> implements ISharedObject<TEvent> {
    constructor(
    id: string,
    runtime: IFluidDataStoreRuntime,
    attributes: IChannelAttributes);
    protected abstract applyStashedOp(content: unknown): void;
    readonly attributes: IChannelAttributes;
    bindToContext(): void;
    connect(services: IChannelServices): void;
    get connected(): boolean;
    protected get deltaManager(): IDeltaManager<ISequencedDocumentMessage, IDocumentMessage>;
    protected didAttach(): void;
    protected dirty(): void;
    emit(event: EventEmitterEventType, ...args: any[]): boolean;
    abstract getAttachSummary(fullTree?: boolean, trackState?: boolean, telemetryContext?: ITelemetryContext): ISummaryTreeWithStats;
    abstract getGCData(fullGC?: boolean): IGarbageCollectionData;
    readonly handle: IFluidHandleInternal;
    id: string;
    // (undocumented)
    get IFluidLoadable(): this;
    initializeLocal(): void;
    protected initializeLocalCore(): void;
    isAttached(): boolean;
    load(services: IChannelServices): Promise<void>;
    protected abstract loadCore(services: IChannelStorageService): Promise<void>;
    protected readonly logger: ITelemetryLoggerExt;
    protected newAckBasedPromise<T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: unknown) => void) => void): Promise<T>;
    protected onConnect(): void;
    protected abstract onDisconnect(): void;
    // @deprecated
    protected abstract processCore(message: ISequencedDocumentMessage, local: boolean, localOpMetadata: unknown): void;
    protected processMessagesCore?(messagesCollection: IRuntimeMessageCollection): void;
    protected reSubmitCore(content: unknown, localOpMetadata: unknown): void;
    protected reSubmitSquashed(content: unknown, localOpMetadata: unknown): void;
    protected rollback(content: unknown, localOpMetadata: unknown): void;
    protected runtime: IFluidDataStoreRuntime;
    protected abstract get serializer(): IFluidSerializer;
    protected submitLocalMessage(content: unknown, localOpMetadata?: unknown): void;
    abstract summarize(fullTree?: boolean, trackState?: boolean, telemetryContext?: ITelemetryContext): Promise<ISummaryTreeWithStats>;
}

// @public @sealed
export interface SharedObjectKind<out TSharedObject = unknown> extends ErasedType<readonly ["SharedObjectKind", TSharedObject]> {
    is(value: IFluidLoadable): value is IFluidLoadable & TSharedObject;
}

// (No @packageDocumentation comment for this package)

```
