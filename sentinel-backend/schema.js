
const mongoose = require('mongoose');

const AIThreatTelemetrySchema = new mongoose.Schema({
  metadata: {
    timestamp: { type: Date, default: Date.now },
    session_id: { type: String, required: true },
    user_id: { type: String, default: "anonymous" }
  },
  attack_telemetry: {
    raw_input_snippet: { type: String, required: true },
    input_length_chars: { type: Number, required: true },
    shannon_entropy: { type: Number, required: true },
    matched_vectors: [{ type: String }],
    owasp_mapping: [{ type: String }]
  },
  mitigation_verdict: {
    anomaly_weight: { type: Number, required: true },
    verdict: { type: String, required: true },
    circuit_breaker_tripped: { type: Boolean, default: false },
    active_privileges_revoked: [{ type: String }]
  },
  performance_metrics: {
    execution_latency_ms: { type: Number, required: true },
    model_tokens_burned: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('ThreatTelemetry', AIThreatTelemetrySchema);

