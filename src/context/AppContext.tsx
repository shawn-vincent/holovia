"use client"
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import type { AppState, Activity, ChatMessage, UserSettings } from '@/types/index'
import { DEFAULT_SETTINGS } from '@/types/index'

type Action =
  | { type: 'SET_SETTINGS'; payload: Partial<UserSettings> }
  | { type: 'SET_ACTIVITIES'; payload: Activity[] }
  | { type: 'ADD_ACTIVITY'; payload: Activity }
  | { type: 'UPDATE_ACTIVITY'; payload: Activity }
  | { type: 'SET_CHAT'; payload: ChatMessage[] }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CHAT_EXPANDED'; payload: boolean }

const initialState: AppState = {
  settings: DEFAULT_SETTINGS,
  activities: [],
  chatHistory: [],
  uiState: { isLoading: false, error: null, chatExpanded: false },
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<Action>
} | null>(null)

const STORAGE_KEY = 'holovia:v0'

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_SETTINGS': {
      return { ...state, settings: { ...state.settings, ...action.payload } }
    }
    case 'SET_ACTIVITIES':
      return { ...state, activities: action.payload }
    case 'ADD_ACTIVITY':
      return { ...state, activities: [action.payload, ...state.activities] }
    case 'UPDATE_ACTIVITY':
      return {
        ...state,
        activities: state.activities.map((a) => (a.id === action.payload.id ? action.payload : a)),
      }
    case 'SET_CHAT':
      return { ...state, chatHistory: action.payload }
    case 'ADD_MESSAGE':
      return { ...state, chatHistory: [...state.chatHistory, action.payload] }
    case 'SET_LOADING':
      return { ...state, uiState: { ...state.uiState, isLoading: action.payload } }
    case 'SET_ERROR':
      return { ...state, uiState: { ...state.uiState, error: action.payload } }
    case 'SET_CHAT_EXPANDED':
      return { ...state, uiState: { ...state.uiState, chatExpanded: action.payload } }
    default:
      return state
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // hydrate from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AppState>
        if (parsed.settings) dispatch({ type: 'SET_SETTINGS', payload: parsed.settings })
        if (parsed.activities) dispatch({ type: 'SET_ACTIVITIES', payload: parsed.activities })
        if (parsed.chatHistory) dispatch({ type: 'SET_CHAT', payload: parsed.chatHistory })
      }
    } catch (e) {
      console.error('Failed to restore state', e)
    }
  }, [])

  // persist to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    const toSave: AppState = state
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch (e) {
      console.error('Failed to save state', e)
    }
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

