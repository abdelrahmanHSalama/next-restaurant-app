'use client';

import React, { useEffect, useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Breadcrumb, Upload, App, Form, Input, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { supabase } from '@/services/libs/auth';
import TextArea from 'antd/es/input/TextArea';

const { Dragger } = Upload;

const AddFilePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const t = useTranslations('Files');
  const router = useRouter();
  const { message } = App.useApp();

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
  }, [userId]);

  const handleSubmit = async (values: { title: string; description: string; fileList: File[] }) => {
    setLoading(true);
    try {
      const { error: storageError } = await supabase.storage
        .from('files-uploaded')
        .upload(`${userId}/${values.fileList[0].name}`, values.fileList[0]);
      if (storageError) throw storageError;

      const { error: dbError } = await supabase.from('file_metadata').insert({
        file_path: `${userId}/${values.fileList[0].name}`,
        title: values.title,
        description: values.description,
        user_id: userId,
      });
      if (dbError) throw dbError;

      message.success('File uploaded successfully!');
      router.push('/files');
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const props: UploadProps = {
    name: 'file',
    accept: '.pdf',
    disabled: loading,
    multiple: false,
    beforeUpload: () => false,
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
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
      <div className="bg-card p-8 rounded-xl shadow-xs text-center w-fit md:min-w-xl mx-auto mt-6">
        <h2 className="font-bold text-2xl capitalize border-b border-border pb-4 mb-4">
          {t('uploadNewFile')}
        </h2>
        <p className="mb-4">{t('addCardDesc')}</p>

        <Form
          form={form}
          layout="vertical"
          style={{ width: '100%' }}
          onFinish={handleSubmit}
          initialValues={{ fileList: [] }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: 'Please enter a title' },
              { min: 3, message: 'Title must be at least 3 characters' },
            ]}
          >
            <Input placeholder="Enter file title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please enter a description' },
              {
                min: 10,
                message: 'Description must be at least 10 characters',
              },
            ]}
          >
            <TextArea rows={4} placeholder="Enter file description" maxLength={500} showCount />
          </Form.Item>

          <Form.Item
            label="Upload"
            name="fileList"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[{ required: true, message: 'Please upload a file' }]}
          >
            <Dragger {...props} className="p-8 w-full bg-foreground rounded-xl shadow-sm">
              <p className="ant-upload-drag-icon text-primary">
                <InboxOutlined style={{ fontSize: '48px' }} />
              </p>
              <p className="ant-upload-text text-lg font-medium">
                {loading ? 'Upload in progress...' : 'Click or drag PDF to upload'}
              </p>
              <p className="ant-upload-hint text-text">
                Maximum file size: 10MB. Only PDF files accepted.
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <div className="flex gap-4">
              <Button type="primary" htmlType="submit" loading={loading}>
                {loading ? 'Uploading...' : 'Upload File'}
              </Button>
              <Button htmlType="reset" disabled={loading}>
                Reset
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default AddFilePage;
