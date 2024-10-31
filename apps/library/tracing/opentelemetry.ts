import { NodeSDK } from '@opentelemetry/sdk-node';
import { trace, context } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';

const sdk = new NodeSDK({
  traceExporter: new JaegerExporter({
    endpoint: 'http://localhost:14268/api/traces',  // Ensure this endpoint is correct for your setup
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
