'use client';
import React from 'react';
import { DarkLightProvider } from './DarkLightProvider';
import { AntDProvider } from './AntDProvider';
import { ColorsProvider } from './ColorsProvider';
import { SideBarProvider } from './SideBarProvider';
import '@ant-design/v5-patch-for-react-19';

export const UiProvider: React.FC<{ children: React.ReactNode; locale: string }> = ({
  children,
  locale,
}) => {
  return (
    <DarkLightProvider>
      <ColorsProvider>
        <AntDProvider locale={locale}>
          <SideBarProvider>{children}</SideBarProvider>
        </AntDProvider>
      </ColorsProvider>
    </DarkLightProvider>
  );
};
