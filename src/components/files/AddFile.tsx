'use client';

import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Breadcrumb, message, Upload } from 'antd';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const { Dragger } = Upload;

const AddFilePage = () => {
  const t = useTranslations('Files');
  const router = useRouter();
  const props: UploadProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    multiple: true,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} ${t('successUpload')} .`);
      } else if (status === 'error') {
        message.error(`${info.file.name} ${t('errorUpload')}.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    progress: {
      strokeColor: {
        '0%': 'var(--c-primary)',
        '100%': 'var(--c-success)',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <section>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: (
              <span
                className="p-1 text-text/70 hover:text-text hover:bg-text/20 transition-all duration-150 cursor-pointer rounded-md"
                onClick={() => router.push('/files')}
              >
                {t('title')}
              </span>
            ),
          },
          {
            title: t('AddFile'),
          },
        ]}
      />
      <div className="bg-card p-8 rounded-xl shadow-xs text-center w-fit md:min-w-xl mx-auto">
        <h2 className="font-bold text-2xl capitalize border-b border-border pb-4 mb-6">
          {t('uploadNewFile')}
        </h2>
        <p>{t('addCardDesc')}</p>
        <div className="flex justify-center items-center mt-6">
          <Dragger {...props} accept=".pdf" maxCount={1} className="w-full">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{t('uploadFileDesc')}</p>
          </Dragger>
        </div>
      </div>
    </section>
  );
};

export default AddFilePage;
