'use client';

import { Link, linksArray } from '@/services/data';
import { TrashSimpleIcon } from '@phosphor-icons/react';
import { Button, Input, message, QRCode, Select, Tag } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Breadcrumb } from 'antd';
import { useTranslations } from 'next-intl';
import { computeFromManifest } from 'next/dist/build/utils';

const { TextArea } = Input;

const AddLinkPage = () => {
  const t = useTranslations('Links');

  const router = useRouter();
  const [link, setLink] = useState<Link>({
    id: '',
    name: '',
    description: '',
    link: '',
    date: '',
    tags: [],
    comments: [],
  });
  const [inputValue, setInputValue] = useState('');
  const [localTags, setLocalTags] = useState<string[]>(link.tags || []);
  const [qrCode, setQrCode] = useState('https://www.google.com');
  const [commentsBoxValue, setCommentsBoxValue] = useState('');

  const [messageApi, contextHolder] = message.useMessage();

  const handleNewTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setLocalTags([...localTags, inputValue.trim()]);
      setLink((prev) => ({ ...prev, tags: localTags }));
      setInputValue('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link.link);
    messageApi.success('Link Copied to Clipboard!');
  };

  const handleQrCodeGen = () => {
    let url: string = link?.link;
    if (!url) {
      url = 'https://www.google.com';
    }
    setQrCode(url);
  };

  const folderOptions = [
    { value: 'menus', label: `🔴 ${t('menus')}` },
    { value: 'marketing', label: `🔵 ${t('marketing')}` },
    { value: 'finance', label: `🟢 ${t('finance')}` },
  ];

  return (
    <div className="space-y-2 bg-card mb-4 p-8 rounded-xl shadow-xs">
      {contextHolder}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: (
                <span
                  className="p-1 text-text/70 hover:text-text hover:bg-text/20 transition-all duration-150 cursor-pointer rounded-md"
                  onClick={() => router.push('/links')}
                >
                  {t('title')}
                </span>
              ),
            },
            {
              title: 'Add New Link',
            },
          ]}
          params={{ id: link.name }}
        />
        <div className="flex gap-2 items-center">
          <Button onClick={handleCopy}>{t('copy')}</Button>
          <button className="flex items-center justify-between gap-2 bg-card px-3.5 leading-8.5 border border-border rounded-lg cursor-pointer hover:border-danger hover:text-danger translation-all duration-150">
            <TrashSimpleIcon className="text-danger" size={16} /> {t('delete')}
          </button>
        </div>
      </div>
      <div className="flex gap-4 flex-col md:flex-row mt-6">
        <div className="flex-2/3 space-y-4">
          <div className="space-y-1">
            <h3 className="ms-0.5 font-semibold">{t('url')}</h3>
            <div className="flex gap-1 items-center">
              <Input
                defaultValue={link.link}
                onChange={(e) => setLink((prev) => ({ ...prev, link: e.target.value }))}
                placeholder="Add URL"
              />
              <Button onClick={handleQrCodeGen}>Generate QR Code</Button>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5">{t('Name')}</h3>
            <Input
              defaultValue={link.name}
              onChange={(e) => setLink((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Add Name"
            />
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5">{t('Description')}</h3>
            <TextArea
              placeholder="Add Description"
              defaultValue={link.description}
              onChange={(e) => setLink((prev) => ({ ...prev, description: e.target.value }))}
            />
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
            <div className="space-y-2">
              <div className="flex items-end gap-1">
                <TextArea
                  placeholder="Add Comments"
                  value={commentsBoxValue}
                  onChange={(e) => setCommentsBoxValue(e.target.value)}
                />
                <Button
                  onClick={(e) =>
                    setLink((prev) => ({ ...prev, comments: [...prev.comments, commentsBoxValue] }))
                  }
                >
                  {t('AddComment')}
                </Button>
              </div>
              {link?.comments.map((c) => (
                <p className="bg-background p-2 rounded-lg" key={Date.now()}>
                  {c}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1/3 space-y-4">
          <div className="space-y-1">
            <h3 className="ms-0.5 font-semibold">{t('folder')}</h3>
            <Select options={folderOptions} style={{ width: '100%' }} defaultValue="menus" />
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5">{t('qrCode')}</h3>
            <div className="w-full border border-border p-2 rounded-lg bg-card flex flex-col items-center">
              <QRCode value={qrCode}></QRCode>
              <p>{qrCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLinkPage;
