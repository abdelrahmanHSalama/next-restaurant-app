'use client';

import { Link } from '@/services/data';
import { Button, Input, message, QRCode, Select, Tag } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { useTranslations } from 'next-intl';

const { TextArea } = Input;

const EditLinkPage = () => {
  const t = useTranslations('Links');

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '0';

  const [link, setLink] = useState<Link>({
    id: '',
    name: '',
    description: '',
    link: '',
    tags: [],
    comments: [],
  });

  useEffect(() => {
    const fetchLink = async () => {
      fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE02_URL}/rest/v1/links?id=eq.${encodeURIComponent(id)}`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE02_ANON_KEY as string,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE02_ANON_KEY}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setLink(data[0]);
          setQrCode(data[0].link);
          console.log(data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchLink();
  }, []);

  const [qrCode, setQrCode] = useState(link.link);

  const [inputValue, setInputValue] = useState('');
  const [localTags, setLocalTags] = useState<string[]>(link.tags || []);
  const [commentsBoxValue, setCommentsBoxValue] = useState('');

  const [messageApi, contextHolder] = message.useMessage();

  if (!id) {
    return <div className="flex items-center justify-center h-full">⚠ {t('noFileId')}</div>;
  }

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

  const handleSave = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE02_URL}/rest/v1/links?id=eq.${encodeURIComponent(id)}`,
      {
        method: 'PATCH',
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE02_ANON_KEY as string,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE02_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation', // get updated row back
        },
        body: JSON.stringify(link),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('Inserted:', data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE02_URL}/rest/v1/links?id=eq.${encodeURIComponent(id)}`,
      {
        method: 'DELETE',
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE02_ANON_KEY as string,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE02_ANON_KEY}`,
          Prefer: 'return=representation',
        },
        body: JSON.stringify(link),
      }
    )
      .then(async (res) => {
        const data = res.status === 204 ? null : await res.json();
        if (!res.ok) throw data || new Error('Delete failed');
        console.log('Deleted:', data);
        messageApi.success('Deleted');
        router.push('/links');
      })
      .catch((err) => {
        console.log(err);
        messageApi.error('Delete failed');
      });
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
              title: ':id',
            },
          ]}
          params={{ id: link.name }}
        />
        <div className="flex gap-1 items-center">
          <Button onClick={handleCopy}>{t('copy')}</Button>
          <Button onClick={handleDelete}>{t('delete')}</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
      <div className="flex gap-4 flex-col md:flex-row mt-6">
        <div className="flex-2/3 space-y-4">
          <div className="space-y-1">
            <h3 className="ms-0.5 font-semibold">{t('url')}</h3>
            <div className="flex gap-1 items-center">
              <Input
                value={link.link}
                onChange={(e) => setLink((prev) => ({ ...prev, link: e.target.value }))}
              />
              <Button onClick={handleQrCodeGen}>Generate QR Code</Button>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5">{t('Name')}</h3>
            <Input
              value={link.name}
              onChange={(e) => setLink((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5">{t('Description')}</h3>
            <TextArea
              placeholder="Add Description"
              value={link.description}
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
              {link.comments &&
                link.comments.map((c) => (
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
              {qrCode && (
                <>
                  <QRCode value={qrCode}></QRCode>
                  <p>{qrCode}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLinkPage;
