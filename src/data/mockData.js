export const mockTransactions = [
  {
    id: 1,
    date: '2025-06-17',
    time: '09:15 AM',
    vendor: 'B&H Photo',
    amount: 450.00,
    category: 'Equipment',
    aiCategory: 'Equipment',
    aiConfidence: 92,
    needsVerification: false,
    activity: 1,
    status: 'automatic'
  },
  {
    id: 2,
    date: '2025-06-17',
    time: '11:00 AM',
    vendor: 'Adobe',
    amount: 52.99,
    category: 'Software',
    aiCategory: 'Software',
    aiConfidence: 97,
    needsVerification: false,
    activity: 0,
    status: 'automatic'
  },
  {
    id: 3,
    date: '2025-06-17',
    time: '01:30 PM',
    vendor: 'Staples',
    amount: 120.00,
    category: 'Office Expenses',
    aiCategory: 'Office Expenses',
    aiConfidence: 88,
    needsVerification: true,
    activity: 2,
    status: 'pending'
  },
  {
    id: 4,
    date: '2025-06-17',
    time: '03:45 PM',
    vendor: 'Uber',
    amount: 35.50,
    category: 'Travel',
    aiCategory: 'Travel',
    aiConfidence: 90,
    needsVerification: false,
    activity: 0,
    status: 'automatic'
  },
  {
    id: 5,
    date: '2025-06-17',
    time: '04:20 PM',
    vendor: 'Fiverr',
    amount: 200.00,
    category: 'Freelancers',
    aiCategory: 'Freelancers',
    aiConfidence: 93,
    needsVerification: false,
    activity: 3,
    status: 'automatic'
  },
  {
    id: 6,
    date: '2025-06-17',
    time: '05:10 PM',
    vendor: 'Amazon',
    amount: 75.00,
    category: 'Uncategorized',
    aiCategory: 'Supplies',
    aiConfidence: 85,
    needsVerification: true,
    activity: 0,
    status: 'pending'
  },
  {
    id: 7,
    date: '2025-06-17',
    time: '06:00 PM',
    vendor: 'Canon',
    amount: 1200.00,
    category: 'Equipment',
    aiCategory: 'Equipment',
    aiConfidence: 95,
    needsVerification: false,
    activity: 2,
    status: 'automatic'
  },
  {
    id: 8,
    date: '2025-06-17',
    time: '07:30 PM',
    vendor: 'Dropbox',
    amount: 19.99,
    category: 'Software',
    aiCategory: 'Software',
    aiConfidence: 98,
    needsVerification: false,
    activity: 0,
    status: 'automatic'
  },
  {
    id: 9,
    date: '2025-06-17',
    time: '08:15 PM',
    vendor: 'Local Coffee Shop',
    amount: 30.00,
    category: 'Production Costs',
    aiCategory: 'Production Costs',
    aiConfidence: 80,
    needsVerification: true,
    activity: 1,
    status: 'pending'
  },
  {
    id: 10,
    date: '2025-06-17',
    time: '09:00 PM',
    vendor: 'Facebook Ads',
    amount: 150.00,
    category: 'Marketing',
    aiCategory: 'Marketing',
    aiConfidence: 89,
    needsVerification: false,
    activity: 0,
    status: 'automatic'
  },
  // New ambiguous/unknown transactions
  {
    id: 11,
    date: '2025-06-18',
    time: '10:05 AM',
    vendor: 'Amazon',
    amount: 120.50,
    category: 'Uncategorized',
    aiCategory: 'Supplies',
    aiConfidence: 60,
    needsVerification: true,
    activity: 0,
    status: 'pending'
  },
  {
    id: 12,
    date: '2025-06-18',
    time: '11:45 AM',
    vendor: 'Walmart',
    amount: 89.99,
    category: 'Uncategorized',
    aiCategory: 'Office Expenses',
    aiConfidence: 55,
    needsVerification: true,
    activity: 0,
    status: 'pending'
  },
  {
    id: 13,
    date: '2025-06-18',
    time: '01:20 PM',
    vendor: 'Target',
    amount: 45.00,
    category: 'Uncategorized',
    aiCategory: 'Supplies',
    aiConfidence: 50,
    needsVerification: true,
    activity: 0,
    status: 'pending'
  },
  {
    id: 14,
    date: '2025-06-18',
    time: '02:30 PM',
    vendor: 'BestBuy',
    amount: 210.00,
    category: 'Uncategorized',
    aiCategory: 'Equipment',
    aiConfidence: 65,
    needsVerification: true,
    activity: 0,
    status: 'pending'
  }
];

export const categories = [
  'Supplies',
  'Freelancers',
  'Equipment',
  'Travel',
  'Marketing',
  'Software',
  'Office Expenses',
  'Uncategorized',
  'Production Costs'
];

export const projects = [
  'Project X',
  'Project Y',
  'Project Z',
  'General Operations'
];