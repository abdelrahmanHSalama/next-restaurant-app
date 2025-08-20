'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { PageTitle } from '@/components/ui';
import { Space, Table, Tag, Button, Modal, QRCode, App } from 'antd';
import type { TableProps } from 'antd';
import { useRouter } from 'next/navigation';
import { CopyIcon, PencilSimpleLineIcon, QrCodeIcon } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { supabase } from '@/services/libs/auth';
import dayjs from 'dayjs';

interface FileRow {
  id: string;
  title: string;
  created_at?: string;
  tags: string[];
  url?: string;
  description?: string;
}

const FilesPage = () => {
  const router = useRouter();
  const t = useTranslations('Files');
  const { message } = App.useApp();
  const [userId, setUserId] = useState<string>('');
  const [data, setData] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCode, setQrCode] = useState('');

  const getUser = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      setUserId(user?.user?.id || '');
    } catch (error) {
      console.error('Error getting user:', error);
    }
  };

  useEffect(() => {
    getUser();
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const { data: metadata, error: metaError } = await supabase
          .from('file_metadata')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(10);
        if (metaError) throw metaError;

        const filesWithUrl: FileRow[] = metadata.map((file) => {
          const { data: urlData } = supabase.storage
            .from('files-uploaded')
            .getPublicUrl(file.file_path);

          return {
            id: file.id,
            title: file.title,
            created_at: file.created_at,
            tags: file.tags,
            url: urlData?.publicUrl,
            description: file.description,
          };
        });
        setData(filesWithUrl);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchFiles();
    }
  }, [userId]);

  const columns: TableProps<FileRow>['columns'] = useMemo(
    () => [
      {
        title: t('Name'),
        dataIndex: 'title',
        key: 'title',
        render: (text) => <a>{text}</a>,
      },
      {
        title: t('Description'),
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: t('Date'),
        dataIndex: 'created_at',
        key: 'created_at',
        render: (date) => dayjs(date).format('DD/MM/YYYY'),
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
            <a onClick={() => handleModal(record.url || '')}>
              <QrCodeIcon className="text-text" size={20} />
            </a>
            <a onClick={() => handleCopy(record.url || '')}>
              <CopyIcon className="text-text" size={20} />
            </a>
            <a onClick={() => router.push(`/files/edit?id=${record.id}`)}>
              <PencilSimpleLineIcon className="text-text" size={20} />
            </a>
          </Space>
        ),
      },
    ],
    [t, router]
  );

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    message.success('Link Copied to Clipboard!');
  };

  const handleModal = (link: string) => {
    setIsModalOpen(true);
    setQrCode(link);
  };

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
        style={{ scrollbarWidth: 'thin' }}
      >
        <Table<FileRow>
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={false}
          loading={loading}
          bordered
        />
      </div>
      <Modal
        title="QR Code"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        className="flex items-center justify-center"
      >
        <QRCode size={256} value={qrCode} />
      </Modal>
    </section>
  );
};

export default FilesPage;
