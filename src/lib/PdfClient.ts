import { PDFDocument } from "pdf-lib";
import * as fs from "fs";
import { flatten } from "lodash";
import { File } from "../types";
const fsPromise = fs.promises;
export async function mergePdf(files: Array<File>): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  let resultPdfBytes;
  try {
    //readfileBytes from filepath
    const donorPdfBytes = await readBytes(files);
    //load them into a PDF document
    const donorPdfDocs = await loadToPdf(donorPdfBytes);
    //copy pages into the final pdf documents
    const pagesToBeAdded = await Promise.all(
      donorPdfDocs.map((doc) => pdfDoc.copyPages(doc, doc.getPageIndices()))
    );
    //add the pages to the final document
    for (const page of flatten(pagesToBeAdded)) {
      pdfDoc.addPage(page);
    }
    resultPdfBytes = await pdfDoc.save();
  } catch (error) {
    console.log(error);
  }
  return resultPdfBytes;
}
async function readBytes(filePaths: File[]): Promise<Buffer[]> {
  return await Promise.all(
    filePaths.map((file) => fsPromise.readFile(file.path))
  );
}
async function loadToPdf(bufferArray: Buffer[]): Promise<PDFDocument[]> {
  return await Promise.all(
    bufferArray.map((donorPdfByte) => PDFDocument.load(donorPdfByte))
  );
}
