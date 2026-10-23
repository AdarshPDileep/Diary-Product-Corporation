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
      { user: 'Society Secretary', role: 'Society User', action: 'Draft Created', date: '2026-07-14 09:20', note: 'Cattle feed subsidy application opened for Radhakrishnan Nair.' },
      { user: 'Society Secretary', role: 'Society User', action: 'Documents Uploaded', date: '2026-07-14 11:45', note: 'Milk supply certificate and feed purchase bill scanned and attached.' },
      { user: 'Society Secretary', role: 'Society User', action: 'Eligibility Checked', date: '2026-07-15 10:08', note: 'Active membership, cattle count, and minimum milk supply verified.' },
      { user: 'Society Secretary', role: 'Society User', action: 'Submitted', date: '2026-07-15 10:30', note: 'All original bills verified and forwarded for field verification.' },
      { user: 'TRCMPU Portal', role: 'System', action: 'Pending', date: '2026-07-15 10:31', note: 'Awaiting Field Supervisor verification (Trivandrum unit queue).' }
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
      { user: 'Society Secretary', role: 'Society User', action: 'Draft Created', date: '2026-07-15 14:10', note: 'Application draft created for Sumathy Amma.' },
      { user: 'Society Secretary', role: 'Society User', action: 'Documents Uploaded', date: '2026-07-16 10:40', note: 'Feed bill and milk supply certificate uploaded.' },
      { user: 'Society Secretary', role: 'Society User', action: 'Eligibility Checked', date: '2026-07-16 11:02', note: 'Scheme eligibility and duplicate-benefit check completed.' },
      { user: 'Society Secretary', role: 'Society User', action: 'Submitted', date: '2026-07-16 11:15', note: 'Submitted for verification with society endorsement.' },
      { user: 'Sajeev Kumar', role: 'Field Supervisor', action: 'Verified', date: '2026-07-18 14:20', note: 'Field visit completed. Cattle quantity and supply records match society register.' },
      { user: 'Anil Kumar K.', role: 'P&I Officer', action: 'Recommended', date: '2026-07-20 09:45', note: 'Checklist complete. Recommended for Section Head approval.' },
      { user: 'TRCMPU Portal', role: 'System', action: 'Pending', date: '2026-07-20 09:46', note: 'Awaiting Section Head review and sanction recommendation.' }
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
      { user: 'Society Secretary', role: 'Society User', action: 'Draft Created', date: '2026-07-09 11:00', note: 'Milking machine subsidy application initiated.' },
      { user: 'Society Secretary', role: 'Society User', action: 'Documents Uploaded', date: '2026-07-09 15:30', note: 'Farm license and authorized dealer quotation uploaded.' },
      { user: 'Society Secretary', role: 'Society User', action: 'Eligibility Checked', date: '2026-07-10 08:45', note: 'Minimum cattle count and dealer authorization validated.' },
      { user: 'Society Secretary', role: 'Society User', action: 'Submitted', date: '2026-07-10 09:00', note: 'Farmer holds 4 cows and supplies 20+ liters daily — submitted for verification.' },
      { user: 'Sajeev Kumar', role: 'Field Supervisor', action: 'Verified', date: '2026-07-11 16:30', note: 'Field inspection completed. Four cows in healthy condition; shed suitable for machine install.' },
      { user: 'Anil Kumar K.', role: 'P&I Officer', action: 'Recommended', date: '2026-07-12 11:20', note: 'Quotation within scheme cap. Recommended for administrative approval.' },
      { user: 'Surendran M.', role: 'Section Head', action: 'Approved', date: '2026-07-13 15:45', note: 'Section-level sanction approved and forwarded to unit head.' },
      { user: 'Devi G.', role: 'Unit Head', action: 'Approved', date: '2026-07-14 10:10', note: 'Unit verification positive. No duplicate claim in unit records.' },
      { user: 'Madhavan Nair', role: 'Functional Head', action: 'Approved', date: '2026-07-15 14:00', note: 'Budget head and documentation align with scheme norms.' },
      { user: 'MD - Trivandrum Dairy', role: 'Managing Director', action: 'Approved', date: '2026-07-16 17:00', note: 'Final management approval granted; file sent to finance.' },
      { user: 'Finance Controller', role: 'Finance Head', action: 'Under Review', date: '2026-07-17 09:30', note: 'Bank account, IFSC, and sanction amount verification in progress.' }
    ],
    paymentStatus: 'Awaiting Finance Approval',
    milkBillRef: ''
  },
  {
    id: 'APP2026004',
    appNo: 'TRCMPU/2026-27/SCH001/TVM/0000125',
    refNo: 'FSA-2026-0000125',
    farmerId: 'TVM-T102-2005',
    farmerName: 'John Sebastian',
    farmerNameMl: 'ജോൺ സെബാസ്റ്റ്യൻ',
    societyId: 'SOC102',
    societyName: 'Kazhakkoottam Milk Society',
    schemeCode: 'SCH001',
    schemeName: 'Cattle Feed Subsidy Scheme 2026',
    submissionDate: '2026-07-17',
    status: 'Pending P&I Officer',
    currentLevel: 'P&I Officer',
    benefitAmount: 8200,
    data: {
      feedQty: '12',
      billNo: 'B-9012/2026',
      billDate: '2026-07-14',
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
      { user: 'Society Secretary', role: 'Society User', action: 'Submitted', date: '2026-07-17 09:40', note: 'Kazhakkoottam society submission — high-volume supplier.' },
      { user: 'Sajeev Kumar', role: 'Field Supervisor', action: 'Verified', date: '2026-07-19 11:05', note: 'Field verification complete. Five cattle recorded; supply ledger matches.' },
      { user: 'TRCMPU Portal', role: 'System', action: 'Pending', date: '2026-07-19 11:06', note: 'Awaiting P&I Officer checklist and recommendation.' }
    ],
    paymentStatus: 'Not Initiated',
    milkBillRef: ''
  },
  {
    id: 'APP2026005',
    appNo: 'TRCMPU/2026-27/SCH001/KLM/0000042',
    refNo: 'FSA-2026-0000042',
    farmerId: 'KLM-K201-2010',
    farmerName: 'Latha Menon',
    farmerNameMl: 'ലത മേനോൻ',
    societyId: 'SOC201',
    societyName: 'Kottarakkara Milk Society',
    schemeCode: 'SCH001',
    schemeName: 'Cattle Feed Subsidy Scheme 2026',
    submissionDate: '2026-07-19',
    status: 'Pending Unit Head',
    currentLevel: 'Unit Head',
    benefitAmount: 5500,
    data: {
      feedQty: '7',
      billNo: 'B-7721/2026',
      billDate: '2026-07-16',
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
      { user: 'Society Secretary', role: 'Society User', action: 'Submitted', date: '2026-07-19 10:15', note: 'Kottarakkara society — new member feed subsidy claim.' },
      { user: 'Ramesh Chennithala', role: 'Field Supervisor', action: 'Verified', date: '2026-07-20 15:30', note: 'Field visit done. Three cattle verified.' },
      { user: 'Bindu S. Nair', role: 'P&I Officer', action: 'Recommended', date: '2026-07-21 09:20', note: 'Documents and supply average validated.' },
      { user: 'Surendran M.', role: 'Section Head', action: 'Approved', date: '2026-07-22 14:00', note: 'Section sanction granted; forwarded to unit head.' },
      { user: 'TRCMPU Portal', role: 'System', action: 'Pending', date: '2026-07-22 14:01', note: 'Awaiting Unit Head verification and forward.' }
    ],
    paymentStatus: 'Not Initiated',
    milkBillRef: ''
  },
  {
    id: 'APP2026006',
    appNo: 'TRCMPU/2026-27/SCH001/TVM/0000126',
    refNo: 'FSA-2026-0000126',
    farmerId: 'TVM-T101-1002',
    farmerName: 'Sumathy Amma',
    farmerNameMl: 'സുമതി അമ്മ',
    societyId: 'SOC101',
    societyName: 'Vattiyoorkavu Milk Society',
    schemeCode: 'SCH001',
    schemeName: 'Cattle Feed Subsidy Scheme 2026',
    submissionDate: '2026-07-12',
    status: 'Pending Functional Head',
    currentLevel: 'Functional Head',
    benefitAmount: 4800,
    data: {
      feedQty: '6',
      billNo: 'B-8890/2026',
      billDate: '2026-07-08',
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
      { user: 'Society Secretary', role: 'Society User', action: 'Submitted', date: '2026-07-12 11:00', note: 'Second tranche feed subsidy application.' },
      { user: 'Sajeev Kumar', role: 'Field Supervisor', action: 'Verified', date: '2026-07-13 16:00', note: 'Verified on site.' },
      { user: 'Anil Kumar K.', role: 'P&I Officer', action: 'Recommended', date: '2026-07-14 10:30', note: 'Recommended.' },
      { user: 'Surendran M.', role: 'Section Head', action: 'Approved', date: '2026-07-15 11:00', note: 'Approved.' },
      { user: 'Devi G.', role: 'Unit Head', action: 'Approved', date: '2026-07-16 09:45', note: 'Unit head clearance complete.' },
      { user: 'TRCMPU Portal', role: 'System', action: 'Pending', date: '2026-07-16 09:46', note: 'Awaiting Functional Head budget and policy review.' }
    ],
    paymentStatus: 'Not Initiated',
    milkBillRef: ''
  },
  {
    id: 'APP2026007',
    appNo: 'TRCMPU/2026-27/SCH001/TVM/0000127',
    refNo: 'FSA-2026-0000127',
    farmerId: 'TVM-T102-2005',
    farmerName: 'John Sebastian',
    farmerNameMl: 'ജോൺ സെബാസ്റ്റ്യൻ',
    societyId: 'SOC102',
    societyName: 'Kazhakkoottam Milk Society',
    schemeCode: 'SCH001',
    schemeName: 'Cattle Feed Subsidy Scheme 2026',
    submissionDate: '2026-07-08',
    status: 'Pending Managing Director',
    currentLevel: 'Managing Director',
    benefitAmount: 9000,
    data: {
      feedQty: '14',
      billNo: 'B-8650/2026',
      billDate: '2026-07-05',
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
      { user: 'Society Secretary', role: 'Society User', action: 'Submitted', date: '2026-07-08 09:30', note: 'Bulk feed purchase subsidy — priority supplier.' },
      { user: 'Sajeev Kumar', role: 'Field Supervisor', action: 'Verified', date: '2026-07-09 14:00', note: 'Verified.' },
      { user: 'Anil Kumar K.', role: 'P&I Officer', action: 'Recommended', date: '2026-07-10 10:00', note: 'Recommended.' },
      { user: 'Surendran M.', role: 'Section Head', action: 'Approved', date: '2026-07-11 15:00', note: 'Approved.' },
      { user: 'Devi G.', role: 'Unit Head', action: 'Approved', date: '2026-07-12 11:30', note: 'Approved.' },
      { user: 'Madhavan Nair', role: 'Functional Head', action: 'Approved', date: '2026-07-13 16:20', note: 'Within annual budget allocation.' },
      { user: 'TRCMPU Portal', role: 'System', action: 'Pending', date: '2026-07-13 16:21', note: 'Awaiting Managing Director final approval.' }
    ],
    paymentStatus: 'Not Initiated',
    milkBillRef: ''
  },
  {
    id: 'APP2026008',
    appNo: 'TRCMPU/2026-27/SCH001/TVM/0000128',
    refNo: 'FSA-2026-0000128',
    farmerId: 'TVM-T101-1001',
    farmerName: 'Radhakrishnan Nair',
    farmerNameMl: 'രാധാകൃഷ്ണൻ നായർ',
    societyId: 'SOC101',
    societyName: 'Vattiyoorkavu Milk Society',
    schemeCode: 'SCH001',
    schemeName: 'Cattle Feed Subsidy Scheme 2026',
    submissionDate: '2026-07-06',
    status: 'Pending Finance',
    currentLevel: 'Finance',
    benefitAmount: 7200,
    data: {
      feedQty: '9',
      billNo: 'B-8501/2026',
      billDate: '2026-07-02',
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
      { user: 'Society Secretary', role: 'Society User', action: 'Submitted', date: '2026-07-06 10:00', note: 'Submitted for full workflow demo.' },
      { user: 'Sajeev Kumar', role: 'Field Supervisor', action: 'Verified', date: '2026-07-07 11:00', note: 'Verified.' },
      { user: 'Anil Kumar K.', role: 'P&I Officer', action: 'Recommended', date: '2026-07-08 09:00', note: 'Recommended.' },
      { user: 'Surendran M.', role: 'Section Head', action: 'Approved', date: '2026-07-09 10:00', note: 'Approved.' },
      { user: 'Devi G.', role: 'Unit Head', action: 'Approved', date: '2026-07-10 11:00', note: 'Approved.' },
      { user: 'Madhavan Nair', role: 'Functional Head', action: 'Approved', date: '2026-07-11 12:00', note: 'Approved.' },
      { user: 'MD - Trivandrum Dairy', role: 'Managing Director', action: 'Approved', date: '2026-07-12 15:00', note: 'Management approval granted.' },
      { user: 'TRCMPU Portal', role: 'System', action: 'Pending', date: '2026-07-12 15:01', note: 'Awaiting finance sanction and payment processing.' }
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

export const ALL_PORTAL_ROLES = [
  'Society User',
  'Field Supervisor',
  'P&I Officer',
  'Section Head',
  'Unit Head',
  'Functional Head',
  'Managing Director',
  'Finance Head',
  'Super Administrator'
];

/** Module keys aligned with sidebar / portal areas */
export const PERMISSION_MODULES = [
  { key: 'dashboard', section: 'main', labelEn: 'Dashboard', labelMl: 'ഡാഷ്‌ബോർഡ്' },
  { key: 'farmers', section: 'farmer', labelEn: 'Farmer Master', labelMl: 'കർഷക മാസ്റ്റർ' },
  { key: 'bulkUpload', section: 'farmer', labelEn: 'Farmer Bulk Upload', labelMl: 'കർഷക ബൾക്ക് അപ്‌ലോഡ്' },
  { key: 'submitApp', section: 'farmer', labelEn: 'Submit Application', labelMl: 'അപേക്ഷ സമർപ്പിക്കുക' },
  { key: 'approvalQueue', section: 'verification', labelEn: 'Approval Queue', labelMl: 'അംഗീകാര ക്യൂ' },
  { key: 'farmerApproval', section: 'verification', labelEn: 'Farmer Approvals', labelMl: 'കർഷക അംഗീകാരങ്ങൾ' },
  { key: 'statements', section: 'verification', labelEn: 'Consolidated Statements', labelMl: 'ഏകീകൃത പ്രസ്താവനകൾ' },
  { key: 'finance', section: 'finance', labelEn: 'Finance & Budget', labelMl: 'ധനകാര്യം & ബഡ്ജറ്റ്' },
  { key: 'schemes', section: 'admin', labelEn: 'Scheme Configuration', labelMl: 'പദ്ധതി കോൺഫിഗറേഷൻ' },
  { key: 'formBuilder', section: 'admin', labelEn: 'Form Builder', labelMl: 'ഫോം ബിൽഡർ' },
  { key: 'rolePermissions', section: 'admin', labelEn: 'User Roles & Permissions', labelMl: 'ഉപയോക്തൃ റോളുകളും അനുമതികളും' },
  { key: 'reports', section: 'ops', labelEn: 'MIS Reports', labelMl: 'MIS റിപ്പോർട്ടുകൾ' },
  { key: 'tracking', section: 'ops', labelEn: 'Track Application', labelMl: 'അപേക്ഷ ട്രാക്ക് ചെയ്യുക' },
  { key: 'helpdesk', section: 'ops', labelEn: 'Helpdesk Support', labelMl: 'ഹെൽപ്‌ഡെസ്‌ക്' },
  { key: 'audit', section: 'ops', labelEn: 'Audit Trail', labelMl: 'ഓഡിറ്റ് ട്രെയിൽ' }
];

export function getBuiltInDefaultPermissions(role) {
  const allKeys = PERMISSION_MODULES.map((m) => m.key);
  if (role === 'Super Administrator') return [...allKeys];

  const set = new Set(['dashboard', 'reports', 'tracking', 'helpdesk', 'audit']);

  if (['Society User', 'Super Administrator'].includes(role)) {
    set.add('farmers');
    set.add('bulkUpload');
    set.add('submitApp');
  }
  if (role !== 'Society User') {
    set.add('approvalQueue');
  }
  if (['Field Supervisor', 'Unit Head', 'Super Administrator'].includes(role)) {
    set.add('farmerApproval');
  }
  if (['P&I Officer', 'Section Head', 'Unit Head', 'Super Administrator'].includes(role)) {
    set.add('statements');
  }
  if (['Finance Head', 'Super Administrator'].includes(role)) {
    set.add('finance');
  }
  if (['Super Administrator', 'Section Head'].includes(role)) {
    set.add('schemes');
    set.add('formBuilder');
  }
  if (role === 'Super Administrator') {
    set.add('rolePermissions');
  }

  return Array.from(set);
}

/** Resolve default module access from role catalog (custom or built-in). */
export function getDefaultPermissionsForRole(roleName, portalRoles) {
  const fromCatalog = portalRoles?.find((r) => r.name === roleName);
  if (fromCatalog) return [...fromCatalog.permissions];
  return getBuiltInDefaultPermissions(roleName);
}

export const initialPortalRoles = ALL_PORTAL_ROLES.map((name, index) => ({
  id: `SYS_${index + 1}`,
  name,
  isSystem: true,
  permissions: getBuiltInDefaultPermissions(name)
}));

export const initialPortalUsers = [
  {
    id: 'PU001',
    userId: 'TVM_SOCIETY_101',
    displayName: 'Society Secretary — Vattiyoorkavu',
    email: 'soc101@trcmpu.demo',
    unit: 'Trivandrum',
    society: 'Vattiyoorkavu Milk Society',
    role: 'Society User',
    status: 'Active',
    permissions: getBuiltInDefaultPermissions('Society User')
  },
  {
    id: 'PU002',
    userId: 'TVM_FIELD_01',
    displayName: 'Sajeev Kumar',
    email: 'field.supervisor@trcmpu.demo',
    unit: 'Trivandrum',
    society: '—',
    role: 'Field Supervisor',
    status: 'Active',
    permissions: getBuiltInDefaultPermissions('Field Supervisor')
  },
  {
    id: 'PU003',
    userId: 'TVM_PI_01',
    displayName: 'Anil Kumar K.',
    email: 'pi.officer@trcmpu.demo',
    unit: 'Trivandrum',
    society: '—',
    role: 'P&I Officer',
    status: 'Active',
    permissions: getBuiltInDefaultPermissions('P&I Officer')
  },
  {
    id: 'PU004',
    userId: 'TVM_SECTION_01',
    displayName: 'Surendran M.',
    email: 'section.head@trcmpu.demo',
    unit: 'Trivandrum',
    society: '—',
    role: 'Section Head',
    status: 'Active',
    permissions: getBuiltInDefaultPermissions('Section Head')
  },
  {
    id: 'PU005',
    userId: 'TVM_FIN_01',
    displayName: 'Finance Controller',
    email: 'finance@trcmpu.demo',
    unit: 'Trivandrum',
    society: '—',
    role: 'Finance Head',
    status: 'Active',
    permissions: getBuiltInDefaultPermissions('Finance Head')
  },
  {
    id: 'PU006',
    userId: 'TVM_ADMIN',
    displayName: 'System Administrator',
    email: 'admin@trcmpu.demo',
    unit: 'TRCMPU HQ',
    society: '—',
    role: 'Super Administrator',
    status: 'Active',
    permissions: getBuiltInDefaultPermissions('Super Administrator')
  }
];

export const initialNotifications = [
  {
    id: 1,
    title: 'New Cattle Feed Subsidy Published',
    titleMl: 'പുതിയ കാലിത്തീറ്റ സബ്‌സിഡി പ്രസിദ്ധീകരിച്ചു',
    desc: 'Cattle Feed Subsidy Scheme 2026 is open for applications until 31 Dec 2026.',
    descMl: 'കാലിത്തീറ്റ സബ്‌സിഡി പദ്ധതി 2026-ൽ 2026 ഡിസംബർ 31 വരെ അപേക്ഷിക്കാം.',
    category: 'Scheme',
    date: '2026-07-27 09:00',
    read: false
  },
  {
    id: 2,
    title: 'Application pending your action',
    titleMl: 'നിങ്ങളുടെ നടപടി ആവശ്യമാണ്',
    desc: 'FSA-2026-0000123 is awaiting verification at your approval level.',
    descMl: 'FSA-2026-0000123 നിങ്ങളുടെ അംഗീകാര ഘട്ടത്തിൽ കാത്തിരിക്കുന്നു.',
    category: 'Workflow',
    date: '2026-07-27 08:45',
    read: false
  },
  {
    id: 3,
    title: 'Payment file received — Finance',
    titleMl: 'പേയ്മെന്റ് ഫയൽ ലഭിച്ചു — ധനകാര്യം',
    desc: 'Milking machine subsidy FSA-2026-0000088 is queued for sanction review.',
    descMl: 'Milking machine subsidy FSA-2026-0000088 സാങ്കشن പരിശോധനയ്ക്കായി ക്യൂവിൽ.',
    category: 'Finance',
    date: '2026-07-26 15:30',
    read: false
  },
  {
    id: 4,
    title: 'Bulk farmer upload validated',
    titleMl: 'ബൾക്ക് കർഷക അപ്‌ലോഡ് സാധൂകരിച്ചു',
    desc: '12 farmer records from Vattiyoorkavu society passed validation.',
    descMl: 'വട്ടിയൂർക്കാവ് സംഘത്തിലെ 12 കർഷക റെക്കോർഡുകൾ സാധൂകരിച്ചു.',
    category: 'Farmer Master',
    date: '2026-07-26 11:20',
    read: true
  },
  {
    id: 5,
    title: 'Consolidated statement CS-2026-07-001',
    titleMl: 'ഏകീകൃത പ്രസ്താവന CS-2026-07-001',
    desc: 'Statement with 2 applications is pending verification.',
    descMl: '2 അപേക്ഷകളുള്ള പ്രസ്താവന പരിശോധനയ്ക്കായി കാത്തിരിക്കുന്നു.',
    category: 'Statements',
    date: '2026-07-25 16:00',
    read: true
  },
  {
    id: 6,
    title: 'Scheduled maintenance — 28 Jul',
    titleMl: 'പരിപാലനം — 28 Jul',
    desc: 'Portal will be read-only from 11:00 PM to 1:00 AM IST for backup.',
    descMl: 'ബാക്കപ്പിനായി 11:00 PM–1:00 AM IST പോർട്ടൽ read-only ആയിരിക്കും.',
    category: 'System',
    date: '2026-07-24 18:00',
    read: true
  },
  {
    id: 7,
    title: 'Helpdesk ticket update',
    titleMl: 'ഹെൽപ്‌ഡെസ്‌ക് ടിക്കറ്റ് അപ്‌ഡേറ്റ്',
    desc: 'TKT-2026-003 — duplicate Voter ID warning is marked In Progress.',
    descMl: 'TKT-2026-003 — ഡുപ്ലിക്കേറ്റ് Voter ID മുന്നറിയിപ്പ് In Progress.',
    category: 'Helpdesk',
    date: '2026-07-23 10:15',
    read: false
  }
];
