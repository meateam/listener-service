import * as grpc from 'grpc';
import apm from 'elastic-apm-node';
import config from '../config';
import { log, Severity } from './logger';
import { ApplicationError } from './errors/application.error';
import { statusToString, validateGrpcError } from './errors/grpc.status';

  /**
   * wraps all of the service methods, creating the transaction for the apm and the logger,
   * and sends them to the elastic server.
   * @param func - the method called and wrapped.
   */
export function wrapper(func: Function) :
  (call: grpc.ServerUnaryCall<Object>, callback: grpc.requestCallback<Object>) => Promise<void> {
  return async (call: grpc.ServerUnaryCall<Object>, callback: grpc.requestCallback<Object>) => {
    try {
      const traceparent: grpc.MetadataValue[] = call.metadata.get('elastic-apm-traceparent');
      const transOptions = (traceparent.length > 0) ? { childOf: traceparent[0].toString() } : {};
      apm.startTransaction(`/${config.service.name}/${func.name}`, 'request', transOptions);
      const traceID: string = getCurrTraceId();
      log(Severity.INFO, 'request', func.name, traceID);

      const res = await func(call, callback);
      apm.endTransaction(statusToString(grpc.status.OK));
      log(Severity.INFO, 'response', func.name, traceID);
      callback(null, res);
    } catch (err) {
      const validatedErr : ApplicationError = validateGrpcError(err);
      log(Severity.ERROR, func.name, err.message, getCurrTraceId());
      apm.endTransaction(validatedErr.name);
      callback(validatedErr);
    }
  };
}

export function getCurrTraceId() : string {
  try {
    return apm.currentTransaction ? apm.currentTransaction.traceparent.split('-')[1] : '';
  } catch (err) {
      // Should never get here. The log is set after apm starts.
    return '';
  }
}
