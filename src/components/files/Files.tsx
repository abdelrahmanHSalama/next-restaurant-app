'use client';

import React, { useState } from 'react';
import { PageTitle } from '@/components/ui';
import { Space, Table, Tag, Button, Modal } from 'antd';
import type { TableProps } from 'antd';
import Image from 'next/image';
import { File, filesArray } from '@/services/data';
import { useRouter } from 'next/navigation';

const data = filesArray;

const FilesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableProps<File>['columns'] = [
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
      render: (_, record) => (
        <Space size="middle">
          <a onClick={showModal}>QR Code</a>
          <a>Copy Link</a>
          <a onClick={() => router.push(`./files/edit?id=${record.id}`)}>Edit</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle set="Files" />
        <Button onClick={() => router.push('./files/add')}>+ Add File</Button>
      </div>
      <div className="overflow-x-auto max-w-full">
        <Table<File> columns={columns} dataSource={data} />
      </div>
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
