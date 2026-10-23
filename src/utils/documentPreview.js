import jsPDF from 'jspdf';

const IMAGE_EXT = /\.(jpe?g|png|gif|webp)$/i;

export function isImageFileName(fileName = '') {
  return IMAGE_EXT.test(fileName);
}

function addTrcmpuWatermark(doc) {
  doc.setTextColor(233, 238, 245);
  doc.setFontSize(64);
  doc.text('TRCMPU', 22, 168, { angle: 42 });
}

function drawLabelValue(doc, x, y, label, value) {
  doc.setFontSize(9);
  doc.setTextColor(138, 148, 166);
  doc.text(label, x, y);
  doc.setFontSize(11);
  doc.setTextColor(26, 31, 54);
  doc.text(String(value ?? '—'), x, y + 5.5);
}

/**
 * Demo preview for mock applications (no stored file bytes).
 * Returns a blob URL — caller must revoke when done.
 */
export function createDemoDocumentPreviewBlobUrl(document, application) {
  const fileName = document.file || 'document.pdf';

  if (isImageFileName(fileName)) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="820" height="1160" viewBox="0 0 820 1160">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f8fafc"/>
            <stop offset="100%" stop-color="#eef2f7"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)"/>
        <rect x="48" y="48" width="724" height="1064" rx="16" fill="#fff" stroke="#e2e8f0"/>
        <rect x="48" y="48" width="724" height="6" rx="3" fill="#2196F3"/>
        <text x="410" y="130" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="13" letter-spacing="2" fill="#64748b">TRCMPU · VERIFICATION COPY</text>
        <text x="410" y="168" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="26" fill="#1a1f36" font-weight="600">${escapeXml(document.name)}</text>
        <text x="410" y="198" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="13" fill="#94a3b8">${escapeXml(fileName)}</text>
        <text x="410" y="520" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="56" fill="#e2e8f0" transform="rotate(-35 410 520)">TRCMPU</text>
        <rect x="110" y="260" width="600" height="620" rx="12" fill="#fafbfc" stroke="#e2e8f0"/>
        <text x="410" y="560" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="15" fill="#64748b">Scanned attachment preview</text>
        <text x="410" y="592" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="13" fill="#94a3b8">${escapeXml(application.refNo)} · ${escapeXml(application.farmerName)}</text>
      </svg>`;
    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
    return { kind: 'image', url, revoke: false };
  }

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();

  doc.setFillColor(33, 150, 243);
  doc.rect(0, 0, pageW, 3.5, 'F');

  addTrcmpuWatermark(doc);

  doc.setFontSize(9);
  doc.setTextColor(138, 148, 166);
  doc.text('TRCMPU · VERIFICATION COPY', pageW / 2, 22, { align: 'center' });

  doc.setFontSize(18);
  doc.setTextColor(26, 31, 54);
  doc.text(document.name || 'Document', pageW / 2, 34, { align: 'center' });

  doc.setDrawColor(236, 239, 243);
  doc.setLineWidth(0.4);
  doc.line(24, 40, pageW - 24, 40);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(application.refNo, pageW / 2, 47, { align: 'center' });

  const cardX = 22;
  const cardY = 54;
  const cardW = pageW - 44;
  doc.setFillColor(250, 251, 252);
  doc.setDrawColor(237, 240, 244);
  doc.roundedRect(cardX, cardY, cardW, 58, 3, 3, 'FD');

  drawLabelValue(doc, cardX + 8, cardY + 14, 'Farmer', application.farmerName);
  drawLabelValue(doc, cardX + 68, cardY + 14, 'Farmer ID', application.farmerId);
  drawLabelValue(doc, cardX + 8, cardY + 34, 'Society', application.societyName);
  drawLabelValue(doc, cardX + 68, cardY + 34, 'Submitted', application.submissionDate);

  doc.setFontSize(10);
  doc.setTextColor(26, 31, 54);
  doc.text('Scheme details', cardX, cardY + 72);

  doc.setDrawColor(237, 240, 244);
  doc.line(cardX, cardY + 75, cardX + cardW, cardY + 75);

  let rowY = cardY + 84;
  if (application.data && typeof application.data === 'object') {
    Object.entries(application.data).forEach(([key, value]) => {
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
      doc.setFontSize(9);
      doc.setTextColor(138, 148, 166);
      doc.text(label, cardX, rowY);
      doc.setFontSize(11);
      doc.setTextColor(26, 31, 54);
      doc.text(String(value ?? '—'), cardX + 52, rowY);
      rowY += 11;
      if (rowY > 230) return;
    });
  }

  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text(`Source file: ${fileName}`, cardX, 268);
  doc.text('Original retained at society / unit records.', cardX, 274);

  doc.setFontSize(8);
  doc.setTextColor(180, 188, 200);
  doc.text('TRCMPU Farmer Scheme ERP', pageW / 2, 287, { align: 'center' });

  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  return { kind: 'pdf', url, revoke: true };
}

/**
 * Resolve preview for a document on an application.
 * Uses stored previewUrl (from real uploads) when present.
 */
export function resolveDocumentPreview(document, application) {
  const stored = document.previewUrl || document.url;
  if (stored) {
    const kind = document.mimeType?.startsWith('image/')
      || isImageFileName(document.file)
      ? 'image'
      : 'pdf';
    return { kind, url: stored, revoke: false };
  }
  return createDemoDocumentPreviewBlobUrl(document, application);
}

function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
