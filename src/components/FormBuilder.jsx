import React from 'react';
import { FileText, Plus, Hash, Calendar, ChevronDown, UploadCloud, Trash2 } from 'lucide-react';

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

  const getIcon = (type) => {
    switch (type) {
      case 'text': return <FileText size={16} />;
      case 'number': return <Hash size={16} />;
      case 'date': return <Calendar size={16} />;
      case 'select': return <ChevronDown size={16} />;
      case 'file': return <UploadCloud size={16} />;
      default: return <FileText size={16} />;
    }
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
            <div className="field-token" onClick={() => handleAddFieldToBuilder('text')}>
              <FileText size={16} style={{ color: 'var(--primary)' }} />
              <span>{ui.textInput}</span>
            </div>
            <div className="field-token" onClick={() => handleAddFieldToBuilder('number')}>
              <Hash size={16} style={{ color: '#E91E63' }} />
              <span>{ui.number}</span>
            </div>
            <div className="field-token" onClick={() => handleAddFieldToBuilder('date')}>
              <Calendar size={16} style={{ color: '#9C27B0' }} />
              <span>{ui.date}</span>
            </div>
            <div className="field-token" onClick={() => handleAddFieldToBuilder('select')}>
              <ChevronDown size={16} style={{ color: '#FF9800' }} />
              <span>{ui.dropdown}</span>
            </div>
            <div className="field-token" onClick={() => handleAddFieldToBuilder('file')}>
              <UploadCloud size={16} style={{ color: '#4CAF50' }} />
              <span>{ui.documentUpload}</span>
            </div>
          </div>
        </div>

        {/* Middle preview canvas */}
        <div className="builder-canvas">
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.5px' }}>
            {ui.formPreview}
          </div>
          {builderFields.length === 0 ? (
            <div className="canvas-placeholder">
              <Plus size={24} style={{ color: 'var(--text-light)' }} />
              <span>{ui.selectToAdd}</span>
            </div>
          ) : (
            builderFields.map(field => (
              <div
                key={field.key}
                className={`canvas-field-row ${selectedBuilderField?.key === field.key ? 'selected' : ''}`}
                onClick={() => setSelectedBuilderField(field)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifycontent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: selectedBuilderField?.key === field.key ? 'var(--card-bg)' : '#F1F5F9',
                    color: 'var(--text-muted)',
                    paddingLeft: '8px'
                  }}>
                    {getIcon(field.type)}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text-main)' }}>
                      {field.label || <span style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>Untitled Field</span>}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {field.type.toUpperCase()} • {field.mandatory ? ui.required : ui.optional}
                    </div>
                  </div>
                </div>
                <button
                  className="btn-icon-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    setBuilderFields(builderFields.filter(f => f.key !== field.key));
                    setSelectedBuilderField(null);
                  }}
                  title={ui.remove}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Right Property inspector */}
        <div className="builder-panel">
          <div className="builder-panel-header">{ui.fieldProperties}</div>
          <div className="builder-panel-body">
            {selectedBuilderField ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label>{ui.fieldLabel}</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedBuilderField.label}
                    onChange={e => {
                      const val = e.target.value;
                      setBuilderFields(builderFields.map(f => f.key === selectedBuilderField.key ? { ...f, label: val } : f));
                      setSelectedBuilderField({ ...selectedBuilderField, label: val });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>{ui.malayalamLabel}</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedBuilderField.labelMl}
                    onChange={e => {
                      const val = e.target.value;
                      setBuilderFields(builderFields.map(f => f.key === selectedBuilderField.key ? { ...f, labelMl: val } : f));
                      setSelectedBuilderField({ ...selectedBuilderField, labelMl: val });
                    }}
                  />
                </div>
                <label style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: 'var(--text-main)', cursor: 'pointer', marginTop: '4px' }}>
                  <input
                    type="checkbox"
                    checked={selectedBuilderField.mandatory}
                    style={{ accentColor: 'var(--primary)' }}
                    onChange={e => {
                      const val = e.target.checked;
                      setBuilderFields(builderFields.map(f => f.key === selectedBuilderField.key ? { ...f, mandatory: val } : f));
                      setSelectedBuilderField({ ...selectedBuilderField, mandatory: val });
                    }}
                  />
                  <span>{ui.isMandatory}</span>
                </label>
              </div>
            ) : (
              <div style={{ fontSize: '13px', color: 'var(--text-light)', textAlign: 'center', padding: '40px 10px' }}>
                {ui.selectToModify}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
