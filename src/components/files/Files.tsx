'use client';

import React, { useMemo, useState } from 'react';
import { PageTitle } from '@/components/ui';
import { Space, Table, Tag, Button, Modal } from 'antd';
import type { TableProps } from 'antd';
import Image from 'next/image';
import { File, filesArray } from '@/services/data';
import { useRouter } from 'next/navigation';
import { CopyIcon, PencilSimpleLineIcon, QrCodeIcon } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';

const data = filesArray;

const FilesPage = () => {
  const t = useTranslations('Files');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableProps<File>['columns'] = useMemo(
    () => [
      {
        title: t('Name'),
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: t('Description'),
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: t('Date'),
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: t('Tags'),
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
        title: t('Actions'),
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a onClick={showModal}>
              <QrCodeIcon className="text-text" size={20} />
            </a>
            <a>
              <CopyIcon className="text-text" size={20} />
            </a>
            <a onClick={() => router.push(`./files/edit?id=${record.id}`)}>
              <PencilSimpleLineIcon className="text-text" size={20} />
            </a>
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <section>
      <div className="flex justify-between items-center">
        <PageTitle set="Files" />
        <Button className="mb-7" onClick={() => router.push('./files/add')}>
          + {t('AddFile')}
        </Button>
      </div>
      <div
        className="overflow-x-auto max-w-full bg-card rounded-xl shadow-xs"
        style={{ scrollbarWidth: 'thin', scrollbarGutter: 'stable' }}
      >
        <Table<File> columns={columns} dataSource={data} rowKey="id" pagination={false} />
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
    </section>
  );
};

export default FilesPage;
