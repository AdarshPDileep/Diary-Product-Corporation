// Shared Malayalam/English helpers for dynamic values that appear in badges,
// tables and status pills across many components. Keeping these in one place
// guarantees a status like "Approved" always renders the same Malayalam word.
//
// Usage:
//   import { statusText, langText } from '../i18n';
//   statusText(lang, app.status)          // -> 'അംഗീകരിച്ചു' when lang === 'ml'
//   langText(lang, 'English', 'മലയാളം')   // pick one of two strings by language

const ML = {
  // Workflow / application statuses
  'Approved': 'അംഗീകരിച്ചു',
  'Rejected': 'നിരസിച്ചു',
  'Completed': 'പൂർത്തിയായി',
  'Pending': 'തീരുമാനമാകാത്തത്',
  'Pending Verification': 'പരിശോധന നടക്കുന്നു',
  'Pending Field Supervisor': 'ഫീൽഡ് സൂപ്പർവൈസർ പരിശോധനയ്ക്കായി',
  'Pending P&I Officer': 'പി&ഐ ഓഫീസർ പരിശോധനയ്ക്കായി',
  'Pending Section Head': 'സെക്ഷൻ മേധാവി പരിശോധനയ്ക്കായി',
  'Pending Unit Head': 'യൂണിറ്റ് മേധാവി പരിശോധനയ്ക്കായി',
  'Pending Functional Head': 'ഫങ്ഷണൽ മേധാവി പരിശോധനയ്ക്കായി',
  'Pending Managing Director': 'മാനേജിംഗ് ഡയറക്ടർ പരിശോധനയ്ക്കായി',
  'Returned for Review': 'തിരുത്തലിനായി തിരികെ നൽകി',
  'Awaiting Finance Approval': 'ധനകാര്യ അംഗീകാരത്തിനായി കാത്തിരിക്കുന്നു',

  // Payment
  'Paid': 'അടച്ചു',
  'Not Initiated': 'ആരംഭിച്ചിട്ടില്ല',

  // Farmer / KYC
  'Active': 'സജീവം',
  'Inactive': 'നിരജീവം',
  'Verified': 'ഉറപ്പാക്കി',
  'Open': 'തുറന്നു',
  'Closed': 'അടച്ചു',

  // Scheme
  'Published': 'പ്രസിദ്ധീകരിച്ചു',
  'Draft': 'ഡ്രാഫ്റ്റ്',

  // Bulk upload row status
  'Valid': 'സാധുവാണ്',
  'Invalid': 'സാധുവല്ല',
  'Duplicate': 'തനിപ്പകർപ്പ്',

  // Ticket priority / category
  'Low': 'കുറഞ്ഞ',
  'Medium': 'ഇടത്തരം',
  'High': 'ഉയർന്ന',
  'General Inquiry': 'പൊതുവായ അന്വേഷണം'
};

// Translate a known dynamic status/label; fall back to the original string.
export const statusText = (lang, value) => {
  if (lang !== 'ml' || value == null) return value;
  return ML[value] != null ? ML[value] : value;
};

// Pick between an English and a Malayalam string by the active language.
export const langText = (lang, en, ml) => (lang === 'ml' ? ml : en);
