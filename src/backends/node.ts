import * as NodeHttp from "http";
import { Observable } from "rxjs/Observable";
import { ConnectionBackend, Connection } from "../interfaces";
import { Request } from "../static_request";
import { Response } from "../static_response";
import { ReadyState } from "../enums";
import { ResponseOptions } from "../response_options";

export class NodeConnection implements Connection {
  request: Request;
  response: Observable<Response>;
  readyState: ReadyState;
  constructor(req: Request, baseResponseOptions?: ResponseOptions) {
  }
}

export class NodeBackend implements ConnectionBackend {
  constructor(private _baseResponseOptions: ResponseOptions) {
  }

  createConnection(request: Request): NodeConnection {
    return new NodeConnection(request, this._baseResponseOptions);
  }
}