'use client';

import { filesArray } from '@/services/data';
import { TrashSimpleIcon } from '@phosphor-icons/react';
import { Button, Input, Select, Tag } from 'antd';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const { TextArea } = Input;

const EditFilePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const file = filesArray.find((file) => file.id === id);
  const [inputValue, setInputValue] = useState('');
  const [localTags, setLocalTags] = useState<string[]>(file?.tags || []);
  if (!id) {
    return <div className="flex items-center justify-center h-full">⚠ No File Specified</div>;
  }

  if (!file) {
    return <div className="flex items-center justify-center h-full">⚠ File Not Found</div>;
  }

  const handleNewTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setLocalTags([...localTags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const folderOptions = [
    { value: 'menus', label: '🔴 Menus' },
    { value: 'marketing', label: '🟢 Marketing' },
    { value: 'finance', label: '🔵 Finance' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="font-semibold text-xl">{file?.name}</h2>
        <div className="flex gap-1 items-center">
          <Button onClick={() => console.log('Clicked!')}>Copy Link</Button>
          <Button>
            <TrashSimpleIcon className="text-danger" size={16} /> Delete
          </Button>
        </div>
      </div>
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex-2/3 space-y-4">
          <div className="space-y-1">
            <h3 className="ms-0.5 font-semibold">Destination URL</h3>
            <Input value={`https://menus.com/menu/restaurantName/${file?.name}`} />
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5">Short Link</h3>
            <Input addonBefore="http://men.us/" defaultValue="abc123" />
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5 font-semibold">Tags</h3>
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
            <h3 className="ms-0.5 font-semibold">Comments</h3>
            <TextArea placeholder="Add Comments" />
          </div>
        </div>
        <div className="flex-1/3 space-y-4">
          <div className="space-y-1">
            <h3 className="ms-0.5 font-semibold">Folder</h3>
            <Select options={folderOptions} style={{ width: '100%' }} defaultValue="menus" />
          </div>
          <div className="space-y-1">
            <h3 className="ms-0.5">QR Code</h3>
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
