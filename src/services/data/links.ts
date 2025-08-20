export interface Link {
  id: string;
  name: string;
  description: string;
  link: string;
  tags: string[];
  comments: string[];
}

export type NewLink = Omit<Link, 'id'>;
