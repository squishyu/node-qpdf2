import * as fs from "node:fs/promises"
import {fileExists} from "./utils.js";
import execute from "./spawn.js";

export interface CompressSettings {
  /** QPDF arguments */
  arguments?: string | string[]
  /** The path or Buffer for the input PDF */
  input: string | Buffer;
  /** The path for the output pdf */
  output?: string;
}

const temporaryPdfPath = "./tmp.pdf"

/**
 * Compressed a PDF
 * @param payload The settings for compression
 * @returns The output of QPDF
 */
export const compress = async (payload: CompressSettings): Promise<Buffer> => {
  if (!payload.input) throw new Error("Please specify input file");
  const callArguments = ["--compress-streams=y"];

  if ( payload.arguments ) {
    if ( Array.isArray(payload.arguments) ) callArguments.push(...payload.arguments)
    else callArguments.push(payload.arguments)
  }

  if ( typeof payload.input === "string" ) {
    if (!fileExists(payload.input)) throw new Error("Input file doesn't exist");

    // Input file path
    callArguments.push(payload.input);
  } else {
    await fs.writeFile(temporaryPdfPath, payload.input);

    callArguments.push(temporaryPdfPath);
  }

  // Print PDF on stdout
  if (payload.output) {
    callArguments.push(payload.output);
  } else {
    callArguments.push("-");
  }

  return execute(callArguments);
};
