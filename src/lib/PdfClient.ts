import { PDFDocument } from "pdf-lib";
import * as fs from "fs";
import { flatten, range } from "lodash";
import { File } from "../types";
const fsPromise = fs.promises;
type Result = { data: Uint8Array[] | Uint8Array; errorMsg: string };
export async function mergePdf(files: Array<File>): Promise<Result> {
  const pdfDoc = await PDFDocument.create();
  const result: Result = {
    data: [],
    errorMsg: "",
  };
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
    result.data = await pdfDoc.save();
  } catch (error) {
    result.errorMsg = "Oops something went wrong. Please try again";
    return result;
  }
  return result;
}
export async function splitIntoSinglePages(file: File): Promise<Result> {
  const result: Result = {
    data: [],
    errorMsg: "",
  };
  try {
    const [inputFileBytes] = await readBytes([file]);
    const inputPdf = await PDFDocument.load(inputFileBytes);
    const inputPdfPageCount = inputPdf.getPageCount();

    if (inputPdfPageCount === 1) {
      result.errorMsg = "You cannot split a single page document";
      return result;
    }
    const outputPdfDocs = await splitPDFDocument(inputPdf);
    result.data = await Promise.all(outputPdfDocs.map((pdf) => pdf.save()));
  } catch (error) {
    console.log(error);
    result.errorMsg = "Oops something went wrong please try again";
    return result;
  }
  return result;
}
export async function extractSinglePage(
  file: File,
  pageNum: number
): Promise<Result> {
  const result: Result = { data: [], errorMsg: "" };
  try {
    const outputPdfDoc = await PDFDocument.create();
    const [inputFileBytes] = await readBytes([file]);
    const inputPdfDoc = await PDFDocument.load(inputFileBytes);
    const totalInputPdfPageNumber = inputPdfDoc.getPageCount();
    if (pageNum > totalInputPdfPageNumber) {
      result.errorMsg = "Invalid page number";
      return result;
    }
    const [extractedPage] = await outputPdfDoc.copyPages(inputPdfDoc, [
      pageNum - 1,
    ]);
    outputPdfDoc.addPage(extractedPage);
    result.data = await outputPdfDoc.save();
    return result;
  } catch (error) {
    result.errorMsg = "Oops something went wrong please try again";
    console.log(error);
    return result;
  }
}
export async function extractMultiplePages(
  file: File,
  pageFrom: number,
  pageTo: number,
  shouldMerge: boolean
): Promise<Result> {
  const result: Result = { data: [], errorMsg: "" };
  try {
    const [inputFileBytes] = await readBytes([file]);
    const inputPdfDoc = await PDFDocument.load(inputFileBytes);
    const totalInputPdfPageNumber = inputPdfDoc.getPageCount();
    if (pageTo > totalInputPdfPageNumber || pageFrom <= 0) {
      result.errorMsg = "Invalid page number";
      return result;
    }
    if (shouldMerge) {
      const resultPdf = await extractWithMerge(inputPdfDoc, pageFrom, pageTo);
      result.data = await resultPdf.save();
    } else {
      const resultPdfs = await extractWithoutMerge(
        inputPdfDoc,
        pageFrom,
        pageTo
      );
      result.data = await Promise.all(resultPdfs.map((pdf) => pdf.save()));
    }

    return result;
  } catch (error) {
    console.log(error);
    result.errorMsg = "Oops something went wrong please try again";
    return result;
  }
}
//****HELPER FUNCTIONS******/
async function readBytes(files: File[]): Promise<Buffer[]> {
  return await Promise.all(files.map((file) => fsPromise.readFile(file.path)));
}

async function loadToPdf(bufferArray: Buffer[]): Promise<PDFDocument[]> {
  return await Promise.all(
    bufferArray.map((donorPdfByte) => PDFDocument.load(donorPdfByte))
  );
}
async function splitPDFDocument(file: PDFDocument): Promise<PDFDocument[]> {
  const inputPdfPageIndices = file.getPageIndices();
  //create empty pdfs for each page of input pdf
  const outputPdfDocs = await Promise.all(
    inputPdfPageIndices.map((page) => PDFDocument.create())
  );
  //copy each page into a separate document
  const copiedPages = flatten(
    await Promise.all(
      outputPdfDocs.map((emptyPdf, i) => emptyPdf.copyPages(file, [i]))
    )
  );
  outputPdfDocs.forEach((pdf, i) => pdf.addPage(copiedPages[i]));
  return outputPdfDocs;
}
async function extractWithMerge(
  file: PDFDocument,
  pageFrom,
  pageTo
): Promise<PDFDocument> {
  let outputPdfDoc;
  try {
    outputPdfDoc = await PDFDocument.create();
    const extractedPages = await outputPdfDoc.copyPages(
      file,
      range(pageFrom - 1, pageTo)
    );
    for (const page of extractedPages) {
      outputPdfDoc.addPage(page);
    }
  } catch (error) {
    console.log(error);
  }
  return outputPdfDoc;
}
async function extractWithoutMerge(file: PDFDocument, pageFrom, pageTo) {
  let resultPdfDoc;
  try {
    const outputPdfDoc = await PDFDocument.create();
    const extractedPages = await outputPdfDoc.copyPages(
      file,
      range(pageFrom - 1, pageTo)
    );
    extractedPages.forEach((page) => {
      outputPdfDoc.addPage(page);
    });
    resultPdfDoc = splitPDFDocument(outputPdfDoc);
  } catch (error) {
    console.log(error);
  }
  return resultPdfDoc;
}
