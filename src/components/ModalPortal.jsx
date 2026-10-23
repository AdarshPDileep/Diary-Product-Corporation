import { createPortal } from 'react-dom';

/**
 * Renders modals on document.body so they sit above the sticky top bar
 * and are not clipped by main-content stacking.
 */
export default function ModalPortal({ children }) {
  if (typeof document === 'undefined') return null;
  return createPortal(children, document.body);
}
