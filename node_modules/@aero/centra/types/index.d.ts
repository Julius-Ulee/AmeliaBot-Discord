/*
 * Typings for project `@aero/centra`
 *
 * Contributors:
 *    - Noel <cutie@floofy.dev>
 */

/* eslint-disable */

import { ServerResponse } from 'http';
import { URL } from 'url';

type HttpMethod =
	| 'OPTIONS'
	| 'CONNECT'
	| 'DELETE'
	| 'TRACE'
	| 'HEAD'
	| 'POST'
	| 'PUT'
	| 'GET'
	| 'PATCH';

declare function centra(url: string, method: HttpMethod): centra.Request;
declare namespace centra {
	class Request {
		constructor(url: string, method?: HttpMethod);

		readonly url: URL;
		readonly httpMethod: HttpMethod;
		readonly data: any;
		readonly sendDataAs: 'json' | 'buffer' | 'form' | null;
		readonly reqHeaders: Record<string, any>;
		readonly streamEnabled: boolean;
		readonly compressionEnabled: boolean;
		readonly ua: string;
		readonly coreOptions: any;

		public query(params: Record<string, any>): this;
		public query(name: string, value: string): this;
		public path(relativePath: string): this;
		public body(data: any, sendAs?: 'json' | 'buffer' | 'form'): this;
		public header(dict: Record<string, any>): this;
		public header(a1: string, a2: string): this;
		public method(method: HttpMethod): this;
		public timeout(timeout: number): this;
		public agent(ua: string): this;
		public json<T = any>(): Promise<T>;
		public raw(): Promise<Buffer>;
		public text(): Promise<string>;
		public send(): Promise<centra.Response>;
	}

	class Response {
		constructor(coreRes: ServerResponse);

		private readonly coreRes: ServerResponse;
		readonly body: Buffer;
		readonly headers: Record<string, string | string[]>;
		readonly statusCode: number;
		
		public get json(): Record<string, any>;
		public get text(): string;
	}
}

export = centra;
export as namespace centra;
