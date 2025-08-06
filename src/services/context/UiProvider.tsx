'use client'
import React from 'react'
import { DarkLightProvider } from './DarkLightProvider'
import { AntDProvider } from './AntDProvider'
import { ColorsProvider } from './ColorsProvider'
import { SideBarProvider } from './SideBarProvider'

export const UiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DarkLightProvider>
      <ColorsProvider>
        <AntDProvider>
          <SideBarProvider>
          {children}
          </SideBarProvider>
        </AntDProvider>
      </ColorsProvider>
    </DarkLightProvider>
  )
}
