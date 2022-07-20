const { Resource } = require("@opentelemetry/resources")
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node")
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions")
const { DtSpanExporter, DtSpanProcessor, DtTextMapPropagator, DtSampler } = require("@dynatrace/opentelemetry-core")

const provider = new NodeTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "My Service",
    }),
    sampler: new DtSampler(),
    // ...other configurations
});

const exporter = new DtSpanExporter();
const processor = new DtSpanProcessor(exporter);
provider.addSpanProcessor(processor);
provider.register({
    propagator: new DtTextMapPropagator(),
    // ...other configurations
});

const { startActiveHttpSpan, endHttpSpanAndFlush } = require('@dynatrace/opentelemetry-gcf');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = async (req, res) => {
    await startActiveHttpSpan(req, async (span) => {
        let error;
        try {
            console.log(span);
        } catch (e) {
            error = e;
        }

        // status should be set before span ends
        res.status(error != null ? 500 : 200);
        /**
         * Span must be ended and flushed before handler sends response.
         * This limitiation comes from GCF, for details see:
         * https://cloud.google.com/functions/docs/concepts/nodejs-runtime#signal-termination
         */
        await endHttpSpanAndFlush(span, res, error);
        res.send("hello world");
    });
};

