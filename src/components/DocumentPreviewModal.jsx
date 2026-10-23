import React, { Suspense, lazy } from 'react';
import { Download, FileText, ShieldCheck, X } from 'lucide-react';
import ModalPortal from './ModalPortal';

const PdfCanvasViewer = lazy(() => import('./PdfCanvasViewer'));

export default function DocumentPreviewModal({ preview, labels, onClose }) {
  if (!preview) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = preview.url;
    link.download = preview.fileName || 'document.pdf';
    link.rel = 'noopener';
    link.click();
  };

  return (
    <ModalPortal>
    <div className="modal-overlay doc-preview-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-content doc-preview-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="doc-preview-title"
      >
        <header className="doc-preview-header">
          <div className="doc-preview-title-row">
            <span className="doc-preview-icon" aria-hidden="true">
              <FileText size={18} strokeWidth={2} />
            </span>
            <div className="doc-preview-titles">
              <h2 id="doc-preview-title">{preview.title}</h2>
              <p className="doc-preview-meta">
                {preview.fileName}
                {preview.refNo ? ` · ${preview.refNo}` : ''}
              </p>
            </div>
          </div>
          <button type="button" className="doc-preview-close" onClick={onClose} aria-label={labels.close}>
            <X size={20} />
          </button>
        </header>

        <div className="doc-preview-badge-row">
          <span className="doc-preview-badge">
            <ShieldCheck size={14} strokeWidth={2.25} />
            {labels.verificationCopy}
          </span>
        </div>

        <div className="doc-preview-body">
          {preview.kind === 'image' ? (
            <figure className="doc-preview-figure">
              <img src={preview.url} alt={preview.title} className="doc-preview-image" />
            </figure>
          ) : (
            <Suspense fallback={<div className="pdf-viewer-empty">Loading viewer…</div>}>
              <PdfCanvasViewer url={preview.url} ariaLabel={preview.title} />
            </Suspense>
          )}
        </div>

        <footer className="doc-preview-footer">
          <p className="doc-preview-footnote">{labels.previewWatermarkNote}</p>
          <div className="doc-preview-actions">
            <button type="button" className="btn btn-ghost doc-preview-download" onClick={handleDownload}>
              <Download size={16} />
              {labels.download}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              {labels.close}
            </button>
          </div>
        </footer>
      </div>
    </div>
    </ModalPortal>
  );
}
