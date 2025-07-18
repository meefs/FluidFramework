## API Report File for "@fluidframework/bundle-size-tools"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

/// <reference types="node" />

import { Build } from 'azure-devops-node-api/interfaces/BuildInterfaces';
import type { CommentThreadStatus } from 'azure-devops-node-api/interfaces/GitInterfaces';
import { Compiler } from 'webpack';
import type JSZip from 'jszip';
import { jszip } from 'jszip';
import type { StatsCompilation } from 'webpack';
import { WebApi } from 'azure-devops-node-api';
import type Webpack from 'webpack';

// @public (undocumented)
export class ADOSizeComparator {
    constructor(
    adoConstants: IADOConstants,
    adoConnection: WebApi,
    localReportPath: string,
    adoBuildId: number | undefined,
    getFallbackCommit?: ((startingCommit: string) => Generator<string>) | undefined);
    createSizeComparisonMessage(tagWaiting: boolean): Promise<BundleComparisonResult>;
    static naiveFallbackCommitGenerator(startingCommit: string): Generator<string>;
}

// @public
export interface AggregatedChunkAnalysis {
    // (undocumented)
    dependencies: ChunkSizeInfo[];
    // (undocumented)
    name: string;
    // (undocumented)
    size: number;
}

// @public (undocumented)
export interface BannedModule {
    moduleName: string;
    reason: string;
}

// @public
export class BannedModulesPlugin {
    constructor(options: BannedModulesPluginOptions);
    // (undocumented)
    apply(compiler: Webpack.Compiler): void;
}

// @public (undocumented)
export interface BannedModulesPluginOptions {
    // (undocumented)
    bannedModules: BannedModule[];
}

// @public
export interface BundleBuddyConfig {
    chunksToAnalyze: ChunkToAnalyze[];
}

// @public (undocumented)
export interface BundleBuddyConfigProcessorOptions {
    // (undocumented)
    metricNameProvider?: (chunk: ChunkToAnalyze) => string;
}

// @public
export class BundleBuddyConfigWebpackPlugin {
    constructor(config: BundleBuddyPluginConfig);
    // (undocumented)
    apply(compiler: Compiler): void;
}

// @public (undocumented)
export interface BundleBuddyPluginConfig {
    // (undocumented)
    bundleBuddyConfig: BundleBuddyConfig;
    // (undocumented)
    outputFileName: string;
}

// @public
export interface BundleComparison {
    // (undocumented)
    bundleName: string;
    // (undocumented)
    commonBundleMetrics: {
        [key: string]: {
            baseline: BundleMetric;
            compare: BundleMetric;
        };
    };
}

// @public
export type BundleComparisonResult = {
    message: string;
    comparison: BundleComparison[] | undefined;
};

// @public (undocumented)
export interface BundleFileData {
    // (undocumented)
    bundleName: string;
    // (undocumented)
    relativePathToConfigFile: string | undefined;
    // (undocumented)
    relativePathToStatsFile: string;
}

// @public
export interface BundleMetric {
    // (undocumented)
    parsedSize: number;
}

// @public
export type BundleMetricSet = Map<string, BundleMetric>;

// @public
export function bundlesContainNoChanges(comparisons: BundleComparison[]): boolean;

// @public
export type BundleSummaries = Map<string, BundleMetricSet>;

// @public (undocumented)
export interface ChunkSizeInfo {
    // (undocumented)
    chunkId: number | string;
    // (undocumented)
    size: number;
}

// @public
export interface ChunkToAnalyze {
    // (undocumented)
    name: string;
}

// @public
export function compareBundles(baseline: BundleSummaries, compare: BundleSummaries): BundleComparison[];

// @public
export function decompressStatsFile(buffer: Buffer): StatsCompilation;

// @public
export const DefaultStatsProcessors: WebpackStatsProcessor[];

// @public (undocumented)
export interface EntryStatsProcessorOptions {
    // (undocumented)
    metricNameProvider?: (chunkName: string) => string;
}

// @public
export function getAllFilesInDirectory(sourceFolder: string, partialPathPrefix?: string): Promise<string[]>;

// @public (undocumented)
export function getAzureDevopsApi(accessToken: string, orgUrl: string): WebApi;

// @public
export function getBaselineCommit(): string;

// @public (undocumented)
export interface GetBuildOptions {
    // (undocumented)
    definitions: number[];
    // (undocumented)
    maxBuildsPerDefinition?: number;
    // (undocumented)
    project: string;
    // (undocumented)
    tagFilters?: string[];
}

// @public
export function getBuilds(adoConnection: WebApi, options: GetBuildOptions): Promise<Build[]>;

// @public
export function getBuildTagForCommit(commitHash: string): string;

// @public
export function getBundleBuddyConfigFileFromZip(jsZip: JSZip, relativePath: string): Promise<BundleBuddyConfig>;

// @public
export function getBundleBuddyConfigFromFileSystem(path: string): Promise<BundleBuddyConfig>;

// @public (undocumented)
export function getBundleBuddyConfigMap(args: GetBundleBuddyConfigMapArgs): Promise<Map<string, BundleBuddyConfig>>;

// @public (undocumented)
export interface GetBundleBuddyConfigMapArgs {
    // (undocumented)
    bundleFileData: BundleFileData[];
    // (undocumented)
    getBundleBuddyConfig: (relativePath: string) => Promise<BundleBuddyConfig>;
}

// @public
export function getBundleBuddyConfigProcessor(options: BundleBuddyConfigProcessorOptions): WebpackStatsProcessor;

// @public (undocumented)
export function getBundleFilePathsFromFolder(relativePathsInFolder: string[]): BundleFileData[];

// @public
export function getBundlePathsFromFileSystem(bundleReportPath: string): Promise<BundleFileData[]>;

// @public
export function getBundlePathsFromZipObject(jsZip: JSZip): BundleFileData[];

// @public (undocumented)
export function getBundleSummaries(args: GetBundleSummariesArgs): Promise<BundleSummaries>;

// @public (undocumented)
export interface GetBundleSummariesArgs {
    // (undocumented)
    bundlePaths: BundleFileData[];
    // (undocumented)
    getBundleBuddyConfigFile: (bundleName: string) => Promise<BundleBuddyConfig | undefined> | (BundleBuddyConfig | undefined);
    // (undocumented)
    getStatsFile: (relativePath: string) => Promise<StatsCompilation>;
    // (undocumented)
    statsProcessors: WebpackStatsProcessor[];
}

// @public
export function getChunkAndDependencySizes(stats: StatsCompilation, chunkName: string): AggregatedChunkAnalysis;

// @public
export function getChunkParsedSize(stats: StatsCompilation, chunkId: string | number): number;

// @public
export function getCommentForBundleDiff(bundleComparison: BundleComparison[], baselineCommit: string): string;

// @public
export function getEntryStatsProcessor(options: EntryStatsProcessorOptions): WebpackStatsProcessor;

// @public
export function getLastCommitHashFromPR(adoConnection: WebApi, prId: number, repoGuid: string): Promise<string | undefined>;

// @public (undocumented)
export function getPriorCommit(baseCommit: string): string;

// @public
export function getSimpleComment(message: string, baselineCommit: string): string;

// @public
export function getStatsFileFromFileSystem(path: string): Promise<StatsCompilation>;

// @public
export function getStatsFileFromZip(jsZip: JSZip, relativePath: string): Promise<StatsCompilation>;

// @public
export function getTotalSizeStatsProcessor(options: TotalSizeStatsProcessorOptions): WebpackStatsProcessor;

// @public
export function getZipObjectFromArtifact(adoConnection: WebApi, projectName: string, buildNumber: number, bundleAnalysisArtifactName: string): Promise<JSZip>;

// @public (undocumented)
export interface IADOConstants {
    // (undocumented)
    buildsToSearch?: number;
    // (undocumented)
    bundleAnalysisArtifactName: string;
    // (undocumented)
    ciBuildDefinitionId: number;
    // (undocumented)
    orgUrl: string;
    // (undocumented)
    prBuildDefinitionId?: number;
    // (undocumented)
    projectName: string;
    // (undocumented)
    projectRepoGuid?: string;
}

// @public (undocumented)
export class prCommentsUtils {
    constructor(collectionUrl: string, pullRequestId: number, repoId: string, accessToken: string);
    appendCommentToThread(message: string, threadType: string): Promise<void>;
    createOrReplaceThread(message: string, threadType: string | undefined): Promise<void>;
    createOrUpdateThread(message: string, threadType: string | undefined): Promise<void>;
    updateThreadStatus(threadType: string, commentThreadStatus: CommentThreadStatus): Promise<void>;
}

// @public (undocumented)
export const totalSizeMetricName = "Total Size";

// @public (undocumented)
export interface TotalSizeStatsProcessorOptions {
    // (undocumented)
    metricName: string;
}

// @public (undocumented)
export function unzipStream(stream: NodeJS.ReadableStream): Promise<jszip>;

// @public
export type WebpackStatsProcessor = (stats: StatsCompilation, config: BundleBuddyConfig | undefined) => BundleMetricSet | undefined;

// (No @packageDocumentation comment for this package)

```
