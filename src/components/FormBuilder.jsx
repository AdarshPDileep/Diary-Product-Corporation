import React from 'react';
import { FileText, Plus } from 'lucide-react';

export default function FormBuilder({
  builderFields, setBuilderFields, selectedBuilderField, setSelectedBuilderField,
  handleAddFieldToBuilder, onPublishScheme, t, lang
}) {
  const ui = lang === 'ml' ? {
    subtitle: 'പുതിയ സ്കീം അപേക്ഷകൾക്കായി ഇഷ്ടാനുസൃത ഡാറ്റാ ഫീൽഡുകൾ ഡൈനമിക്കായി ക്രമീകരിക്കുക.',
    publishScheme: 'പ്രസിദ്ധീകരിച്ച് സ്കീം ക്രമീകരിക്കുക',
    components: 'ഘടകങ്ങൾ',
    textInput: 'ടെക്സ്റ്റ് ഇൻപുട്ട്',
    number: 'നമ്പർ',
    date: 'തീയതി',
    dropdown: 'ഡ്രോപ്പ്ഡൗൺ',
    documentUpload: 'ഡോക്യുമെന്റ് അപ്ലോഡ്',
    formPreview: 'ഫോം പ്രിവ്യൂ',
    selectToAdd: 'ഫീൽഡുകൾ ചേർക്കാൻ ഇടതുവശത്തുള്ള ഘടകങ്ങൾ തിരഞ്ഞെടുക്കുക',
    required: 'നിർബന്ധിതം',
    optional: 'ഓപ്ഷണൽ',
    remove: 'നീക്കം ചെയ്യുക',
    fieldProperties: 'ഫീൽഡ് വിവരങ്ങൾ',
    fieldLabel: 'ഫീൽഡ് ലേബൽ',
    malayalamLabel: 'മലയാളം ലേബൽ',
    isMandatory: 'ഫീൽഡ് നിർബന്ധമാണോ?',
    selectToModify: 'നിയന്ത്രണങ്ങൾ മാറ്റാൻ ഒരു പ്രിവ്യൂ ഫീൽഡ് തിരഞ്ഞെടുക്കുക',
  } : {
    subtitle: 'Configure custom data fields for new scheme applications dynamically.',
    publishScheme: 'Publish & Configure Scheme',
    components: 'Components',
    textInput: 'Text Input',
    number: 'Number',
    date: 'Date',
    dropdown: 'Dropdown',
    documentUpload: 'Document Upload',
    formPreview: 'Form Preview',
    selectToAdd: 'Select components on the left to add fields',
    required: 'Required',
    optional: 'Optional',
    remove: 'Remove',
    fieldProperties: 'Field Properties',
    fieldLabel: 'Field Label',
    malayalamLabel: 'Malayalam Label',
    isMandatory: 'Is Field Mandatory?',
    selectToModify: 'Select a preview field to modify constraints',
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>{t('formBuilder')}</h1>
          <p>{ui.subtitle}</p>
        </div>
        <button className="btn btn-primary" onClick={onPublishScheme}>
          {ui.publishScheme}
        </button>
      </div>

      <div className="builder-container">
        {/* Left component panel */}
        <div className="builder-panel">
          <div className="builder-panel-header">{ui.components}</div>
          <div className="builder-panel-body">
            <div className="field-token" onClick={() => handleAddFieldToBuilder('text')}><FileText size={14}/> {ui.textInput}</div>
            <div className="field-token" onClick={() => handleAddFieldToBuilder('number')}><span style={{fontWeight: 'bold'}}>#</span> {ui.number}</div>
            <div className="field-token" onClick={() => handleAddFieldToBuilder('date')}><span style={{fontWeight: 'bold'}}>📅</span> {ui.date}</div>
            <div className="field-token" onClick={() => handleAddFieldToBuilder('select')}><Plus size={14}/> {ui.dropdown}</div>
            <div className="field-token" onClick={() => handleAddFieldToBuilder('file')}><Plus size={14}/> {ui.documentUpload}</div>
          </div>
        </div>

        {/* Middle preview canvas */}
        <div className="builder-canvas">
          <div style={{fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)'}}>{ui.formPreview}</div>
          {builderFields.length === 0 ? (
            <div className="canvas-placeholder">
              <Plus size={24}/>
              <span>{ui.selectToAdd}</span>
            </div>
          ) : (
            builderFields.map(field => (
              <div key={field.key} className={`canvas-field-row ${selectedBuilderField?.key === field.key ? 'selected' : ''}`} onClick={() => setSelectedBuilderField(field)}>
                <div>
                  <div style={{fontWeight: '600', fontSize: '13px'}}>{field.label}</div>
                  <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>{field.type} • {field.mandatory ? ui.required : ui.optional}</div>
                </div>
                <button className="btn btn-secondary" style={{padding: '4px 8px'}} onClick={(e) => {
                  e.stopPropagation();
                  setBuilderFields(builderFields.filter(f => f.key !== field.key));
                  setSelectedBuilderField(null);
                }}>{ui.remove}</button>
              </div>
            ))
          )}
        </div>

        {/* Right Property inspector */}
        <div className="builder-panel">
          <div className="builder-panel-header">{ui.fieldProperties}</div>
          <div className="builder-panel-body">
            {selectedBuilderField ? (
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <div className="form-group">
                  <label>{ui.fieldLabel}</label>
                  <input type="text" className="form-input" value={selectedBuilderField.label} onChange={e => {
                    const val = e.target.value;
                    setBuilderFields(builderFields.map(f => f.key === selectedBuilderField.key ? { ...f, label: val } : f));
                    setSelectedBuilderField({ ...selectedBuilderField, label: val });
                  }} />
                </div>
                <div className="form-group">
                  <label>{ui.malayalamLabel}</label>
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
                  {ui.isMandatory}
                </label>
              </div>
            ) : (
              <div style={{fontSize: '12px', color: 'var(--text-light)', textAlign: 'center', marginTop: '40px'}}>{ui.selectToModify}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
