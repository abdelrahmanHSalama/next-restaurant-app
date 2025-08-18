'use client';

import React, { useState } from 'react';
import { PageTitle } from '@/components/ui';
import { Space, Table, Tag, Button, Modal, QRCode, message } from 'antd';
import type { TableProps } from 'antd';
import Image from 'next/image';
import { Link, linksArray } from '@/services/data';
import { useRouter } from 'next/navigation';
import { CopyIcon, PencilSimpleLineIcon, QrCodeIcon } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';

const data = linksArray;

const LinksPage = () => {
  const t = useTranslations('Links');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const router = useRouter();

  const handleModal = (link: string) => {
    setIsModalOpen(true);
    setQrCode(link);
  };

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    messageApi.success('Link Copied to Clipboard!');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableProps<Link>['columns'] = [
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('Link'),
      dataIndex: 'link',
      key: 'link',
      render: (text) => <a href={text}>{text}</a>,
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
          <a onClick={() => handleModal(record.link)}>
            <QrCodeIcon className="text-text" size={20} />
          </a>
          <a onClick={() => handleCopy(record.link)}>
            <CopyIcon className="text-text" size={20} />
          </a>
          <a onClick={() => router.push(`./links/edit?id=${record.id}`)}>
            <PencilSimpleLineIcon className="text-text" size={20} />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <section>
      {contextHolder}
      <div className="flex justify-between items-center">
        <PageTitle set="Links" />
        <Button className="mb-7" onClick={() => router.push('./links/add')}>
          + {t('AddLink')}
        </Button>
      </div>
      <div
        className="overflow-x-auto max-w-full bg-card rounded-xl shadow-xs"
        style={{ scrollbarWidth: 'thin', scrollbarGutter: 'stable' }}
      >
        <Table<Link> columns={columns} dataSource={data} rowKey="id" pagination={false} />
      </div>
      <Modal
        title="QR Code"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="flex items-center justify-center"
      >
        <QRCode size={256} value={qrCode} />
      </Modal>
    </section>
  );
};

export default LinksPage;
