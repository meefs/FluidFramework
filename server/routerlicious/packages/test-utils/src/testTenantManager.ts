/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import type { IUser, ScopeType } from "@fluidframework/protocol-definitions";
import { GitManager } from "@fluidframework/server-services-client";
import type {
	ITenant,
	ITenantManager,
	ITenantOrderer,
	ITenantStorage,
	IDb,
	ITenantConfig,
} from "@fluidframework/server-services-core";

import { TestDb } from "./testCollection";
import { TestHistorian } from "./testHistorian";

/**
 * @internal
 */
export class TestTenant implements ITenant {
	private readonly owner = "test";
	private readonly repository = "test";
	private readonly manager: GitManager;

	constructor(
		private readonly url: string,
		private readonly historianUrl: string,
		db: IDb,
	) {
		const testHistorian = new TestHistorian(db);
		this.manager = new GitManager(testHistorian);
	}

	public get gitManager(): GitManager {
		return this.manager;
	}

	public get storage(): ITenantStorage {
		return {
			historianUrl: this.historianUrl,
			internalHistorianUrl: this.historianUrl,
			credentials: {
				user: "test",
				password: "test",
			},
			owner: this.owner,
			repository: this.repository,
			url: this.url,
		};
	}

	public get orderer(): ITenantOrderer {
		return {
			type: "kafka",
			url: this.url,
		};
	}
}

/**
 * @internal
 */
export class TestTenantManager implements ITenantManager {
	private readonly tenant: TestTenant;

	constructor(url = "http://test", historian = "http://historian", testDb: IDb = new TestDb({})) {
		this.tenant = new TestTenant(url, historian, testDb);
	}

	public async createTenant(id?: string): Promise<ITenantConfig & { key: string }> {
		return {
			id: "test-tenant",
			storage: this.tenant.storage,
			orderer: this.tenant.orderer,
			key: "test-tenant-key",
			customData: {},
			enableSharedKeyAccess: true,
			enablePrivateKeyAccess: false,
		};
	}

	public async verifyToken(token: string): Promise<void> {}

	public async getTenant(id: string): Promise<ITenant> {
		return this.tenant;
	}

	public async getTenantGitManager(tenantId: string, documentId: string): Promise<GitManager> {
		return this.tenant.gitManager;
	}

	public async getKey(tenantId: string): Promise<string> {
		return "test";
	}

	public async signToken(
		tenantId: string,
		documentId: string,
		scopes: ScopeType[],
		user?: IUser,
		lifetime?: number,
		ver?: string,
		jti?: string,
		includeDisabledTenant?: boolean,
	): Promise<string> {
		throw new Error("Method not implemented.");
	}
}
