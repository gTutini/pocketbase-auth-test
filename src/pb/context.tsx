'use client'
import { ReactNode, createContext, useContext } from 'react'
import PocketBase from 'pocketbase'

const BASE_URL = 'http://127.0.0.1:8090'
const pb = new PocketBase(BASE_URL)

const PocketContext = createContext<PocketBase>(pb)

export const PocketProvider = ({ children }: { children: ReactNode }) => {
  return <PocketContext.Provider value={pb}>{children}</PocketContext.Provider>
}

export const usePocket = () => useContext(PocketContext)
