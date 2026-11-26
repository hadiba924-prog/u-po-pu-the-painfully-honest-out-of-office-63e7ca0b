// The Painfully Honest Out-of-Office — make.fun bounty entry.
//
// Writes a single painfully honest out-of-office auto-reply to
// $MAKEFUN_OUTPUT_DIR/entry.txt (defaults to /output).
// Node 22, standard library only. No network, no randomness, no clock:
// the same input always produces the same output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one sentence, 141 characters, no trailing newline.
const ENTRY =
  "I'm on leave until Monday, and your message is safe with me, filed somewhere between the sunscreen and the quiet guilt of enjoying a day off.";

// Guard: the sealed scorer requires 1-200 characters.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}

// Guard: exactly one sentence — a single sentence-ending mark, the final
// period, and no other sentence terminators hiding earlier in the line.
const terminators = ENTRY.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !ENTRY.endsWith(".")) {
  throw new Error("entry must be a single sentence ending with one period");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
