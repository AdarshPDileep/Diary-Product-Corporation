// Shared export helpers — real .xlsx + .pdf generation.
// Used by Reports, Audit, and BulkUpload. Pure functions, no React.
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/** Format a number as Indian Rupees. */
export function formatINR(n) {
  if (n === null || n === undefined || n === '') return '—';
  return '₹' + Number(n).toLocaleString('en-IN');
}

/**
 * Export an array of row objects to a real .xlsx file.
 * @param {string} filename  base name (no extension)
 * @param {object[]} rows    data rows
 * @param {{label:string,key:string}[]} headers  column spec
 */
export function exportToExcel(filename, rows, headers) {
  const data = (rows || []).map(r => {
    const o = {};
    (headers || []).forEach(h => { o[h.label] = r[h.key] ?? ''; });
    return o;
  });
  const ws = XLSX.utils.json_to_sheet(data.length ? data : [{}]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Report');
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

/**
 * Export an array of row objects to a real .pdf file (tabular).
 * @param {string} title     report title printed at top
 * @param {string} filename  base name (no extension)
 * @param {object[]} rows    data rows
 * @param {{label:string,key:string}[]} headers  column spec
 */
export function exportToPDF(title, filename, rows, headers) {
  const doc = new jsPDF({ orientation: 'landscape' });
  const head = [(headers || []).map(h => h.label)];
  const body = (rows || []).map(r => (headers || []).map(h => String(r[h.key] ?? '')));

  doc.setFontSize(14);
  doc.setTextColor(30, 31, 54);
  doc.text(title, 14, 16);
  doc.setFontSize(9);
  doc.setTextColor(138, 148, 166);
  doc.text(`Generated ${new Date().toLocaleString('en-IN')} · TRCMPU-MILMA FSADEMS`, 14, 22);

  autoTable(doc, {
    head,
    body,
    startY: 28,
    styles: { fontSize: 8, cellPadding: 2.5, overflow: 'linebreak' },
    headStyles: { fillColor: [30, 136, 229], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [244, 247, 251] },
    margin: { left: 14, right: 14 }
  });

  doc.save(`${filename}.pdf`);
}

/**
 * Generate an Excel template (header row + sample rows) for bulk upload.
 * @param {string} filename    base name (no extension)
 * @param {string[]} headers   column names
 * @param {any[][]} sampleRows rows of sample values
 */
export function downloadExcelTemplate(filename, headers, sampleRows) {
  const aoa = [headers, ...(sampleRows || [])];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  XLSX.writeFile(wb, `${filename}.xlsx`);
}
