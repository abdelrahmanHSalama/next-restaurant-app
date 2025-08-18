export interface Link {
  id: string;
  name: string;
  description: string;
  link: string;
  date: string;
  tags: string[];
  comments: string[];
}

export const linksArray: Link[] = [
  {
    id: '1',
    name: 'Restaurant menu',
    description: '',
    link: 'https://en.wikipedia.org/wiki/Restaurant_menu',
    date: '2023-06-15',
    tags: ['menu', 'operations'],
    comments: ['Hello!'],
  },
  {
    id: '2',
    name: 'Health inspection',
    description: '',
    link: 'https://en.wikipedia.org/wiki/Health_inspection',
    date: '2023-07-10',
    tags: ['compliance', 'health', 'safety'],
    comments: [],
  },
  {
    id: '3',
    name: 'Contract',
    description: '',
    link: 'https://en.wikipedia.org/wiki/Contract',
    date: '2023-05-22',
    tags: ['legal', 'contracts', 'finance'],
    comments: [],
  },
  {
    id: '4',
    name: 'Employee handbook',
    description: '',
    link: 'https://en.wikipedia.org/wiki/Employee_handbook',
    date: '2023-04-05',
    tags: ['hr', 'policies', 'training'],
    comments: [],
  },
  {
    id: '5',
    name: 'Salad',
    description: '',
    link: 'https://en.wikipedia.org/wiki/Salad',
    date: '2023-08-01',
    tags: ['menu', 'food'],
    comments: [],
  },
];
