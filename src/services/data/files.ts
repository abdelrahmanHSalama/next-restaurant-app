export interface File {
  id: string;
  name: string;
  description: string;
  date: string;
  tags: string[];
}

export const filesArray: File[] = [
  {
    id: '1',
    name: 'Menu_Summer2023.pdf',
    description: 'Seasonal summer menu with new dishes',
    date: '2023-06-15',
    tags: ['menu', 'current'],
  },
  {
    id: '2',
    name: 'Health_Inspection_Report.pdf',
    description: 'Latest health inspection results',
    date: '2023-07-10',
    tags: ['compliance', 'important'],
  },
  {
    id: '3',
    name: 'Vendor_Contracts.xlsx',
    description: 'Active vendor agreements and contracts',
    date: '2023-05-22',
    tags: ['contracts', 'finance'],
  },
  {
    id: '4',
    name: 'Employee_Handbook.pdf',
    description: 'Updated staff policies and procedures',
    date: '2023-04-05',
    tags: ['hr', 'policies'],
  },
  {
    id: '5',
    name: 'Salads.pdf',
    description: 'Current salad selection and pairings',
    date: '2023-08-01',
    tags: ['menu'],
  },
];
