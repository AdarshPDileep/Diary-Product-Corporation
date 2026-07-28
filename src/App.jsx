import React, { useState, useEffect } from 'react';
import {
  Users, Layers, Award, FileText, CheckSquare, RefreshCw, AlertTriangle,
  HelpCircle, Shield, Bell, Globe, LogOut, ChevronRight, Search, Plus,
  Upload, Download, FileSpreadsheet, Play, CheckCircle, XCircle, Clock,
  TrendingUp, CreditCard, PieChart, Eye, Settings, Info, ArrowLeft, ArrowRight,
  Database, ShieldAlert, MessageSquare, Lock, Key, RotateCcw, Menu
} from 'lucide-react';
import {
  initialDistricts, initialUnits, initialSocieties, initialFarmers,
  initialSchemes, initialApplications, initialStatements, initialTickets,
  initialAuditLogs, roleDashboardMetrics, reportTypes, financeBreakdown
} from './mockData';

// Background photos
import dashboardBgImg from './assets/photorealistic-view-cow-grazing-outdoors (1).jpg';

// Component Pages
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Farmers from './components/Farmers';
import BulkUpload from './components/BulkUpload';
import Schemes from './components/Schemes';
import FormBuilder from './components/FormBuilder';
import SubmitApp from './components/SubmitApp';
import ApprovalQueue from './components/ApprovalQueue';
import Statements from './components/Statements';
import Finance from './components/Finance';
import Audit from './components/Audit';
import Helpdesk from './components/Helpdesk';
import Reports from './components/Reports';
import Tracking from './components/Tracking';
import FarmerApproval from './components/FarmerApproval';

// Malayalam translations dictionary
const translations = {
  en: {
    title: "TRCMPU Farmer Scheme ERP",
    tagline: "Trivandrum Dairy",
    dashboard: "Dashboard",
    farmers: "Farmer Master",
    bulkUpload: "Farmer Bulk Upload",
    schemes: "Scheme Configuration",
    formBuilder: "Form Builder",
    submitApp: "Submit Application",
    approvalQueue: "Approval Queue",
    statements: "Consolidated Statements",
    finance: "Finance & Budget",
    notifications: "Notifications",
    helpdesk: "Helpdesk Support",
    audit: "Audit Trail",
    settings: "System Config",
    login: "Login",
    role: "Active Role",
    lang: "മലയാളം",
    logout: "Log Out",
    welcome: "Welcome back",
    search: "Search anything...",
    actions: "Actions",
    status: "Status",
    details: "Details",
    cancel: "Cancel",
    submit: "Submit",
    approve: "Approve",
    reject: "Reject",
    return: "Return for Review",
    resubmit: "Resubmit",
    save: "Save Draft",
    pending: "Pending",
    activeFarmers: "Active Farmers",
    openSchemes: "Open Schemes",
    utilization: "Budget Utilization",
    activeUser: "Active User",
    district: "District",
    society: "Society",
    unit: "Unit",
    category: "Category",
    all: "All",
    reportsSection: "Reports & Insights",
    reports: "MIS Reports",
    tracking: "Track Application",
    farmerApproval: "Farmer Approvals",
    myApplications: "My Applications",
    schemeNotifications: "Scheme Notifications",
    schemeWiseCounts: "Scheme-wise Counts",
    fundDistribution: "Fund Distribution"
  },
  ml: {
    title: "ടി.ആർ.സി.എം.പി.യു ഫാർമർ സ്കീം ഇ.ആർ.പി",
    tagline: "തിരുവനന്തപുരം ഡയറി - മിൽമ",
    dashboard: "ഡാഷ്‌ബോർഡ്",
    farmers: "കർഷക വിവരങ്ങൾ",
    bulkUpload: "ബൾക്ക് അപ്‌ലോഡ്",
    schemes: "പദ്ധതി ക്രമീകരണം",
    formBuilder: "ഫോം ബിൽഡർ",
    submitApp: "അപേക്ഷ സമർപ്പിക്കൽ",
    approvalQueue: "അംഗീകാരപ്പട്ടിക",
    statements: "ഏകീകൃത പ്രസ്താവനകൾ",
    finance: "ധനകാര്യവും ബഡ്ജറ്റും",
    notifications: "അറിയിപ്പുകൾ",
    helpdesk: "ഹെൽപ്പ് ഡെസ്ക്",
    audit: "ഓഡിറ്റ് ലോഗുകൾ",
    settings: "ക്രമീകരണങ്ങൾ",
    login: "ലോഗിൻ",
    role: "ഉപയോക്തൃ പദവി",
    lang: "English",
    logout: "ലോഗ് ഔട്ട്",
    welcome: "സ്വാഗതം",
    search: "തിരയുക...",
    actions: "നടപടികൾ",
    status: "നില",
    details: "വിശദാംശങ്ങൾ",
    cancel: "റദ്ദാക്കുക",
    submit: "സമർപ്പിക്കുക",
    approve: "അംഗീകരിക്കുക",
    reject: "നിരസിക്കുക",
    return: "തിരുത്തലിനായി മടക്കുക",
    resubmit: "വീണ്ടും സമർപ്പിക്കുക",
    save: "ഡ്രാഫ്റ്റ് സേവ് ചെയ്യുക",
    pending: "തീരുമാനമാകാത്തത്",
    activeFarmers: "സജീവ കർഷകർ",
    openSchemes: "സജീവ പദ്ധതികൾ",
    utilization: "ബജറ്റ് വിനിയോഗം",
    activeUser: "ഉപയോക്താവ്",
    district: "ജില്ല",
    society: "സംഘം",
    unit: "യൂണിറ്റ്",
    category: "വിഭാഗം",
    all: "എല്ലാം",
    reportsSection: "റിപ്പോർട്ടുകളും വിശകലനവും",
    reports: "എം.ഐ.എസ് റിപ്പോർട്ടുകൾ",
    tracking: "അപേക്ഷാ ട്രാക്കിംഗ്",
    farmerApproval: "കർഷക അംഗീകാരം",
    myApplications: "എന്റെ അപേക്ഷകൾ",
    schemeNotifications: "പദ്ധതി അറിയിപ്പുകൾ",
    schemeWiseCounts: "പദ്ധതി അടിസ്ഥാനത്തിൽ എണ്ണം",
    fundDistribution: "ഫണ്ട് വിതരണം"
  }
};

// Demo role credentials for quick login (click a role to enter the portal)
const demoRoles = [
  { name: 'Society User', username: 'TVM_SOCIETY_101', password: 'society123' },
  { name: 'Field Supervisor', username: 'TVM_FIELD_01', password: 'field123' },
  { name: 'P&I Officer', username: 'TVM_PI_01', password: 'pi123' },
  { name: 'Section Head', username: 'TVM_SECTION_01', password: 'section123' },
  { name: 'Unit Head', username: 'TVM_UNIT_01', password: 'unit123' },
  { name: 'Functional Head', username: 'TVM_FUNC_01', password: 'func123' },
  { name: 'Managing Director', username: 'TVM_MD_01', password: 'md123' },
  { name: 'Finance Head', username: 'TVM_FIN_01', password: 'finance123' },
  { name: 'Super Administrator', username: 'TVM_ADMIN', password: 'admin123' }
];

// Background photo is used only on the Dashboard (the login screen has its own
// backdrop defined in CSS). All other pages render on a clean neutral surface.
const PAGE_BACKGROUNDS = {
  Dashboard: dashboardBgImg // local uploaded cow-grazing photo (src/assets)
};

// Persist login across page refreshes (role + last page, never the password)
const SESSION_KEY = 'trcmpu_session';
const loadSession = () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') || {}; }
  catch { return {}; }
};

function App() {
  // Restore the previous session so a page refresh keeps the user logged in
  const saved = loadSession();
  const [lang, setLang] = useState(saved.lang || 'en'); // en or ml
  const [isLoggedIn, setIsLoggedIn] = useState(!!saved.isLoggedIn);
  const [authStep, setAuthStep] = useState('login'); // login, forgot, reset
  const [sessionExpired, setSessionExpired] = useState(false);
  const [username, setUsername] = useState(saved.username || 'TVM_SOCIETY_101');
  const [password, setPassword] = useState('********');

  // Active Role and Menu Navigation
  const [currentRole, setCurrentRole] = useState(saved.currentRole || 'Society User');
  const [activeMenu, setActiveMenu] = useState(saved.activeMenu || 'Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer

  // Close the mobile sidebar whenever navigation changes
  useEffect(() => { setSidebarOpen(false); }, [activeMenu]);

  // Persist session across refreshes; clear it on logout
  useEffect(() => {
    try {
      if (isLoggedIn) {
        localStorage.setItem(SESSION_KEY, JSON.stringify({ isLoggedIn: true, username, currentRole, activeMenu, lang }));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch { /* storage unavailable (private mode) — ignore */ }
  }, [isLoggedIn, username, currentRole, activeMenu, lang]);
  
  // Data states
  const [farmers, setFarmers] = useState(initialFarmers);
  const [schemes, setSchemes] = useState(initialSchemes);
  const [applications, setApplications] = useState(initialApplications);
  const [statements, setStatements] = useState(initialStatements);
  const [tickets, setTickets] = useState(initialTickets);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Cattle Feed Subsidy Published', desc: 'Cattle Feed Subsidy Scheme 2026 is now open for applications.', category: 'Scheme', date: '2026-07-27 09:00', read: false },
    { id: 2, title: 'Payment Completed', desc: 'Payment completed for milk machine subsidy application reference FSA-2026-0000088.', category: 'Finance', date: '2026-07-26 15:30', read: false }
  ]);
  const [budgetAllocation, setBudgetAllocation] = useState({
    total: 7500000,
    utilized: 1920000,
    committed: 45000
  });

  // Modal / Detail States
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [isNewFarmerOpen, setIsNewFarmerOpen] = useState(false);
  const [isNewSchemeOpen, setIsNewSchemeOpen] = useState(false);
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);

  // Farmer Master approval (URS §4 — Field Supervisor / Unit-level gate)
  const [selectedFarmerApproval, setSelectedFarmerApproval] = useState(null); // { farmer, action }
  const [farmerApprovalRemarks, setFarmerApprovalRemarks] = useState('');
  
  // Search and Filter States
  const [farmerSearch, setFarmerSearch] = useState('');
  const [farmerDistrictFilter, setFarmerDistrictFilter] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('');

  // Form Builder state
  const [builderFields, setBuilderFields] = useState([
    { key: 'feedQty', label: 'Feed Quantity Purchased (bags)', type: 'number', mandatory: true },
    { key: 'billNo', label: 'Bill Number', type: 'text', mandatory: true }
  ]);
  const [selectedBuilderField, setSelectedBuilderField] = useState(null);

  // New Scheme configuration state (Create Scheme modal — URS §5)
  const defaultNewScheme = {
    name: '', nameMl: '', type: 'Subsidy', schemeYear: '2026-27',
    openDate: '', closeDate: '', maxBenefitAmount: 15000, budgetAllocation: 1000000,
    beneficiaryType: 'Active Farmer', minCattle: 1, minMilkSupply: 5,
    requiredDocs: 'Aadhaar, Milk Supply Certificate', description: ''
  };
  const [newScheme, setNewScheme] = useState({ ...defaultNewScheme });

  // New Farmer Form state
  const [newFarmer, setNewFarmer] = useState({
    name: '', nameMl: '', fatherSpouse: '', dob: '', gender: 'Male', category: 'General',
    membershipDate: '', mobile: '', altMobile: '', email: '', address: '', village: '',
    panchayat: '', taluk: '', district: 'TVM', pin: '', kycType: 'Aadhaar', kycNumber: '',
    bankName: '', bankBranch: '', bankAccount: '', bankIfsc: '', societyId: 'SOC101',
    memberNo: '', cattleCount: 0, landDetails: '', milkSupplyAvg: 0
  });

  // Bulk upload preview state
  const [uploadFile, setUploadFile] = useState(null);
  const [bulkPreview, setBulkPreview] = useState([]);
  const [bulkErrors, setBulkErrors] = useState([]);

  // New Application step form state
  const [appStep, setAppStep] = useState(1); // 1: Scheme, 2: Farmer, 3: Eligibility, 4: Custom Fields, 5: Docs, 6: Declaration
  const [newApp, setNewApp] = useState({
    schemeCode: '',
    farmerId: '',
    data: {},
    docs: {}
  });

  // Return for review checklist popup state
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [returnRemarks, setReturnRemarks] = useState('');
  const [returnChecklist, setReturnChecklist] = useState({
    documents: false,
    bankDetails: false,
    cattleCount: false,
    kycProof: false
  });

  // Rejection modal state
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionCategory, setRejectionCategory] = useState('Farmer not eligible');
  const [rejectionRemarks, setRejectionRemarks] = useState('');

  // Milk Bill / Payment Update state
  const [paymentUpdateModal, setPaymentUpdateModal] = useState(false);
  const [activePaymentApp, setActivePaymentApp] = useState(null);
  const [milkBillNo, setMilkBillNo] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);

  // Helper Translate Function
  const t = (key) => translations[lang][key] || key;

  // Generate Unique Farmer ID
  const generateFarmerId = (dist, soc, member) => {
    return `${dist}-${soc}-${member}`;
  };

  // Add Log Entry Helper
  const addAuditLog = (module, recordType, recordId, action, prev, next, remarks = '') => {
    const newLog = {
      id: auditLogs.length + 1,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: username || 'Secretary (Vattiyoorkavu)',
      role: currentRole,
      module,
      recordType,
      recordId,
      action,
      prevValue: prev,
      newValue: next,
      remarks,
      ipAddress: '10.10.45.122'
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  // Handle Login Flow (direct login — no captcha, no OTP)
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    addAuditLog('Auth', 'Session', '-', 'User Login', 'Logged out', 'Logged in', 'Successful login');
  };

  // Quick role login — enters the portal directly as the chosen role
  // (sidebar already shows only the modules assigned to that role)
  const handleRoleLogin = (roleObj) => {
    setCurrentRole(roleObj.name);
    setUsername(roleObj.username);
    setPassword(roleObj.password);
    setActiveMenu('Dashboard');
    setIsLoggedIn(true);
    addAuditLog('Auth', 'Session', '-', 'Role Quick Login', 'Logged out', 'Logged in', `Quick login as ${roleObj.name}`);
  };

  // Handle Forgot Password
  const handleForgotSend = (e) => {
    e.preventDefault();
    setAuthStep('reset');
  };

  // Handle Forgot Password Reset
  const handleResetPass = (e) => {
    e.preventDefault();
    alert('Password updated successfully. Please login.');
    setAuthStep('login');
  };

  // Create Farmer Form handler
  const handleCreateFarmer = (e) => {
    e.preventDefault();
    const generatedId = generateFarmerId(newFarmer.district, newFarmer.societyId, newFarmer.memberNo);
    const created = {
      ...newFarmer,
      id: generatedId,
      farmerId: generatedId,
      status: 'Pending Verification',
      kycStatus: 'Pending',
      remarks: 'Self-registered by society user'
    };
    setFarmers([created, ...farmers]);
    setIsNewFarmerOpen(false);
    addAuditLog('Farmer Master', 'Farmer', generatedId, 'Create Farmer', 'None', 'Pending Approval', `Farmer ${newFarmer.name} registered`);
    alert(`Farmer created successfully! Unique ID: ${generatedId}`);
  };

  // Modify Farmer Request (Versioned Change simulation)
  const handleRequestModifyFarmer = (farmerId, field, value) => {
    setFarmers(farmers.map(f => {
      if (f.id === farmerId) {
        addAuditLog('Farmer Master', 'Farmer', farmerId, 'Request Modification', `${field}: ${f[field]}`, `${field}: ${value}`, `Modified via version-based approval flow`);
        return { ...f, [field]: value, status: 'Pending Verification' };
      }
      return f;
    }));
    alert('Modification saved as pending version. Supervisor review is required before changes go live.');
  };

  // Approve a pending farmer master record (Field Supervisor / Unit-level)
  const handleApproveFarmer = () => {
    const { farmer } = selectedFarmerApproval;
    setFarmers(farmers.map(f => f.id === farmer.id ? { ...f, status: 'Approved', kycStatus: 'Verified', remarks: farmerApprovalRemarks || 'Approved by supervisor' } : f));
    addAuditLog('Farmer Master', 'Farmer', farmer.farmerId, 'Approve Farmer', 'Pending Verification', 'Approved', farmerApprovalRemarks || 'Approved by supervisor');
    setSelectedFarmerApproval(null);
    setFarmerApprovalRemarks('');
    alert(`Farmer ${farmer.name} approved and is now live.`);
  };

  // Reject a pending farmer master record
  const handleRejectFarmer = () => {
    const { farmer } = selectedFarmerApproval;
    setFarmers(farmers.map(f => f.id === farmer.id ? { ...f, status: 'Rejected', remarks: farmerApprovalRemarks || 'Rejected by reviewer' } : f));
    addAuditLog('Farmer Master', 'Farmer', farmer.farmerId, 'Reject Farmer', 'Pending Verification', 'Rejected', farmerApprovalRemarks || 'Rejected by reviewer');
    setSelectedFarmerApproval(null);
    setFarmerApprovalRemarks('');
    alert(`Farmer ${farmer.name} record rejected.`);
  };

  // Simulating Excel Import for Bulk Upload
  const handleBulkUploadSimulate = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadFile(file);
    
    // Create rich mock preview data
    const preview = [
      { row: 1, name: 'Vijayan Pillai', memberNo: '3045', mobile: '9447551234', bankAccount: '20245598711', status: 'Valid', type: 'New Farmer', error: '' },
      { row: 2, name: 'Anila Kumari', memberNo: '1001', mobile: '9495001122', bankAccount: '30245123987', status: 'Duplicate', type: 'Existing', error: 'Duplicate member number for Society SOC101' },
      { row: 3, name: 'Devadas K.', memberNo: '3046', mobile: '987', bankAccount: '5010041289', status: 'Invalid', type: 'New Farmer', error: 'Invalid mobile number format' },
      { row: 4, name: 'Mary Philip', memberNo: '3047', mobile: '9446882233', bankAccount: '30345091233', status: 'Valid', type: 'New Farmer', error: '' }
    ];
    setBulkPreview(preview);
    setBulkErrors([
      'Row 2: Duplicate member number for Society SOC101',
      'Row 3: Invalid mobile number format (must be 10 digits)'
    ]);
  };

  // Submit Batch Upload
  const handleSubmitBatch = () => {
    const validRows = bulkPreview.filter(p => p.status === 'Valid');
    validRows.forEach(row => {
      const generatedId = generateFarmerId('TVM', 'SOC101', row.memberNo);
      const newF = {
        id: generatedId,
        farmerId: generatedId,
        name: row.name,
        nameMl: row.name,
        fatherSpouse: 'Father Name',
        dob: '1980-01-01',
        gender: 'Male',
        category: 'General',
        membershipDate: '2026-01-01',
        mobile: row.mobile,
        altMobile: '',
        email: '',
        address: 'Society Address',
        village: 'Village',
        panchayat: 'Panchayat',
        taluk: 'Taluk',
        district: 'TVM',
        pin: '695001',
        kycType: 'Aadhaar',
        kycNumber: 'xxxx-xxxx-xxxx',
        bankName: 'SBI',
        bankBranch: 'Branch',
        bankAccount: row.bankAccount,
        bankIfsc: 'SBIN0000000',
        societyId: 'SOC101',
        memberNo: row.memberNo,
        membershipStatus: 'Active',
        milkProducerStatus: 'Active',
        cattleCount: 2,
        landDetails: '20 Cents',
        milkSupplyAvg: 8.5,
        status: 'Approved',
        kycStatus: 'Verified',
        remarks: 'Uploaded via Bulk Excel template'
      };
      farmers.push(newF);
    });
    setFarmers([...farmers]);
    addAuditLog('Farmer Upload', 'Batch', 'Excel Upload', 'Bulk Upload Submitted', '-', `${validRows.length} Farmers Approved`, `Batch processed successfully`);
    alert(`${validRows.length} valid farmers uploaded and verified successfully!`);
    setUploadFile(null);
    setBulkPreview([]);
  };

  // Scheme Form Builder Fields Creator
  const handleAddFieldToBuilder = (type) => {
    const label = `Custom ${type.toUpperCase()} Field`;
    const key = `customField_${Date.now()}`;
    const newField = { key, label, labelMl: label, type, mandatory: false };
    setBuilderFields([...builderFields, newField]);
    setSelectedBuilderField(newField);
  };

  // Open the Create Scheme modal (optionally clear previously built fields)
  const openCreateScheme = (resetFields = true) => {
    setNewScheme({ ...defaultNewScheme });
    if (resetFields) {
      setBuilderFields([]);
      setSelectedBuilderField(null);
    }
    setIsNewSchemeOpen(true);
  };

  // Create Custom Scheme Master — uses real user-entered configuration
  const handleCreateSchemeSubmit = (e) => {
    e.preventDefault();
    if (!newScheme.name.trim()) {
      alert('Please enter a scheme name.');
      return;
    }
    const newS = {
      code: `SCH00${schemes.length + 1}`,
      name: newScheme.name.trim(),
      nameMl: newScheme.nameMl.trim() || newScheme.name.trim(),
      type: newScheme.type,
      description: newScheme.description.trim() || 'Dynamically configured via Form Builder.',
      objective: 'Welfare and operational relief for milk producers.',
      schemeYear: newScheme.schemeYear,
      financialYear: newScheme.schemeYear,
      openDate: newScheme.openDate || '2026-04-01',
      closeDate: newScheme.closeDate || '2027-03-31',
      applicableDistricts: ['TVM', 'KLM', 'PTA', 'ALp'],
      beneficiaryType: newScheme.beneficiaryType,
      maxApplications: 1,
      maxBenefitAmount: Number(newScheme.maxBenefitAmount) || 0,
      budgetAllocation: Number(newScheme.budgetAllocation) || 0,
      utilizedBudget: 0,
      status: 'Published',
      version: '1.0',
      requiredDocs: (newScheme.requiredDocs || '').split(',').map(d => d.trim()).filter(Boolean),
      eligibility: { minCattle: Number(newScheme.minCattle) || 0, minMilkSupply: Number(newScheme.minMilkSupply) || 0, mustBeActive: true },
      fields: builderFields,
      checklist: ['Membership proof verified', 'No outstanding dues with society']
    };
    setSchemes([...schemes, newS]);
    setIsNewSchemeOpen(false);
    setNewScheme({ ...defaultNewScheme });
    setBuilderFields([]);
    setSelectedBuilderField(null);
    addAuditLog('Scheme Master', 'Scheme', newS.code, 'Create Scheme', 'None', 'Published', `Scheme ${newS.name} configured via Dynamic Form Builder`);
    alert(`Scheme "${newS.name}" published successfully! Code: ${newS.code}`);
  };

  // Step Application Flow triggers
  const handleSelectScheme = (code) => {
    const sc = schemes.find(s => s.code === code);
    setNewApp({ ...newApp, schemeCode: code, benefitAmount: sc.maxBenefitAmount * 0.5 });
    setAppStep(2);
  };

  const handleSelectFarmerForApp = (farmerId) => {
    setNewApp({ ...newApp, farmerId });
    setAppStep(3);
  };

  const handleRunEligibilityCheck = () => {
    // Auto validate mock eligibility
    const farmer = farmers.find(f => f.farmerId === newApp.farmerId);
    const scheme = schemes.find(s => s.code === newApp.schemeCode);
    
    let eligible = true;
    let reasons = [];

    if (farmer.cattleCount < scheme.eligibility.minCattle) {
      eligible = false;
      reasons.push(`Cattle count (${farmer.cattleCount}) is less than required (${scheme.eligibility.minCattle})`);
    }
    if (farmer.milkSupplyAvg < scheme.eligibility.minMilkSupply) {
      eligible = false;
      reasons.push(`Average daily milk supply (${farmer.milkSupplyAvg}L) is less than required (${scheme.eligibility.minMilkSupply}L)`);
    }

    setNewApp({
      ...newApp,
      isEligible: eligible,
      eligibilityReason: reasons.join(', ') || 'Passed all requirements'
    });
    setAppStep(4);
  };

  const handleSaveAppDetails = (data) => {
    setNewApp({ ...newApp, data });
    setAppStep(5);
  };

  const handleDocUploadForApp = (docs) => {
    setNewApp({ ...newApp, docs });
    setAppStep(6);
  };

  const handleAppSubmit = () => {
    const farmer = farmers.find(f => f.farmerId === newApp.farmerId);
    const scheme = schemes.find(s => s.code === newApp.schemeCode);
    
    const appIndex = applications.length + 1;
    const refNo = `FSA-2026-0000${124 + appIndex}`;
    const appNo = `TRCMPU/2026-27/${scheme.code}/TVM/0000${124 + appIndex}`;
    
    const submitted = {
      id: `APP202600${appIndex}`,
      appNo,
      refNo,
      farmerId: newApp.farmerId,
      farmerName: farmer.name,
      farmerNameMl: farmer.nameMl,
      societyId: farmer.societyId,
      societyName: 'Vattiyoorkavu Milk Society',
      schemeCode: scheme.code,
      schemeName: scheme.name,
      submissionDate: new Date().toISOString().substring(0, 10),
      status: 'Pending Field Supervisor',
      currentLevel: 'Field Supervisor',
      benefitAmount: newApp.benefitAmount || 5000,
      data: newApp.data,
      documents: scheme.requiredDocs.map(d => ({ name: d, file: 'uploaded_doc.pdf', status: 'Uploaded' })),
      checklistAnswers: {},
      remarksLog: [
        { user: 'Society Secretary', role: 'Society User', action: 'Submitted', date: new Date().toISOString().substring(0, 16).replace('T', ' '), note: 'Submitted via portal.' }
      ],
      paymentStatus: 'Not Initiated',
      milkBillRef: ''
    };

    setApplications([submitted, ...applications]);
    addAuditLog('Applications', 'Application', refNo, 'Submit Application', 'None', 'Pending Field Supervisor', `Application submitted for ${farmer.name}`);
    alert(`Application submitted successfully! Ref No: ${refNo}`);
    setAppStep(1);
    setActiveMenu('Dashboard');
  };

  // Workflow Approval Handler
  const handleApproveWorkflow = (app) => {
    const levels = [
      'Field Supervisor', 
      'P&I Officer', 
      'Section Head', 
      'Unit Head', 
      'Functional Head', 
      'Managing Director', 
      'Finance'
    ];
    
    const currentIdx = levels.indexOf(app.currentLevel);
    let nextLevel = '';
    let nextStatus = '';

    if (currentIdx < levels.length - 1) {
      nextLevel = levels[currentIdx + 1];
      nextStatus = `Pending ${nextLevel}`;
    } else {
      nextLevel = 'Finance';
      nextStatus = 'Approved';
    }

    const updated = {
      ...app,
      currentLevel: nextLevel,
      status: nextStatus,
      remarksLog: [
        ...app.remarksLog,
        {
          user: username || 'Verified Officer',
          role: currentRole,
          action: 'Approved',
          date: new Date().toISOString().substring(0, 16).replace('T', ' '),
          note: 'Checked details and recommended for approval.'
        }
      ]
    };

    if (app.currentLevel === 'Managing Director') {
      updated.paymentStatus = 'Awaiting Finance Approval';
    }

    setApplications(applications.map(a => a.id === app.id ? updated : a));
    setSelectedApplication(null);
    addAuditLog('Applications', 'Workflow', app.refNo, 'Approve Step', app.status, nextStatus, `Approved by ${currentRole}`);
    alert(`Application successfully approved and forwarded to: ${nextLevel}`);
  };

  // Return to Review
  const handleReturnToReviewSubmit = () => {
    const list = Object.keys(returnChecklist).filter(k => returnChecklist[k]).join(', ');
    const updated = {
      ...selectedApplication,
      status: 'Returned for Review',
      currentLevel: 'Society',
      remarksLog: [
        ...selectedApplication.remarksLog,
        {
          user: username || 'Officer',
          role: currentRole,
          action: 'Returned',
          date: new Date().toISOString().substring(0, 16).replace('T', ' '),
          note: `Returned for Correction. Missing/Invalid: ${list}. Notes: ${returnRemarks}`
        }
      ]
    };
    setApplications(applications.map(a => a.id === selectedApplication.id ? updated : a));
    setReturnModalOpen(false);
    setSelectedApplication(null);
    addAuditLog('Applications', 'Workflow', selectedApplication.refNo, 'Return to Review', selectedApplication.status, 'Returned for Review', `Returned by ${currentRole}: ${returnRemarks}`);
    alert('Application returned to Society for correction.');
  };

  // Final Rejection
  const handleRejectionSubmit = () => {
    const updated = {
      ...selectedApplication,
      status: 'Rejected',
      currentLevel: 'Completed',
      remarksLog: [
        ...selectedApplication.remarksLog,
        {
          user: username || 'Officer',
          role: currentRole,
          action: 'Rejected',
          date: new Date().toISOString().substring(0, 16).replace('T', ' '),
          note: `Rejected [Category: ${rejectionCategory}]: ${rejectionRemarks}`
        }
      ]
    };
    setApplications(applications.map(a => a.id === selectedApplication.id ? updated : a));
    setRejectionModalOpen(false);
    setSelectedApplication(null);
    addAuditLog('Applications', 'Workflow', selectedApplication.refNo, 'Reject Application', selectedApplication.status, 'Rejected', `Rejected by ${currentRole}: ${rejectionRemarks}`);
    alert('Application permanently rejected.');
  };

  // Generate Consolidated Statement
  const handleCreateStatement = () => {
    const appsToGroup = applications.filter(a => a.status === 'Pending Section Head' && a.societyId === 'SOC101');
    if (appsToGroup.length === 0) {
      alert('No eligible section-level applications available to consolidate.');
      return;
    }

    const stmtId = `STMT202600${statements.length + 1}`;
    const stmtNo = `CS-2026-07-00${statements.length + 1}`;
    const totalAmount = appsToGroup.reduce((acc, curr) => acc + curr.benefitAmount, 0);

    const newStmt = {
      id: stmtId,
      stmtNo,
      schemeCode: appsToGroup[0].schemeCode,
      schemeName: appsToGroup[0].schemeName,
      district: 'TVM',
      unit: 'TVM-UNIT',
      societyId: 'SOC101',
      societyName: 'Vattiyoorkavu Milk Society',
      createdDate: new Date().toISOString().substring(0, 10),
      createdBy: `${username} (${currentRole})`,
      totalApplications: appsToGroup.length,
      totalAmount,
      status: 'Pending Verification',
      applications: appsToGroup.map(a => a.id)
    };

    setStatements([...statements, newStmt]);
    addAuditLog('Consolidation', 'Statement', stmtNo, 'Generate Statement', '-', 'Pending Verification', `Consolidated ${appsToGroup.length} applications`);
    alert(`Consolidated statement generated: ${stmtNo}`);
  };

  // Finance Payment processing
  const handlePaymentUpdateSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...activePaymentApp,
      paymentStatus: 'Paid',
      milkBillRef: milkBillNo,
      status: 'Completed',
      remarksLog: [
        ...activePaymentApp.remarksLog,
        {
          user: username || 'Accounts Head',
          role: 'Finance Head',
          action: 'Paid',
          date: new Date().toISOString().substring(0, 16).replace('T', ' '),
          note: `Payment processed. Milk Bill Reference: ${milkBillNo}. Disbursed Amount: ₹${paymentAmount}`
        }
      ]
    };
    
    setApplications(applications.map(a => a.id === activePaymentApp.id ? updated : a));
    setBudgetAllocation({
      ...budgetAllocation,
      utilized: budgetAllocation.utilized + activePaymentApp.benefitAmount
    });
    setPaymentUpdateModal(false);
    addAuditLog('Finance', 'Payment', activePaymentApp.refNo, 'Update Payment Status', 'Awaiting Finance Approval', 'Paid', `Paid ₹${paymentAmount} via Milk Bill Ref ${milkBillNo}`);
    alert(`Payment recorded successfully! Status updated to Paid.`);
  };

  // Support Ticket Form Submit
  const handleCreateTicket = (e) => {
    e.preventDefault();
    const tNo = `TKT-2026-00${tickets.length + 1}`;
    const newT = {
      id: `TKT-100${tickets.length + 1}`,
      ticketNo: tNo,
      user: 'Secretary (Vattiyoorkavu)',
      society: 'Vattiyoorkavu Milk Society',
      module: 'Applications',
      category: 'General Inquiry',
      priority: 'Low',
      subject: 'Inquiry regarding feed scheme close date extension',
      description: 'Will the scheme close date be extended past December?',
      status: 'Open',
      resolution: '',
      createdDate: new Date().toISOString().substring(0, 16).replace('T', ' '),
      closedDate: ''
    };
    setTickets([newT, ...tickets]);
    setIsNewTicketOpen(false);
    addAuditLog('Helpdesk', 'Ticket', tNo, 'Raise Support Ticket', '-', 'Open', `Support ticket created`);
    alert(`Support ticket raised successfully. Ticket No: ${tNo}`);
  };

  // Resolve the themed background image + readability overlay for the active page
  const pagePhoto = PAGE_BACKGROUNDS[activeMenu];
  const mainBgStyle = pagePhoto ? {
    backgroundImage: `linear-gradient(135deg, rgba(247,250,252,0.66) 0%, rgba(236,244,240,0.40) 100%), url('${pagePhoto}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  } : undefined;

  return (
    <div id="root">
      {/* Session Expired / Timeout Alert */}
      {sessionExpired && (
        <div className="modal-overlay">
          <div className="auth-card text-center" style={{textAlign: 'center'}}>
            <div className="logo-circle" style={{margin: '0 auto 16px auto'}}><Clock size={24}/></div>
            <h3 style={{fontSize: '18px', fontWeight: '700', marginBottom: '8px'}}>Session Expired</h3>
            <p style={{color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px'}}>Your login session has timed out due to inactivity. Please re-authenticate.</p>
            <button className="btn btn-primary" style={{width: '100%'}} onClick={() => { setSessionExpired(false); setIsLoggedIn(false); setAuthStep('login'); }}>Login Again</button>
          </div>
        </div>
      )}

      {/* 1. AUTHENTICATION MODULE VIEW */}
      {!isLoggedIn && !sessionExpired && (
        <Auth
          authStep={authStep}
          setAuthStep={setAuthStep}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          lang={lang}
          setLang={setLang}
          handleLogin={handleLogin}
          handleForgotSend={handleForgotSend}
          handleResetPass={handleResetPass}
          demoRoles={demoRoles}
          handleRoleLogin={handleRoleLogin}
          t={t}
        />
      )}

      {/* 2. ERP APPLICATION VIEW (LOGGED IN) */}
      {isLoggedIn && (
        <div className="app-layout">
          {/* MOBILE SIDEBAR BACKDROP */}
          {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}

          {/* SIDEBAR NAVIGATION PANEL */}
          <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <div className="auth-logo">
                <div className="logo-circle" style={{background: 'linear-gradient(135deg, var(--primary-color), #0ea5e9)'}}>M</div>
                <div className="logo-text">
                  <h2 style={{fontFamily: 'var(--font-display)', fontSize: '15px'}}>{t('title')}</h2>
                  <p style={{fontSize: '9px'}}>{t('tagline')}</p>
                </div>
              </div>
            </div>

            <nav className="sidebar-menu">
              <div className="menu-section-title">Main Portal</div>
              <div className={`menu-item ${activeMenu === 'Dashboard' ? 'active' : ''}`} onClick={() => setActiveMenu('Dashboard')}>
                <Layers size={18}/>
                <span>{t('dashboard')}</span>
              </div>
              
              {/* Role-based conditional sidebars */}
              {['Society User', 'Super Administrator'].includes(currentRole) && (
                <>
                  <div className="menu-section-title">Farmer Activities</div>
                  <div className={`menu-item ${activeMenu === 'Farmers' ? 'active' : ''}`} onClick={() => setActiveMenu('Farmers')}>
                    <Users size={18}/>
                    <span>{t('farmers')}</span>
                  </div>
                  <div className={`menu-item ${activeMenu === 'BulkUpload' ? 'active' : ''}`} onClick={() => setActiveMenu('BulkUpload')}>
                    <Upload size={18}/>
                    <span>{t('bulkUpload')}</span>
                  </div>
                  <div className={`menu-item ${activeMenu === 'SubmitApp' ? 'active' : ''}`} onClick={() => setActiveMenu('SubmitApp')}>
                    <FileText size={18}/>
                    <span>{t('submitApp')}</span>
                  </div>
                </>
              )}

              {/* Approval queues for supervisors, officers, managers */}
              {currentRole !== 'Society User' && (
                <>
                  <div className="menu-section-title">Verification Workflow</div>
                  <div className={`menu-item ${activeMenu === 'ApprovalQueue' ? 'active' : ''}`} onClick={() => setActiveMenu('ApprovalQueue')}>
                    <CheckSquare size={18}/>
                    <span>{t('approvalQueue')}</span>
                  </div>
                  {['Field Supervisor', 'Unit Head', 'Super Administrator'].includes(currentRole) && (
                    <div className={`menu-item ${activeMenu === 'FarmerApproval' ? 'active' : ''}`} onClick={() => setActiveMenu('FarmerApproval')}>
                      <Users size={18}/>
                      <span>{t('farmerApproval')}</span>
                    </div>
                  )}
                  {['P&I Officer', 'Section Head', 'Unit Head', 'Super Administrator'].includes(currentRole) && (
                    <div className={`menu-item ${activeMenu === 'Statements' ? 'active' : ''}`} onClick={() => setActiveMenu('Statements')}>
                      <Layers size={18}/>
                      <span>{t('statements')}</span>
                    </div>
                  )}
                </>
              )}

              {/* Finance Management */}
              {['Finance Head', 'Super Administrator'].includes(currentRole) && (
                <>
                  <div className="menu-section-title">Finance & Accounts</div>
                  <div className={`menu-item ${activeMenu === 'Finance' ? 'active' : ''}`} onClick={() => setActiveMenu('Finance')}>
                    <CreditCard size={18}/>
                    <span>{t('finance')}</span>
                  </div>
                </>
              )}

              {/* Admin configuration & builder */}
              {['Super Administrator', 'Section Head'].includes(currentRole) && (
                <>
                  <div className="menu-section-title">Administration</div>
                  <div className={`menu-item ${activeMenu === 'Schemes' ? 'active' : ''}`} onClick={() => setActiveMenu('Schemes')}>
                    <Award size={18}/>
                    <span>{t('schemes')}</span>
                  </div>
                  <div className={`menu-item ${activeMenu === 'FormBuilder' ? 'active' : ''}`} onClick={() => setActiveMenu('FormBuilder')}>
                    <Settings size={18}/>
                    <span>{t('formBuilder')}</span>
                  </div>
                </>
              )}

              {/* Reports & Insights — visible to all roles (URS §12) */}
              <div className="menu-section-title">{t('reportsSection')}</div>
              <div className={`menu-item ${activeMenu === 'Reports' ? 'active' : ''}`} onClick={() => setActiveMenu('Reports')}>
                <FileSpreadsheet size={18}/>
                <span>{t('reports')}</span>
              </div>
              <div className={`menu-item ${activeMenu === 'Tracking' ? 'active' : ''}`} onClick={() => setActiveMenu('Tracking')}>
                <Search size={18}/>
                <span>{t('tracking')}</span>
              </div>

              <div className="menu-section-title">Operations</div>
              <div className={`menu-item ${activeMenu === 'Helpdesk' ? 'active' : ''}`} onClick={() => setActiveMenu('Helpdesk')}>
                <HelpCircle size={18}/>
                <span>{t('helpdesk')}</span>
              </div>
              <div className={`menu-item ${activeMenu === 'Audit' ? 'active' : ''}`} onClick={() => setActiveMenu('Audit')}>
                <Shield size={18}/>
                <span>{t('audit')}</span>
              </div>
            </nav>

            <div className="sidebar-footer">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontSize: '11px', color: 'var(--text-muted)'}}>Ver. 1.2.0-Prod</span>
                <span style={{color: '#f43f5e', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '600'}} onClick={() => setIsLoggedIn(false)}>
                  <LogOut size={14}/> {t('logout')}
                </span>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE MAIN PAGE WRAPPER */}
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0}}>
            {/* TOP HEADER */}
            <header className="top-nav">
              <button className="menu-toggle" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
                <Menu size={20} />
              </button>
              <div className="nav-greeting">
                <span className="hello">{(() => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; })()}, {username.split('_')[0]}</span>
                <span className="sub">{currentRole} · Trivandrum Dairy </span>
              </div>

              <div className="nav-search">
                <Search size={15} style={{color: 'var(--text-light)'}}/>
                <input type="text" placeholder={t('search')} />
              </div>

              <div className="nav-actions">
                {/* LANG SWITCHER */}
                <button className="language-btn" onClick={() => setLang(lang === 'en' ? 'ml' : 'en')}>
                  <Globe size={15}/>
                  <span>{t('lang')}</span>
                </button>

                {/* NOTIFICATIONS TRAY */}
                <button className="icon-btn" onClick={() => alert('Notifications Panel: 2 Unread items.')}>
                  <Bell size={18}/>
                  <span className="badge-dot"></span>
                </button>

                {/* USER PROFILE */}
                <div className="user-profile" onClick={() => setSessionExpired(true)}>
                  <div className="user-avatar">
                    {username.substring(0, 2).toUpperCase()}
                  </div>
                  <div style={{lineHeight: 1.2}}>
                    <div style={{fontSize: '13px', fontWeight: '600'}}>{username}</div>
                    <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>{currentRole}</div>
                  </div>
                </div>
              </div>
            </header>

            {/* MAIN PORTAL AREA */}
            <main className="main-content page-bg" style={mainBgStyle}>
              {activeMenu === 'Dashboard' && (
                <Dashboard 
                  farmers={farmers}
                  schemes={schemes}
                  applications={applications}
                  budgetAllocation={budgetAllocation}
                  currentRole={currentRole}
                  username={username}
                  notifications={notifications}
                  setSelectedApplication={setSelectedApplication}
                  setActiveMenu={setActiveMenu}
                  t={t}
                />
              )}

              {activeMenu === 'Farmers' && (
                <Farmers
                  farmers={farmers}
                  farmerSearch={farmerSearch}
                  setFarmerSearch={setFarmerSearch}
                  farmerDistrictFilter={farmerDistrictFilter}
                  setFarmerDistrictFilter={setFarmerDistrictFilter}
                  setSelectedFarmer={setSelectedFarmer}
                  handleRequestModifyFarmer={handleRequestModifyFarmer}
                  setIsNewFarmerOpen={setIsNewFarmerOpen}
                  t={t}
                />
              )}

              {activeMenu === 'BulkUpload' && (
                <BulkUpload
                  uploadFile={uploadFile}
                  handleBulkUploadSimulate={handleBulkUploadSimulate}
                  handleSubmitBatch={handleSubmitBatch}
                  bulkPreview={bulkPreview}
                  t={t}
                />
              )}

              {activeMenu === 'Schemes' && (
                <Schemes
                  schemes={schemes}
                  onCreateScheme={() => openCreateScheme(true)}
                  t={t}
                />
              )}

              {activeMenu === 'FormBuilder' && (
                <FormBuilder
                  builderFields={builderFields}
                  setBuilderFields={setBuilderFields}
                  selectedBuilderField={selectedBuilderField}
                  setSelectedBuilderField={setSelectedBuilderField}
                  handleAddFieldToBuilder={handleAddFieldToBuilder}
                  onPublishScheme={() => openCreateScheme(false)}
                  t={t}
                />
              )}

              {activeMenu === 'SubmitApp' && (
                <SubmitApp
                  appStep={appStep}
                  setAppStep={setAppStep}
                  schemes={schemes}
                  newApp={newApp}
                  handleSelectScheme={handleSelectScheme}
                  handleSelectFarmerForApp={handleSelectFarmerForApp}
                  farmers={farmers}
                  farmerSearch={farmerSearch}
                  setFarmerSearch={setFarmerSearch}
                  handleRunEligibilityCheck={handleRunEligibilityCheck}
                  handleSaveAppDetails={handleSaveAppDetails}
                  handleDocUploadForApp={handleDocUploadForApp}
                  handleAppSubmit={handleAppSubmit}
                  t={t}
                />
              )}

              {activeMenu === 'ApprovalQueue' && (
                <ApprovalQueue
                  applications={applications}
                  currentRole={currentRole}
                  setSelectedApplication={setSelectedApplication}
                  t={t}
                />
              )}

              {activeMenu === 'Statements' && (
                <Statements
                  statements={statements}
                  currentRole={currentRole}
                  handleCreateStatement={handleCreateStatement}
                  setSelectedStatement={setSelectedStatement}
                />
              )}

              {activeMenu === 'Finance' && (
                <Finance
                  budgetAllocation={budgetAllocation}
                  applications={applications}
                  schemes={schemes}
                  financeBreakdown={financeBreakdown}
                  setActivePaymentApp={setActivePaymentApp}
                  setMilkBillNo={setMilkBillNo}
                  setPaymentAmount={setPaymentAmount}
                  setPaymentUpdateModal={setPaymentUpdateModal}
                />
              )}

              {activeMenu === 'Audit' && (
                <Audit
                  auditLogs={auditLogs}
                />
              )}

              {activeMenu === 'Reports' && (
                <Reports
                  schemes={schemes}
                  applications={applications}
                  statements={statements}
                  farmers={farmers}
                  districts={initialDistricts}
                  societies={initialSocieties}
                  t={t}
                />
              )}

              {activeMenu === 'Tracking' && (
                <Tracking applications={applications} t={t} />
              )}

              {activeMenu === 'FarmerApproval' && (
                <FarmerApproval
                  farmers={farmers}
                  currentRole={currentRole}
                  setSelectedFarmerApproval={setSelectedFarmerApproval}
                  setSelectedFarmer={setSelectedFarmer}
                  t={t}
                />
              )}

              {activeMenu === 'Helpdesk' && (
                <Helpdesk
                  tickets={tickets}
                  setIsNewTicketOpen={setIsNewTicketOpen}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* DIALOG: FARMER MASTER APPROVAL / REJECTION (URS §4) */}
      {selectedFarmerApproval && (
        <div className="modal-overlay" style={{zIndex: 110}}>
          <div className="auth-card">
            <h3 style={{fontWeight: '700', fontSize: '16px', marginBottom: '8px', color: selectedFarmerApproval.action === 'reject' ? '#ef4444' : 'var(--text-main)'}}>
              {selectedFarmerApproval.action === 'reject' ? 'Reject' : 'Approve'} Farmer Record
            </h3>
            <p style={{fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px'}}>
              {selectedFarmerApproval.farmer.name} · <span style={{fontFamily: 'monospace'}}>{selectedFarmerApproval.farmer.farmerId}</span>
            </p>
            <div className="form-group" style={{marginBottom: '16px'}}>
              <label>Remarks</label>
              <textarea className="form-textarea" placeholder="Add remarks for this decision (recorded in audit log)..." value={farmerApprovalRemarks} onChange={e => setFarmerApprovalRemarks(e.target.value)} />
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn btn-secondary" style={{flex: 1}} onClick={() => { setSelectedFarmerApproval(null); setFarmerApprovalRemarks(''); }}>Cancel</button>
              <button className={selectedFarmerApproval.action === 'reject' ? 'btn btn-danger' : 'btn btn-primary'} style={{flex: 1}} onClick={selectedFarmerApproval.action === 'reject' ? handleRejectFarmer : handleApproveFarmer}>
                Confirm {selectedFarmerApproval.action === 'reject' ? 'Reject' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG: CONFIGURE / CREATE NEW SCHEME (URS §5) */}
      {isNewSchemeOpen && (
        <div className="modal-overlay">
          <form className="modal-content" style={{ maxWidth: '840px' }} onSubmit={handleCreateSchemeSubmit}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontWeight: '700', fontSize: '17px' }}>Configure New Scheme</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Define scheme details, eligibility, required documents and application fields.</p>
              </div>
              <button type="button" onClick={() => setIsNewSchemeOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>×</button>
            </div>
            <div className="modal-body" style={{ maxHeight: '72vh', overflowY: 'auto' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.5px' }}>Scheme Details</label>
              <div className="form-grid" style={{ marginTop: '10px' }}>
                <div className="form-group">
                  <label>Scheme Name (English) <span className="required">*</span></label>
                  <input type="text" className="form-input" value={newScheme.name} onChange={e => setNewScheme({ ...newScheme, name: e.target.value })} placeholder="e.g. Calf Rearing Subsidy 2026" required />
                </div>
                <div className="form-group">
                  <label>Scheme Name (Malayalam)</label>
                  <input type="text" className="form-input" value={newScheme.nameMl} onChange={e => setNewScheme({ ...newScheme, nameMl: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Scheme Type</label>
                  <select className="form-select" value={newScheme.type} onChange={e => setNewScheme({ ...newScheme, type: e.target.value })}>
                    <option>Subsidy</option>
                    <option>Subsidy Support</option>
                    <option>Capital Support</option>
                    <option>Welfare Grant</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Financial Year</label>
                  <input type="text" className="form-input" value={newScheme.schemeYear} onChange={e => setNewScheme({ ...newScheme, schemeYear: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Open Date</label>
                  <input type="date" className="form-input" value={newScheme.openDate} onChange={e => setNewScheme({ ...newScheme, openDate: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Close Date</label>
                  <input type="date" className="form-input" value={newScheme.closeDate} onChange={e => setNewScheme({ ...newScheme, closeDate: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Max Benefit Amount (₹)</label>
                  <input type="number" className="form-input" value={newScheme.maxBenefitAmount} onChange={e => setNewScheme({ ...newScheme, maxBenefitAmount: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Budget Allocation (₹)</label>
                  <input type="number" className="form-input" value={newScheme.budgetAllocation} onChange={e => setNewScheme({ ...newScheme, budgetAllocation: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Beneficiary Type</label>
                  <input type="text" className="form-input" value={newScheme.beneficiaryType} onChange={e => setNewScheme({ ...newScheme, beneficiaryType: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Required Documents (comma separated)</label>
                  <input type="text" className="form-input" value={newScheme.requiredDocs} onChange={e => setNewScheme({ ...newScheme, requiredDocs: e.target.value })} />
                </div>
              </div>

              <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.5px', display: 'block', marginTop: '20px' }}>Eligibility &amp; Description</label>
              <div className="form-grid" style={{ marginTop: '10px' }}>
                <div className="form-group">
                  <label>Minimum Cattle Count</label>
                  <input type="number" className="form-input" value={newScheme.minCattle} onChange={e => setNewScheme({ ...newScheme, minCattle: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Minimum Milk Supply (L/day)</label>
                  <input type="number" className="form-input" value={newScheme.minMilkSupply} onChange={e => setNewScheme({ ...newScheme, minMilkSupply: e.target.value })} />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Description / Objective</label>
                  <textarea className="form-textarea" value={newScheme.description} onChange={e => setNewScheme({ ...newScheme, description: e.target.value })} placeholder="Briefly describe the scheme and its objective..." />
                </div>
              </div>

              <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.5px', display: 'block', marginTop: '20px', marginBottom: '10px' }}>Custom Application Fields</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {['text', 'number', 'date', 'select', 'file'].map(tp => (
                  <button key={tp} type="button" className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '12px', textTransform: 'capitalize' }} onClick={() => handleAddFieldToBuilder(tp)}>
                    <Plus size={12} /> {tp}
                  </button>
                ))}
              </div>
              {builderFields.length === 0 ? (
                <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>No custom fields added — the application form will capture standard farmer and scheme data only.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {builderFields.map(f => (
                    <div key={f.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', background: '#F8FAFC', border: '1px solid var(--hairline)', borderRadius: '10px' }}>
                      <span style={{ fontSize: '13px' }}>{f.label} <span style={{ color: 'var(--text-light)', fontSize: '11px' }}>({f.type}{f.mandatory ? ' · required' : ''})</span></span>
                      <button type="button" className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => setBuilderFields(builderFields.filter(x => x.key !== f.key))}>Remove</button>
                    </div>
                  ))}
                </div>
              )}
              <p style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '10px' }}>Tip: use the dedicated Form Builder to set Malayalam labels and field constraints.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setIsNewSchemeOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Publish Scheme</button>
            </div>
          </form>
        </div>
      )}

      {/* FARMER DETAIL MODAL POPUP */}
      {selectedFarmer && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{fontWeight: '700', fontSize: '18px'}}>Farmer Details: {selectedFarmer.name}</h3>
              <button onClick={() => setSelectedFarmer(null)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px'}}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item"><span className="detail-label">Unique Farmer ID</span><span className="detail-val">{selectedFarmer.farmerId}</span></div>
                <div className="detail-item"><span className="detail-label">District</span><span className="detail-val">{selectedFarmer.district}</span></div>
                <div className="detail-item"><span className="detail-label">Society ID</span><span className="detail-val">{selectedFarmer.societyId}</span></div>
                <div className="detail-item"><span className="detail-label">Member Number</span><span className="detail-val">{selectedFarmer.memberNo}</span></div>
                <div className="detail-item"><span className="detail-label">Cattle Count</span><span className="detail-val">{selectedFarmer.cattleCount} Cows</span></div>
                <div className="detail-item"><span className="detail-label">Average supply</span><span className="detail-val">{selectedFarmer.milkSupplyAvg} Liters/Day</span></div>
                <div className="detail-item"><span className="detail-label">Bank Account</span><span className="detail-val">{selectedFarmer.bankName} - {selectedFarmer.bankAccount}</span></div>
                <div className="detail-item"><span className="detail-label">KYC Verification</span><span className="detail-val">{selectedFarmer.kycType}: {selectedFarmer.kycNumber}</span></div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedFarmer(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* APPLICATION DETAIL & WORKFLOW VERIFICATION POPUP */}
      {selectedApplication && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: '900px'}}>
            <div className="modal-header">
              <div>
                <h3 style={{fontWeight: '700', fontSize: '16px'}}>Application Review: {selectedApplication.refNo}</h3>
                <p style={{fontSize: '12px', color: 'var(--text-muted)'}}>{selectedApplication.schemeName}</p>
              </div>
              <button onClick={() => setSelectedApplication(null)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px'}}>×</button>
            </div>
            
            <div className="modal-body split-pane">
              {/* Left pane: application data */}
              <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <div style={{padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px'}}>
                  <h4 style={{fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px'}}>Farmer Info</h4>
                  <p style={{fontSize: '14px'}}><strong>Name:</strong> {selectedApplication.farmerName} ({selectedApplication.farmerId})</p>
                  <p style={{fontSize: '14px', marginTop: '4px'}}><strong>Society:</strong> {selectedApplication.societyName}</p>
                </div>

                <div style={{padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px'}}>
                  <h4 style={{fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px'}}>Custom Scheme Details</h4>
                  {Object.keys(selectedApplication.data).map(k => (
                    <p style={{fontSize: '14px', key: k}}><strong style={{textTransform: 'capitalize'}}>{k}:</strong> {selectedApplication.data[k]}</p>
                  ))}
                </div>

                <div>
                  <h4 style={{fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px'}}>Uploaded Documents</h4>
                  <div style={{display: 'flex', gap: '10px'}}>
                    {selectedApplication.documents.map((d, i) => (
                      <div key={i} style={{flex: 1, padding: '10px', border: '1px solid var(--border-color)', borderRadius: '6px', textAlign: 'center', backgroundColor: '#fff', cursor: 'pointer'}} onClick={() => alert('PDF Document Preview loaded with TRCMPU watermark')}>
                        <span style={{fontSize: '12px', fontWeight: '600'}}>{d.name}</span>
                        <div style={{fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px'}}>Preview PDF</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification timeline history */}
                <div>
                  <h4 style={{fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px'}}>Verification Progress</h4>
                  <div className="timeline">
                    {selectedApplication.remarksLog.map((log, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-marker">
                          <div className="timeline-dot active"></div>
                          <div className="timeline-line"></div>
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <span>{log.role} ({log.user})</span>
                            <span style={{color: 'var(--text-light)', fontWeight: '400'}}>{log.date}</span>
                          </div>
                          <div style={{fontSize: '12px', fontWeight: '600', color: 'var(--primary-color)'}}>{log.action}</div>
                          <div className="timeline-note">{log.note}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right pane: Checklist & Workflow actions */}
              <div className="verification-checklist-box">
                <h4 style={{fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '12px'}}>Verification Checklist</h4>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  <label className="checklist-item">
                    <input type="checkbox" defaultChecked />
                    <span style={{fontSize: '13px'}}>Farmer membership verified & active</span>
                  </label>
                  <label className="checklist-item">
                    <input type="checkbox" defaultChecked />
                    <span style={{fontSize: '13px'}}>Aadhaar identity documentation matches</span>
                  </label>
                  <label className="checklist-item">
                    <input type="checkbox" defaultChecked />
                    <span style={{fontSize: '13px'}}>Cattle census count verification</span>
                  </label>
                  <label className="checklist-item">
                    <input type="checkbox" defaultChecked />
                    <span style={{fontSize: '13px'}}>No duplicate benefits claimed in scheme year</span>
                  </label>
                </div>

                {/* Workflow Actions */}
                <div style={{marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  {selectedApplication.currentLevel !== 'Completed' && (
                    <>
                      <button className="btn btn-primary" style={{width: '100%'}} onClick={() => handleApproveWorkflow(selectedApplication)}>
                        Verify & Forward (Approve)
                      </button>
                      <button className="btn btn-warning" style={{width: '100%'}} onClick={() => setReturnModalOpen(true)}>
                        {t('return')}
                      </button>
                      {['Section Head', 'Functional Head', 'Super Administrator'].includes(currentRole) && (
                        <button className="btn btn-danger" style={{width: '100%'}} onClick={() => setRejectionModalOpen(true)}>
                          {t('reject')}
                        </button>
                      )}
                    </>
                  )}
                  <button className="btn btn-secondary" style={{width: '100%'}} onClick={() => setSelectedApplication(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED STATEMENT MODAL VIEW */}
      {selectedStatement && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{fontWeight: '700', fontSize: '18px'}}>Statement Details: {selectedStatement.stmtNo}</h3>
              <button onClick={() => setSelectedStatement(null)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px'}}>×</button>
            </div>
            <div className="modal-body">
              <p style={{marginBottom: '12px'}}><strong>Consolidated applications ({selectedStatement.applications.length}):</strong></p>
              <div className="table-responsive">
                <table className="app-table">
                  <thead>
                    <tr>
                      <th>Ref No</th>
                      <th>Applicant Name</th>
                      <th>Society</th>
                      <th>Identity Document</th>
                      <th>Scheme-specific Fields</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStatement.applications.map(appId => {
                      const app = applications.find(a => a.id === appId);
                      const farmer = app ? farmers.find(f => f.farmerId === app.farmerId) : null;
                      return (
                        <tr key={appId}>
                          <td><span style={{fontFamily: 'monospace', fontWeight: '600'}}>{app?.refNo || '—'}</span></td>
                          <td>{app?.farmerName || '—'}</td>
                          <td>{app?.societyName || '—'}</td>
                          <td style={{fontSize: '12px'}}>{farmer ? `${farmer.kycType}: ${farmer.kycNumber}` : '—'}</td>
                          <td style={{fontSize: '11px', maxWidth: '220px'}}>{app ? Object.entries(app.data).map(([k, v]) => `${k}: ${v}`).join(', ') : '—'}</td>
                          <td>₹{(app?.benefitAmount || 0).toLocaleString()}</td>
                          <td>
                            <span className={`badge badge-${app?.status === 'Approved' || app?.status === 'Completed' ? 'approved' : 'pending'}`}>{app?.status || '—'}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              {currentRole === 'Section Head' && (
                <button className="btn btn-primary" onClick={() => {
                  setStatements(statements.map(s => s.id === selectedStatement.id ? { ...s, status: 'Approved' } : s));
                  setSelectedStatement(null);
                  alert('Statement approved successfully!');
                }}>
                  Approve Statement
                </button>
              )}
              <button className="btn btn-secondary" onClick={() => setSelectedStatement(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG: RETURN FOR REVIEW MODAL */}
      {returnModalOpen && (
        <div className="modal-overlay" style={{zIndex: 110}}>
          <div className="auth-card">
            <h3 style={{fontWeight: '700', fontSize: '16px', marginBottom: '12px'}}>Return for Review</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px'}}>
              <label><input type="checkbox" onChange={e => setReturnChecklist({...returnChecklist, documents: e.target.checked})}/> Invalid/Missing Documents</label>
              <label><input type="checkbox" onChange={e => setReturnChecklist({...returnChecklist, bankDetails: e.target.checked})}/> Incorrect Bank Details</label>
              <label><input type="checkbox" onChange={e => setReturnChecklist({...returnChecklist, cattleCount: e.target.checked})}/> Cattle Count mismatch</label>
            </div>
            <div className="form-group" style={{marginBottom: '16px'}}>
              <label>Detailed Correction Remarks</label>
              <textarea className="form-textarea" placeholder="Provide instructions for correction..." value={returnRemarks} onChange={e => setReturnRemarks(e.target.value)} required></textarea>
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn btn-secondary" style={{flex: 1}} onClick={() => setReturnModalOpen(false)}>Cancel</button>
              <button className="btn btn-warning" style={{flex: 1}} onClick={handleReturnToReviewSubmit}>Confirm Return</button>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG: REJECTION MODAL */}
      {rejectionModalOpen && (
        <div className="modal-overlay" style={{zIndex: 110}}>
          <div className="auth-card">
            <h3 style={{fontWeight: '700', fontSize: '16px', marginBottom: '12px', color: '#ef4444'}}>Reject Application</h3>
            <div className="form-group" style={{marginBottom: '12px'}}>
              <label>Rejection Category</label>
              <select className="form-select" value={rejectionCategory} onChange={e => setRejectionCategory(e.target.value)}>
                <option value="Farmer not eligible">Farmer not eligible</option>
                <option value="Duplicate benefit">Duplicate benefit</option>
                <option value="Incorrect declaration">Incorrect declaration</option>
                <option value="Budget unavailable">Budget unavailable</option>
              </select>
            </div>
            <div className="form-group" style={{marginBottom: '16px'}}>
              <label>Rejection Remarks</label>
              <textarea className="form-textarea" placeholder="Explain the exact reasons for rejection..." value={rejectionRemarks} onChange={e => setRejectionRemarks(e.target.value)} required></textarea>
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button className="btn btn-secondary" style={{flex: 1}} onClick={() => setRejectionModalOpen(false)}>Cancel</button>
              <button className="btn btn-danger" style={{flex: 1}} onClick={handleRejectionSubmit}>Confirm Reject</button>
            </div>
          </div>
        </div>
      )}

      {/* DIALOG: PAYMENT STATUS UPDATE MODAL */}
      {paymentUpdateModal && (
        <div className="modal-overlay">
          <form className="auth-card" onSubmit={handlePaymentUpdateSubmit}>
            <h3 style={{fontWeight: '700', fontSize: '16px', marginBottom: '12px'}}>Record Disbursed Payment</h3>
            <div className="form-group" style={{marginBottom: '12px'}}>
              <label>Milk Bill Reference Number</label>
              <input type="text" className="form-input" value={milkBillNo} onChange={e => setMilkBillNo(e.target.value)} required />
            </div>
            <div className="form-group" style={{marginBottom: '16px'}}>
              <label>Disbursement Amount (₹)</label>
              <input type="number" className="form-input" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} required />
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
              <button type="button" className="btn btn-secondary" style={{flex: 1}} onClick={() => setPaymentUpdateModal(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{flex: 1}}>Confirm Paid</button>
            </div>
          </form>
        </div>
      )}

      {/* DIALOG: CREATE NEW FARMER MODAL */}
      {isNewFarmerOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: '750px'}}>
            <form onSubmit={handleCreateFarmer}>
              <div className="modal-header">
                <h3 style={{fontWeight: '700', fontSize: '16px'}}>Register New Farmer Master Record</h3>
                <button type="button" onClick={() => setIsNewFarmerOpen(false)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px'}}>×</button>
              </div>
              <div className="modal-body" style={{maxHeight: '70vh', overflowY: 'auto'}}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Farmer Name (English)<span className="required">*</span></label>
                    <input type="text" className="form-input" value={newFarmer.name} onChange={e => setNewFarmer({...newFarmer, name: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Farmer Name (Malayalam)<span className="required">*</span></label>
                    <input type="text" className="form-input" value={newFarmer.nameMl} onChange={e => setNewFarmer({...newFarmer, nameMl: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Father / Spouse Name</label>
                    <input type="text" className="form-input" value={newFarmer.fatherSpouse} onChange={e => setNewFarmer({...newFarmer, fatherSpouse: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" className="form-input" value={newFarmer.dob} onChange={e => setNewFarmer({...newFarmer, dob: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number<span className="required">*</span></label>
                    <input type="tel" className="form-input" maxLength={10} value={newFarmer.mobile} onChange={e => setNewFarmer({...newFarmer, mobile: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Co-op Society ID<span className="required">*</span></label>
                    <select className="form-select" value={newFarmer.societyId} onChange={e => setNewFarmer({...newFarmer, societyId: e.target.value})}>
                      <option value="SOC101">SOC101 (Vattiyoorkavu)</option>
                      <option value="SOC102">SOC102 (Kazhakkoottam)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Co-op Member Number<span className="required">*</span></label>
                    <input type="text" className="form-input" placeholder="e.g. 1004" value={newFarmer.memberNo} onChange={e => setNewFarmer({...newFarmer, memberNo: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Identity Proof Type</label>
                    <select className="form-select" value={newFarmer.kycType} onChange={e => setNewFarmer({...newFarmer, kycType: e.target.value})}>
                      <option value="Aadhaar">Aadhaar Card</option>
                      <option value="Voter ID">Voter ID</option>
                      <option value="Ration Card">Ration Card</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Identity Document Number</label>
                    <input type="text" className="form-input" placeholder="e.g. 1234-5678-9012" value={newFarmer.kycNumber} onChange={e => setNewFarmer({...newFarmer, kycNumber: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Bank Name</label>
                    <input type="text" className="form-input" value={newFarmer.bankName} onChange={e => setNewFarmer({...newFarmer, bankName: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Bank Account Number</label>
                    <input type="text" className="form-input" value={newFarmer.bankAccount} onChange={e => setNewFarmer({...newFarmer, bankAccount: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>IFSC Code</label>
                    <input type="text" className="form-input" value={newFarmer.bankIfsc} onChange={e => setNewFarmer({...newFarmer, bankIfsc: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Cattle Count</label>
                    <input type="number" className="form-input" value={newFarmer.cattleCount} onChange={e => setNewFarmer({...newFarmer, cattleCount: parseInt(e.target.value) || 0})} />
                  </div>
                  <div className="form-group">
                    <label>Avg Daily Supply (Liters)</label>
                    <input type="number" className="form-input" value={newFarmer.milkSupplyAvg} onChange={e => setNewFarmer({...newFarmer, milkSupplyAvg: parseFloat(e.target.value) || 0})} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsNewFarmerOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Farmer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DIALOG: CREATE NEW TICKET */}
      {isNewTicketOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: '500px'}}>
            <form onSubmit={handleCreateTicket}>
              <div className="modal-header">
                <h3 style={{fontWeight: '700', fontSize: '16px'}}>Raise Support Ticket</h3>
                <button type="button" onClick={() => setIsNewTicketOpen(false)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px'}}>×</button>
              </div>
              <div className="modal-body">
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                  <div className="form-group">
                    <label>Module context</label>
                    <select className="form-select">
                      <option value="Applications">Applications submission</option>
                      <option value="Farmer Master">Farmer Master Details</option>
                      <option value="Finance">Finance & Payment</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select className="form-select">
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Validation Error">Validation Error</option>
                      <option value="System crash">System crash / Speed issues</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" className="form-input" placeholder="Summarize the issue..." required />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsNewTicketOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Raise Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
