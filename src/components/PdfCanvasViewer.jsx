import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const MIN_SCALE = 0.75;
const MAX_SCALE = 2;
const SCALE_STEP = 0.15;

export default function PdfCanvasViewer({ url, ariaLabel }) {
  const canvasRef = useRef(null);
  const viewportRef = useRef(null);
  const pdfRef = useRef(null);
  const renderTaskRef = useRef(null);

  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    setPageNum(1);
    setNumPages(0);
    setZoom(1);

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise
      .then((pdf) => {
        if (cancelled) {
          pdf.destroy();
          return;
        }
        pdfRef.current?.destroy();
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'Unable to load PDF');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      pdfRef.current?.destroy();
      pdfRef.current = null;
    };
  }, [url]);

  const renderPage = useCallback(async () => {
    const pdf = pdfRef.current;
    const canvas = canvasRef.current;
    const wrap = viewportRef.current;
    if (!pdf || !canvas || !wrap || loading) return;

    renderTaskRef.current?.cancel();
    const page = await pdf.getPage(pageNum);
    const baseViewport = page.getViewport({ scale: 1 });
    const fitWidth = Math.max((wrap.clientWidth - 4) / baseViewport.width, 0.5);
    const viewport = page.getViewport({ scale: fitWidth * zoom });

    const context = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const task = page.render({ canvasContext: context, viewport });
    renderTaskRef.current = task;
    try {
      await task.promise;
    } catch (e) {
      if (e?.name !== 'RenderingCancelledException') {
        setError(e?.message || 'Unable to render page');
      }
    }
  }, [pageNum, zoom, loading]);

  useEffect(() => {
    renderPage();
  }, [renderPage, numPages]);

  useEffect(() => {
    const wrap = viewportRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => renderPage());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [renderPage]);

  const zoomOut = () => setZoom((z) => Math.max(MIN_SCALE, +(z - SCALE_STEP).toFixed(2)));
  const zoomIn = () => setZoom((z) => Math.min(MAX_SCALE, +(z + SCALE_STEP).toFixed(2)));

  if (error) {
    return (
      <div className="pdf-viewer-empty">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="pdf-viewer">
      <div className="pdf-viewer-toolbar">
        <span className="pdf-viewer-page">
          {numPages ? `${pageNum} / ${numPages}` : '—'}
        </span>
        <div className="pdf-viewer-zoom">
          <button type="button" className="pdf-viewer-icon-btn" onClick={zoomOut} disabled={loading || zoom <= MIN_SCALE} aria-label="Zoom out">
            <Minus size={16} />
          </button>
          <span className="pdf-viewer-zoom-label">{Math.round(zoom * 100)}%</span>
          <button type="button" className="pdf-viewer-icon-btn" onClick={zoomIn} disabled={loading || zoom >= MAX_SCALE} aria-label="Zoom in">
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="pdf-viewer-stage" ref={viewportRef} aria-busy={loading}>
        {loading && <div className="pdf-viewer-loading">Loading document…</div>}
        <canvas ref={canvasRef} className="pdf-viewer-canvas" aria-label={ariaLabel} />
      </div>
    </div>
  );
}
