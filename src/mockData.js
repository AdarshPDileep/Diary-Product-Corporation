// TRCMPU-MILMA Farmer Scheme ERP Mock Database

export const initialDistricts = [
  { code: 'TVM', name: 'Thiruvananthapuram', nameMl: 'തിരുവനന്തപുരം' },
  { code: 'KLM', name: 'Kollam', nameMl: 'കൊല്ലം' },
  { code: 'PTA', name: 'Pathanamthitta', nameMl: 'പത്തനംതിട്ട' },
  { code: 'ALp', name: 'Alappuzha', nameMl: 'ആലപ്പുഴ' }
];

export const initialUnits = [
  { code: 'TVM-UNIT', name: 'Trivandrum Dairy Unit', nameMl: 'തിരുവനന്തപുരം ഡയറി യൂണിറ്റ്', district: 'TVM' },
  { code: 'KLM-UNIT', name: 'Kollam Dairy Unit', nameMl: 'കൊല്ലം ഡയറി യൂണിറ്റ്', district: 'KLM' },
  { code: 'PTA-UNIT', name: 'Pathanamthitta Dairy Unit', nameMl: 'പത്തനംതിട്ട ഡയറി യൂണിറ്റ്', district: 'PTA' },
  { code: 'ALp-UNIT', name: 'Alappuzha Dairy Unit', nameMl: 'ആലപ്പുഴ ഡയറി യൂണിറ്റ്', district: 'ALp' }
];

export const initialSocieties = [
  { id: 'SOC101', regNo: 'T101', name: 'Vattiyoorkavu Milk Society', nameMl: 'വട്ടിയൂർക്കാവ് ക്ഷീര സഹകരണ സംഘം', district: 'TVM', unit: 'TVM-UNIT', supervisor: 'Sajeev Kumar', officer: 'Anil Kumar K.', active: true },
  { id: 'SOC102', regNo: 'T102', name: 'Kazhakkoottam Milk Society', nameMl: 'കഴക്കൂട്ടം ക്ഷീര സഹകരണ സംഘം', district: 'TVM', unit: 'TVM-UNIT', supervisor: 'Sajeev Kumar', officer: 'Anil Kumar K.', active: true },
  { id: 'SOC201', regNo: 'K201', name: 'Kottarakkara Milk Society', nameMl: 'കൊട്ടാരക്കര ക്ഷീര സഹകരണ സംഘം', district: 'KLM', unit: 'KLM-UNIT', supervisor: 'Ramesh Chennithala', officer: 'Bindu S. Nair', active: true },
  { id: 'SOC301', regNo: 'P301', name: 'Adoor Cooperative Milk Society', nameMl: 'അടൂർ ക്ഷീര സഹകരണ സംഘം', district: 'PTA', unit: 'PTA-UNIT', supervisor: 'Mathew Thomas', officer: 'George Varghese', active: true }
];

export const initialFarmers = [
  {
    id: 'TVM-T101-1001',
    farmerId: 'TVM-T101-1001',
    name: 'Radhakrishnan Nair',
    nameMl: 'രാധാകൃഷ്ണൻ നായർ',
    fatherSpouse: 'Gopalan Nair',
    dob: '1970-05-15',
    gender: 'Male',
    category: 'General',
    membershipDate: '2015-04-10',
    mobile: '9847012345',
    altMobile: '9447012345',
    email: 'radhakrishnan@gmail.com',
    address: 'Sreevalsam, Vattiyoorkavu',
    village: 'Vattiyoorkavu',
    panchayat: 'Vattiyoorkavu',
    taluk: 'Trivandrum',
    district: 'TVM',
    pin: '695013',
    kycType: 'Aadhaar',
    kycNumber: '1234-5678-9012',
    bankName: 'State Bank of India',
    bankBranch: 'Vattiyoorkavu',
    bankAccount: '30245123987',
    bankIfsc: 'SBIN0007890',
    societyId: 'SOC101',
    memberNo: '1001',
    membershipStatus: 'Active',
    milkProducerStatus: 'Active',
    cattleCount: 4,
    landDetails: '50 Cents',
    milkSupplyAvg: 22.5, // Liters/day
    status: 'Approved',
    kycStatus: 'Verified',
    remarks: 'Active supplier for 10+ years'
  },
  {
    id: 'TVM-T101-1002',
    farmerId: 'TVM-T101-1002',
    name: 'Sumathy Amma',
    nameMl: 'സുമതി അമ്മ',
    fatherSpouse: 'Velayudhan Pillai',
    dob: '1965-08-22',
    gender: 'Female',
    category: 'OBC',
    membershipDate: '2018-11-05',
    mobile: '9495123456',
    altMobile: '',
    email: 'sumathy@gmail.com',
    address: 'Karthika House, Nettayam',
    village: 'Nettayam',
    panchayat: 'Vattiyoorkavu',
    taluk: 'Trivandrum',
    district: 'TVM',
    pin: '695013',
    kycType: 'Aadhaar',
    kycNumber: '9876-5432-1098',
    bankName: 'Federal Bank',
    bankBranch: 'Nettayam',
    bankAccount: '102003004005',
    bankIfsc: 'FDRL0001420',
    societyId: 'SOC101',
    memberNo: '1002',
    membershipStatus: 'Active',
    milkProducerStatus: 'Active',
    cattleCount: 2,
    landDetails: '35 Cents',
    milkSupplyAvg: 12.0,
    status: 'Approved',
    kycStatus: 'Verified',
    remarks: ''
  },
  {
    id: 'TVM-T102-2005',
    farmerId: 'TVM-T102-2005',
    name: 'John Sebastian',
    nameMl: 'ജോൺ സെബാസ്റ്റ്യൻ',
    fatherSpouse: 'Sebastian John',
    dob: '1982-03-10',
    gender: 'Male',
    category: 'General',
    membershipDate: '2020-01-15',
    mobile: '9744098765',
    altMobile: '',
    email: 'john.seb@gmail.com',
    address: 'Bethel Villa, Kazhakkoottam',
    village: 'Kazhakkoottam',
    panchayat: 'Kazhakkoottam',
    taluk: 'Trivandrum',
    district: 'TVM',
    pin: '695582',
    kycType: 'Voter ID',
    kycNumber: 'KL/20/123/45678',
    bankName: 'Canara Bank',
    bankBranch: 'Kazhakkoottam',
    bankAccount: '052010109988',
    bankIfsc: 'CNRB0000520',
    societyId: 'SOC102',
    memberNo: '2005',
    membershipStatus: 'Active',
    milkProducerStatus: 'Active',
    cattleCount: 5,
    landDetails: '80 Cents',
    milkSupplyAvg: 30.5,
    status: 'Pending Verification',
    kycStatus: 'Pending',
    remarks: 'New cattle purchase update submitted'
  },
  {
    id: 'KLM-K201-2010',
    farmerId: 'KLM-K201-2010',
    name: 'Latha Menon',
    nameMl: 'ലത മേനോൻ',
    fatherSpouse: 'Damodaran Nair',
    dob: '1978-11-30',
    gender: 'Female',
    category: 'General',
    membershipDate: '2026-07-20',
    mobile: '9446001122',
    altMobile: '',
    email: 'latha.menon@gmail.com',
    address: 'Methala House, Kottarakkara',
    village: 'Kottarakkara',
    panchayat: 'Kottarakkara',
    taluk: 'Kollam',
    district: 'KLM',
    pin: '691506',
    kycType: 'Aadhaar',
    kycNumber: '4567-8901-2345',
    bankName: 'Dhanlaxmi Bank',
    bankBranch: 'Kottarakkara',
    bankAccount: '401200300115',
    bankIfsc: 'DLXB0000412',
    societyId: 'SOC201',
    memberNo: '2010',
    membershipStatus: 'Active',
    milkProducerStatus: 'Active',
    cattleCount: 3,
    landDetails: '45 Cents',
    milkSupplyAvg: 14.0,
    status: 'Pending Verification',
    kycStatus: 'Pending',
    remarks: 'New registration awaiting field verification'
  }
];

export const initialSchemes = [
  {
    code: 'SCH001',
    name: 'Cattle Feed Subsidy Scheme 2026',
    nameMl: 'കാലിത്തീറ്റ സബ്‌സിഡി പദ്ധതി 2026',
    type: 'Subsidy',
    description: 'Providing 50% subsidy on cattle feeds purchased through Dairy Co-operative Societies.',
    objective: 'To reduce the operational feed cost for active milk producers.',
    schemeYear: '2026-27',
    financialYear: '2026-27',
    openDate: '2026-04-01',
    closeDate: '2026-12-31',
    applicableDistricts: ['TVM', 'KLM', 'PTA', 'ALp'],
    beneficiaryType: 'Active Milk Producer',
    maxApplications: 1,
    maxBenefitAmount: 15000,
    budgetAllocation: 5000000,
    utilizedBudget: 1245000,
    status: 'Published',
    version: '1.0',
    requiredDocs: ['Milk Supply Certificate', 'Feed Purchase Bill'],
    eligibility: {
      minCattle: 1,
      minMilkSupply: 5, // Liters per day avg
      mustBeActive: true
    },
    fields: [
      { key: 'feedQty', label: 'Feed Quantity Purchased (bags)', labelMl: 'വാങ്ങിയ തീറ്റയുടെ അളവ് (ചാക്ക്)', type: 'number', mandatory: true },
      { key: 'billNo', label: 'Bill Number', labelMl: 'ബിൽ നമ്പർ', type: 'text', mandatory: true },
      { key: 'billDate', label: 'Bill Date', labelMl: 'ബിൽ തീയതി', type: 'date', mandatory: true },
      { key: 'feedAgency', label: 'Feed Manufacturing Agency', labelMl: 'തീറ്റ ഉൽപാദന ഏജൻസി', type: 'select', options: ['Milma', 'Kerala Feeds', 'Other'], mandatory: true }
    ],
    checklist: [
      'Farmer Active Status in Society verified',
      'Original purchase bill attached and scanned properly',
      'Average monthly milk supply exceeds 5 liters/day limit',
      'Prior year benefit details verified'
    ]
  },
  {
    code: 'SCH002',
    name: 'Milking Machine Subsidy',
    nameMl: 'മിൽക്കിംഗ് മെഷീൻ സബ്‌സിഡി പദ്ധതി',
    type: 'Capital Support',
    description: 'Financial support of up to 75% for purchasing automated milking machines.',
    objective: 'To promote mechanization and hygiene in small dairy farms.',
    schemeYear: '2026-27',
    financialYear: '2026-27',
    openDate: '2026-06-01',
    closeDate: '2026-10-31',
    applicableDistricts: ['TVM', 'KLM'],
    beneficiaryType: 'Active Farmer with 3+ Cows',
    maxApplications: 1,
    maxBenefitAmount: 45000,
    budgetAllocation: 2500000,
    utilizedBudget: 675000,
    status: 'Published',
    version: '1.2',
    requiredDocs: ['Farm License / Panchayat License', 'Quotation for Milking Machine'],
    eligibility: {
      minCattle: 3,
      minMilkSupply: 15,
      mustBeActive: true
    },
    fields: [
      { key: 'machineBrand', label: 'Milking Machine Brand', labelMl: 'മെഷീൻ ബ്രാൻഡ്', type: 'text', mandatory: true },
      { key: 'dealerName', label: 'Dealer Name', labelMl: 'ഡീലറുടെ പേര്', type: 'text', mandatory: true },
      { key: 'quotationAmount', label: 'Quotation Amount (INR)', labelMl: 'ക്വട്ടേഷൻ തുക (INR)', type: 'number', mandatory: true }
    ],
    checklist: [
      'Minimum cattle count of 3 verified through field visit',
      'Quotation is from an authorized MILMA dealer',
      'Land and farm area verified as suitable'
    ]
  }
];

export const initialApplications = [
  {
    id: 'APP2026001',
    appNo: 'TRCMPU/2026-27/SCH001/TVM/0000123',
    refNo: 'FSA-2026-0000123',
    farmerId: 'TVM-T101-1001',
    farmerName: 'Radhakrishnan Nair',
    farmerNameMl: 'രാധാകൃഷ്ണൻ നായർ',
    societyId: 'SOC101',
    societyName: 'Vattiyoorkavu Milk Society',
    schemeCode: 'SCH001',
    schemeName: 'Cattle Feed Subsidy Scheme 2026',
    submissionDate: '2026-07-15',
    status: 'Pending Field Supervisor', // 8 Levels: Society (submitted) -> Field Supervisor -> P&I Officer -> Section Head -> Unit Head -> Functional Head -> MD -> Finance
    currentLevel: 'Field Supervisor',
    benefitAmount: 7500,
    data: {
      feedQty: '10',
      billNo: 'B-8976/2026',
      billDate: '2026-07-10',
      feedAgency: 'Milma'
    },
    documents: [
      { name: 'Milk Supply Certificate', file: 'milk_supply.pdf', status: 'Uploaded' },
      { name: 'Feed Purchase Bill', file: 'feed_bill.jpg', status: 'Uploaded' }
    ],
    checklistAnswers: {
      'Farmer Active Status in Society verified': true,
      'Original purchase bill attached and scanned properly': true,
      'Average monthly milk supply exceeds 5 liters/day limit': true,
      'Prior year benefit details verified': false
    },
    remarksLog: [
      { user: 'Society Secretary', role: 'Society User', action: 'Submitted', date: '2026-07-15 10:30', note: 'All original bills verified.' }
    ],
    paymentStatus: 'Not Initiated',
    milkBillRef: ''
  },
  {
    id: 'APP2026002',
    appNo: 'TRCMPU/2026-27/SCH001/TVM/0000124',
    refNo: 'FSA-2026-0000124',
    farmerId: 'TVM-T101-1002',
    farmerName: 'Sumathy Amma',
    farmerNameMl: 'സുമതി അമ്മ',
    societyId: 'SOC101',
    societyName: 'Vattiyoorkavu Milk Society',
    schemeCode: 'SCH001',
    schemeName: 'Cattle Feed Subsidy Scheme 2026',
    submissionDate: '2026-07-16',
    status: 'Pending Section Head',
    currentLevel: 'Section Head',
    benefitAmount: 6000,
    data: {
      feedQty: '8',
      billNo: 'B-8999/2026',
      billDate: '2026-07-12',
      feedAgency: 'Milma'
    },
    documents: [
      { name: 'Milk Supply Certificate', file: 'milk_supply.pdf', status: 'Uploaded' },
      { name: 'Feed Purchase Bill', file: 'feed_bill.jpg', status: 'Uploaded' }
    ],
    checklistAnswers: {
      'Farmer Active Status in Society verified': true,
      'Original purchase bill attached and scanned properly': true,
      'Average monthly milk supply exceeds 5 liters/day limit': true,
      'Prior year benefit details verified': true
    },
    remarksLog: [
      { user: 'Society Secretary', role: 'Society User', action: 'Submitted', date: '2026-07-16 11:15', note: 'Submitted for verification.' },
      { user: 'Sajeev Kumar', role: 'Field Supervisor', action: 'Verified', date: '2026-07-18 14:20', note: 'Checked cattle quantity and supply record. Recommend approval.' },
      { user: 'Anil Kumar K.', role: 'P&I Officer', action: 'Recommended', date: '2026-07-20 09:45', note: 'Recommended for Section Head approval.' }
    ],
    paymentStatus: 'Not Initiated',
    milkBillRef: ''
  },
  {
    id: 'APP2026003',
    appNo: 'TRCMPU/2026-27/SCH002/TVM/0000088',
    refNo: 'FSA-2026-0000088',
    farmerId: 'TVM-T101-1001',
    farmerName: 'Radhakrishnan Nair',
    farmerNameMl: 'രാധാകൃഷ്ണൻ നായർ',
    societyId: 'SOC101',
    societyName: 'Vattiyoorkavu Milk Society',
    schemeCode: 'SCH002',
    schemeName: 'Milking Machine Subsidy',
    submissionDate: '2026-07-10',
    status: 'Approved',
    currentLevel: 'Finance',
    benefitAmount: 33750,
    data: {
      machineBrand: 'Milma-Mech 3000',
      dealerName: 'Trivandrum Dairy Spares Co.',
      quotationAmount: '45000'
    },
    documents: [
      { name: 'Farm License / Panchayat License', file: 'license.pdf', status: 'Uploaded' },
      { name: 'Quotation for Milking Machine', file: 'quotation.pdf', status: 'Uploaded' }
    ],
    checklistAnswers: {
      'Minimum cattle count of 3 verified through field visit': true,
      'Quotation is from an authorized MILMA dealer': true,
      'Land and farm area verified as suitable': true
    },
    remarksLog: [
      { user: 'Society Secretary', role: 'Society User', action: 'Submitted', date: '2026-07-10 09:00', note: 'Farmer holds 4 cows and supplies 20+ liters daily.' },
      { user: 'Sajeev Kumar', role: 'Field Supervisor', action: 'Verified', date: '2026-07-11 16:30', note: 'Field inspection completed. 4 cows in healthy condition.' },
      { user: 'Anil Kumar K.', role: 'P&I Officer', action: 'Recommended', date: '2026-07-12 11:20', note: 'Recommended.' },
      { user: 'Surendran M.', role: 'Section Head', action: 'Approved', date: '2026-07-13 15:45', note: 'Approved and forwarded.' },
      { user: 'Devi G.', role: 'Unit Head', action: 'Approved', date: '2026-07-14 10:10', note: 'Unit verification positive.' },
      { user: 'Madhavan Nair', role: 'Functional Head', action: 'Approved', date: '2026-07-15 14:00', note: 'All documentation fits budget norms.' },
      { user: 'MD - Trivandrum Dairy', role: 'Managing Director', action: 'Approved', date: '2026-07-16 17:00', note: 'Final management approval granted.' }
    ],
    paymentStatus: 'Awaiting Finance Approval',
    milkBillRef: ''
  }
];

export const initialStatements = [
  {
    id: 'STMT2026001',
    stmtNo: 'CS-2026-07-001',
    schemeCode: 'SCH001',
    schemeName: 'Cattle Feed Subsidy Scheme 2026',
    district: 'TVM',
    unit: 'TVM-UNIT',
    societyId: 'SOC101',
    societyName: 'Vattiyoorkavu Milk Society',
    createdDate: '2026-07-20',
    createdBy: 'Anil Kumar K. (P&I Officer)',
    totalApplications: 2,
    totalAmount: 13500,
    status: 'Pending Verification', // Pending Verification, Approved, Forwarded, Finance Received, Processed
    applications: ['APP2026001', 'APP2026002']
  }
];

export const initialTickets = [
  {
    id: 'TKT-1002',
    ticketNo: 'TKT-2026-003',
    user: 'Secretary (Vattiyoorkavu)',
    society: 'Vattiyoorkavu Milk Society',
    module: 'Farmer Master',
    category: 'Validation Error',
    priority: 'Medium',
    subject: 'Cannot upload farmer KYC with duplicate Voter ID warning',
    description: 'System says John Sebastian Voter ID already exists, but he is a new member.',
    status: 'In Progress',
    resolution: '',
    createdDate: '2026-07-25 10:00',
    closedDate: ''
  }
];

export const initialAuditLogs = [
  {
    id: 1,
    timestamp: '2026-07-27 10:15:33',
    user: 'Secretary (Vattiyoorkavu)',
    role: 'Society User',
    module: 'Farmer Master',
    recordType: 'Farmer',
    recordId: 'TVM-T101-1001',
    action: 'Modify Farmer',
    prevValue: 'Cattle Count: 3',
    newValue: 'Cattle Count: 4',
    remarks: 'Added one cow purchased from Milma Cattle Fair',
    ipAddress: '10.10.45.122'
  },
  {
    id: 2,
    timestamp: '2026-07-27 11:02:15',
    user: 'Anil Kumar K.',
    role: 'P&I Officer',
    module: 'Applications',
    recordType: 'Application',
    recordId: 'APP2026002',
    action: 'Verify Checklist',
    prevValue: 'Checklist pending',
    newValue: 'All items marked Verified',
    remarks: 'Verified milk book records and bank account details',
    ipAddress: '10.10.12.80'
  }
];

export const roleDashboardMetrics = {
  'Society User': {
    submitted: 15,
    drafts: 4,
    returned: 2,
    approved: 28,
    paymentsCompleted: 24,
    balanceBudget: '₹4,55,000'
  },
  'Field Supervisor': {
    pendingFarmers: 3,
    pendingApps: 8,
    returnedToday: 1,
    verifiedToday: 4
  },
  'P&I Officer': {
    pendingApps: 12,
    recommendedToday: 5,
    statementsCreated: 2,
    averageProcessingTime: '2.5 Days'
  },
  'Section Head': {
    pendingApprovals: 5,
    rejectionsPending: 1,
    budgetAlerts: 'Normal'
  },
  'Unit Head': {
    unitPending: 14,
    activeSocieties: 120,
    utilizationRate: '68%'
  },
  'Functional Head': {
    pendingDecisions: 4,
    totalSanctionedAmount: '₹34,80,000',
    slaEscalations: 0
  },
  'Managing Director': {
    totalApplications: 1350,
    overallApprovalRate: '94.2%',
    totalBudgetUtilized: '₹84,50,000',
    escalatedAlerts: 2
  },
  'Finance Head': {
    paymentQueue: 9,
    processedToday: 15,
    budgetWarningStatus: 'Normal (54% spent)'
  }
};

// Report type registry (URS §12) — labels live with data
export const reportTypes = [
  { key: 'scheme-wise', label: 'Scheme-wise Report', labelMl: 'പദ്ധതി അടിസ്ഥാനത്തിൽ' },
  { key: 'district-wise', label: 'District-wise Report', labelMl: 'ജില്ലാടിസ്ഥാനത്തിൽ' },
  { key: 'society-wise', label: 'Society-wise Report', labelMl: 'സംഘം അടിസ്ഥാനത്തിൽ' },
  { key: 'consolidated', label: 'Consolidated Statement', labelMl: 'ഏകീകൃത പ്രസ്താവന' },
  { key: 'monthly', label: 'Monthly Report', labelMl: 'പ്രതിമാസ റിപ്പോർട്ട്' },
  { key: 'batch-wise', label: 'Batch-wise Report', labelMl: 'ബാച്ച് അടിസ്ഥാനത്തിൽ' }
];

// Finance breakdown (URS §9) — shared by Finance page + Finance dashboard summary
export const financeBreakdown = {
  schemeWise: [
    { schemeCode: 'SCH001', schemeName: 'Cattle Feed Subsidy Scheme 2026', allocated: 5000000, utilized: 1245000 },
    { schemeCode: 'SCH002', schemeName: 'Milking Machine Subsidy', allocated: 2500000, utilized: 675000 }
  ],
  districtWise: [
    { district: 'TVM', districtName: 'Thiruvananthapuram', allocated: 4500000, expended: 1620000 },
    { district: 'KLM', districtName: 'Kollam', allocated: 2000000, expended: 300000 },
    { district: 'PTA', districtName: 'Pathanamthitta', allocated: 750000, expended: 0 },
    { district: 'ALp', districtName: 'Alappuzha', allocated: 250000, expended: 0 }
  ],
  societyWise: [
    { societyId: 'SOC101', societyName: 'Vattiyoorkavu Milk Society', fundAllocated: 1500000, fundDistributed: 41250, beneficiaryCount: 2 },
    { societyId: 'SOC102', societyName: 'Kazhakkoottam Milk Society', fundAllocated: 900000, fundDistributed: 0, beneficiaryCount: 0 },
    { societyId: 'SOC201', societyName: 'Kottarakkara Milk Society', fundAllocated: 1100000, fundDistributed: 0, beneficiaryCount: 0 },
    { societyId: 'SOC301', societyName: 'Adoor Cooperative Milk Society', fundAllocated: 500000, fundDistributed: 0, beneficiaryCount: 0 }
  ]
};
