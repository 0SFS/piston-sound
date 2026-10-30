import type { EngineAcousticDefinition } from "@0sfs/engine-sound/definition";
import { JET_ACOUSTIC_PROFILE_FIELDS, PISTON_ACOUSTIC_PROFILE_FIELDS, type PistonAcousticProfile } from "@0sfs/engine-sound/legacyProfile";
export { PISTON_ACOUSTIC_PROFILE_FIELDS, ACOUSTIC_PROFILE_FIELDS } from "@0sfs/engine-sound/legacyProfile";
export type { PistonAcousticProfile } from "@0sfs/engine-sound/legacyProfile";
export function pistonProfileValues(definition: EngineAcousticDefinition): number[] {
  if (definition.engineClass !== "piston" || definition.rendererId !== "procedural-piston-v1"
    || !definition.parameters || typeof definition.parameters !== "object") throw new Error("Missing procedural piston parameters");
  const parameters = definition.parameters as Record<string, unknown>;
  const values = PISTON_ACOUSTIC_PROFILE_FIELDS.map(field => {
    const value = parameters[field];
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 100_000) throw new Error(`Invalid procedural piston parameter ${field}`);
    return value;
  });
  const at = (field: keyof PistonAcousticProfile) => values[PISTON_ACOUSTIC_PROFILE_FIELDS.indexOf(field)];
  if (!Number.isInteger(at("cylinders")) || at("cylinders") < 1 || at("cylinders") > 16
    || ![2, 4].includes(at("strokeCycle")) || !Number.isInteger(at("propellerBlades"))
    || at("propellerBlades") < 1 || at("propellerBlades") > 8 || at("ratedRpm") < 100
    || at("ratedRpm") > 10_000 || at("ratedPowerHp") < 1 || at("pistonCockpitGain") > 1
    || at("pistonCockpitHz") < 20 || at("pistonCockpitHz") > 20_000) throw new Error("Invalid procedural piston reference range");
  if (["firingGain", "propellerGain", "mechanicalGain", "exhaustNoiseGain", "propellerNoiseGain", "pistonOutputGain"]
    .some(field => at(field as keyof PistonAcousticProfile) > 16)) throw new Error("Invalid procedural piston gain range");
  return [...JET_ACOUSTIC_PROFILE_FIELDS.map(() => 0), 1, ...values];
}
