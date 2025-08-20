'use client';

import { TrashSimpleIcon } from '@phosphor-icons/react';
import { Button, Input, Select, Tag, Breadcrumb, QRCode, App } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { supabase } from '@/services/libs/auth';
import { SpinnerLoading } from '../ui';

interface IFile {
  id: string;
  user_id: string;
  file_path: string;
  title: string;
  created_at?: string;
  description?: string;
  url: string;
  folder: string;
  tags: string[];
}

const EditFilePage = () => {
  const t = useTranslations('Files');
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { message } = App.useApp();

  const [file, setFile] = useState<IFile | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [localTags, setLocalTags] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [folder, setFolder] = useState('menus');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchFile = async () => {
      setLoading(true);
      try {
        const { data: metadata, error } = await supabase
          .from('file_metadata')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching file:', error);
          message.error('Failed to fetch file');
          setLoading(false);
          return;
        }
        const { data: urlData } = supabase.storage
          .from('files-uploaded')
          .getPublicUrl(metadata.file_path);
        const fileWithUrl: IFile = {
          id: metadata.id,
          user_id: metadata.user_id,
          file_path: metadata.file_path,
          title: metadata.title,
          created_at: metadata.created_at,
          tags: metadata.tags,
          folder: metadata.folder,
          url: urlData?.publicUrl,
          description: metadata.description,
        };

        setFile(fileWithUrl);
        setLocalTags(fileWithUrl.tags || []);
        setDescription(fileWithUrl.description || '');
        setFolder(fileWithUrl.folder || 'menus');
        setTitle(fileWithUrl.title || '');
        } catch (error) {
        console.error('Error fetching file:', error);
        message.error('Failed to fetch file');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchFile();
  }, [id, message]);

  if (!file || loading) {
    return <SpinnerLoading />;
  }

  const handleNewTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setLocalTags([...localTags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleSave = async () => {
    if (!title) {
      message.error('Title is required');
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from('file_metadata')
      .update({
        title,
        description,
        tags: localTags,
        folder,
      })
      .eq('id', id);

    setLoading(false);
    if (error) {
      console.error('Error updating file:', error);
      message.error('Failed to update file');
    } else {
      message.success('File updated successfully');
      router.push('/files');
    }
  };

  const handleDelete = async () => {
    setLoading(true);

    // delete from storage
    const { error: storageError } = await supabase.storage
      .from('files-uploaded')
      .remove([`${file.file_path}`]);

    if (storageError) {
      console.error('Error deleting from storage:', storageError);
      message.error('Failed to delete file from storage');
      setLoading(false);
      return;
    }

    // delete metadata
    const { error: dbError } = await supabase.from('file_metadata').delete().eq('id', id);

    setLoading(false);
    if (dbError) {
      console.error('Error deleting metadata:', dbError);
      message.error('Failed to delete file metadata');
    } else {
      message.success('File deleted successfully');
      router.push('/files');
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
              title: file.title,
            },
          ]}
        />
        <div className="flex gap-2 items-center">
          <Button onClick={handleSave} loading={loading} type="primary">
            {t('Save')}
          </Button>
          <button
            onClick={handleDelete}
            className="flex items-center justify-between gap-2 bg-card px-3.5 leading-8.5 border border-border rounded-lg cursor-pointer hover:border-danger hover:text-danger translation-all duration-150"
          >
            <TrashSimpleIcon className="text-danger" size={16} /> {t('delete')}
          </button>
        </div>
      </div>
      <div className="flex gap-4 flex-col lg:flex-row mt-6">
        <div className="flex-2/3 space-y-4">
          <div className="space-y-1">
            <h3 className="ms-0.5">{t('Name')}</h3>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5 font-semibold">{t('url')}</h3>
            <Input value={file.url} readOnly />
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5">{t('Description')}</h3>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
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
        </div>
        <div className="flex-1/3 space-y-4">
          <div className="space-y-1">
            <h3 className="ms-0.5 font-semibold">{t('folder')}</h3>
            <Select
              options={folderOptions}
              style={{ width: '100%' }}
              value={folder}
              onChange={(val) => setFolder(val)}
            />
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5">{t('qrCode')}</h3>
            <div className="w-full border border-border p-2 rounded-lg bg-card flex justify-center">
              <QRCode value={file.url} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFilePage;
