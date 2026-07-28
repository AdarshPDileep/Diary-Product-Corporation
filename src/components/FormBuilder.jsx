import React from 'react';
import { FileText, Plus } from 'lucide-react';

export default function FormBuilder({
  builderFields, setBuilderFields, selectedBuilderField, setSelectedBuilderField,
  handleAddFieldToBuilder, onPublishScheme, t
}) {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('formBuilder')}</h1>
          <p>Configure custom data fields for new scheme applications dynamically.</p>
        </div>
        <button className="btn btn-primary" onClick={onPublishScheme}>
          Publish &amp; Configure Scheme
        </button>
      </div>

      <div className="builder-container">
        {/* Left component panel */}
        <div className="builder-panel">
          <div className="builder-panel-header">Components</div>
          <div className="builder-panel-body">
            <div className="field-token" onClick={() => handleAddFieldToBuilder('text')}><FileText size={14}/> Text Input</div>
            <div className="field-token" onClick={() => handleAddFieldToBuilder('number')}><span style={{fontWeight: 'bold'}}>#</span> Number</div>
            <div className="field-token" onClick={() => handleAddFieldToBuilder('date')}><span style={{fontWeight: 'bold'}}>📅</span> Date</div>
            <div className="field-token" onClick={() => handleAddFieldToBuilder('select')}><Plus size={14}/> Dropdown</div>
            <div className="field-token" onClick={() => handleAddFieldToBuilder('file')}><Plus size={14}/> Document Upload</div>
          </div>
        </div>

        {/* Middle preview canvas */}
        <div className="builder-canvas">
          <div style={{fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)'}}>Form Preview</div>
          {builderFields.length === 0 ? (
            <div className="canvas-placeholder">
              <Plus size={24}/>
              <span>Select components on the left to add fields</span>
            </div>
          ) : (
            builderFields.map(field => (
              <div key={field.key} className={`canvas-field-row ${selectedBuilderField?.key === field.key ? 'selected' : ''}`} onClick={() => setSelectedBuilderField(field)}>
                <div>
                  <div style={{fontWeight: '600', fontSize: '13px'}}>{field.label}</div>
                  <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>{field.type} • {field.mandatory ? 'Required' : 'Optional'}</div>
                </div>
                <button className="btn btn-secondary" style={{padding: '4px 8px'}} onClick={(e) => {
                  e.stopPropagation();
                  setBuilderFields(builderFields.filter(f => f.key !== field.key));
                  setSelectedBuilderField(null);
                }}>Remove</button>
              </div>
            ))
          )}
        </div>

        {/* Right Property inspector */}
        <div className="builder-panel">
          <div className="builder-panel-header">Field Properties</div>
          <div className="builder-panel-body">
            {selectedBuilderField ? (
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <div className="form-group">
                  <label>Field Label</label>
                  <input type="text" className="form-input" value={selectedBuilderField.label} onChange={e => {
                    const val = e.target.value;
                    setBuilderFields(builderFields.map(f => f.key === selectedBuilderField.key ? { ...f, label: val } : f));
                    setSelectedBuilderField({ ...selectedBuilderField, label: val });
                  }} />
                </div>
                <div className="form-group">
                  <label>Malayalam Label</label>
                  <input type="text" className="form-input" value={selectedBuilderField.labelMl} onChange={e => {
                    const val = e.target.value;
                    setBuilderFields(builderFields.map(f => f.key === selectedBuilderField.key ? { ...f, labelMl: val } : f));
                    setSelectedBuilderField({ ...selectedBuilderField, labelMl: val });
                  }} />
                </div>
                <label style={{display: 'flex', gap: '6px', alignItems: 'center', fontSize: '13px', cursor: 'pointer', marginTop: '10px'}}>
                  <input type="checkbox" checked={selectedBuilderField.mandatory} onChange={e => {
                    const val = e.target.checked;
                    setBuilderFields(builderFields.map(f => f.key === selectedBuilderField.key ? { ...f, mandatory: val } : f));
                    setSelectedBuilderField({ ...selectedBuilderField, mandatory: val });
                  }} />
                  Is Field Mandatory?
                </label>
              </div>
            ) : (
              <div style={{fontSize: '12px', color: 'var(--text-light)', textAlign: 'center', marginTop: '40px'}}>Select a preview field to modify constraints</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
