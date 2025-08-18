'use client';

import { filesArray } from '@/services/data';
import { TrashSimpleIcon } from '@phosphor-icons/react';
import { Button, Input, Select, Tag } from 'antd';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Breadcrumb } from 'antd';
import { useTranslations } from 'next-intl';

const { TextArea } = Input;

const EditFilePage = () => {
  const t = useTranslations('Files');
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const file = filesArray.find((file) => file.id === id);
  const [inputValue, setInputValue] = useState('');
  const [localTags, setLocalTags] = useState<string[]>(file?.tags || []);
  if (!id) {
    return <div className="flex items-center justify-center h-full">⚠ {t('noFileId')}</div>;
  }

  if (!file) {
    return <div className="flex items-center justify-center h-full">⚠ {t('noFiles')}</div>;
  }

  const handleNewTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setLocalTags([...localTags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const folderOptions = [
    { value: 'menus', label: `🔴 ${t('menus')}` },
    { value: 'marketing', label: `🔵 ${t('marketing')}` },
    { value: 'finance', label: `🟢 ${t('finance')}` },
  ];

  return (
    <div className="space-y-2 bg-card mb-4 p-8 rounded-xl shadow-xs">
      <div className="flex justify-between items-center flex-wrap gap-2">
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
              title: ':id',
            },
          ]}
          params={{ id: file.name }}
        />
        <div className="flex gap-2 items-center">
          <Button onClick={() => console.log('Clicked!')}>{t('copy')}</Button>
          <button className="flex items-center justify-between gap-2 bg-card px-3.5 leading-8.5 border border-border rounded-lg cursor-pointer hover:border-danger hover:text-danger translation-all duration-150">
            <TrashSimpleIcon className="text-danger" size={16} /> {t('delete')}
          </button>
        </div>
      </div>
      <div className="flex gap-4 flex-col md:flex-row mt-6">
        <div className="flex-2/3 space-y-4">
          <div className="space-y-1">
            <h3 className="ms-0.5 font-semibold">{t('url')}</h3>
            <Input value={`https://menus.com/menu/restaurantName/${file?.name}`} />
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5">{t('Description')}</h3>
            <Input defaultValue={file.description} />
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5 font-semibold">{t('Tags')}</h3>
            <div className="flex flex-wrap gap-0.5 ps-2 pe-0.5 py-2 border border-border rounded-md items-center bg-card">
              {localTags.map((tag) => (
                <Tag
                  key={tag}
                  color={tag.length > 5 ? 'geekblue' : tag === 'important' ? 'red' : 'green'}
                >
                  {tag.toUpperCase()}
                </Tag>
              ))}
              <Input
                type="text"
                size="small"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleNewTag}
                placeholder="Type and press Enter"
                className="flex-1"
                variant="borderless"
              />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5 font-semibold">{t('comments')}</h3>
            <TextArea placeholder="Add Comments" />
          </div>
        </div>
        <div className="flex-1/3 space-y-4">
          <div className="space-y-1">
            <h3 className="ms-0.5 font-semibold">{t('folder')}</h3>
            <Select options={folderOptions} style={{ width: '100%' }} defaultValue="menus" />
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5">{t('qrCode')}</h3>
            <div className="w-full border border-border p-2 rounded-lg bg-card flex justify-center">
              <Image src="/QR.png" width="150" height="150" alt="QR Code" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFilePage;
