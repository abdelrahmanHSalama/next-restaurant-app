'use client';

import React, { useState } from 'react';
import { PageTitle } from '@/components/ui';
import { Space, Table, Tag, Button, Modal } from 'antd';
import type { TableProps } from 'antd';
import Image from 'next/image';

interface DataType {
  key: string;
  name: string;
  description: string;
  date: string;
  tags: string[];
}

const data: DataType[] = [
  {
    key: '1',
    name: 'Menu_Summer2023.pdf',
    description: 'Seasonal summer menu with new dishes',
    date: '2023-06-15',
    tags: ['menu', 'current'],
  },
  {
    key: '2',
    name: 'Health_Inspection_Report.pdf',
    description: 'Latest health inspection results',
    date: '2023-07-10',
    tags: ['compliance', 'important'],
  },
  {
    key: '3',
    name: 'Vendor_Contracts.xlsx',
    description: 'Active vendor agreements and contracts',
    date: '2023-05-22',
    tags: ['contracts', 'finance'],
  },
  {
    key: '4',
    name: 'Employee_Handbook.pdf',
    description: 'Updated staff policies and procedures',
    date: '2023-04-05',
    tags: ['hr', 'policies'],
  },
  {
    key: '5',
    name: 'Salads.pdf',
    description: 'Current salad selection and pairings',
    date: '2023-08-01',
    tags: ['menu'],
  },
];

const FilesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_) => (
        <Space size="middle">
          <a onClick={showModal}>QR Code</a>
          <a>Copy Link</a>
          <a>Edit</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle set="Files" />
        <Button>+ Add File</Button>
      </div>
      <Table<DataType> columns={columns} dataSource={data} />
      <Modal
        title="QR Code"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Image src="/QR.png" width="500" height="500" alt="QR Code" />
      </Modal>
    </div>
  );
};

export default FilesPage;
