/// <reference types="node" resolution-mode="require"/>
export interface CompressSettings {
    /** QPDF arguments */
    arguments?: string | string[];
    /** The path or Buffer for the input PDF */
    input: string | Buffer;
    /** The path for the output pdf */
    output?: string;
}
/**
 * Compressed a PDF
 * @param payload The settings for compression
 * @returns The output of QPDF
 */
export declare const compress: (payload: CompressSettings) => Promise<Buffer>;
