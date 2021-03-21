import { PDFDocument } from "pdf-lib";
import * as fs from "fs";
import { flatten } from "lodash";
import { File } from "../types";
export async function mergePdf(files: Array<File>): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const fsPromise = fs.promises;
  let resultPdfBytes;
  try {
    //readfiles by filepath
    const fileBufferPromises = files.map((file) =>
      fsPromise.readFile(file.path)
    );
    const donorPdfBytes = await Promise.all(fileBufferPromises);
    //load them into a PDF document
    const donorPdfDocs = await Promise.all(
      donorPdfBytes.map((donorPdfByte) => PDFDocument.load(donorPdfByte))
    );
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
