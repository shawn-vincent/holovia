export interface UserProfile {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  lastLoginAt: string
}

export interface UserSettings {
  openRouterApiKey: string
  selectedModel: string
  systemPrompt?: string
  theme: 'light' | 'dark' | 'auto'
}

export interface ActivityUpdate {
  id: string
  content: string
  timestamp: string
  source: 'chat' | 'direct'
}

export interface Activity {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'completed'
  createdAt: string
  updatedAt: string
  updates: ActivityUpdate[]
}

export interface ActivitySuggestion {
  suggestedName: string
  suggestedDescription: string
  accepted: boolean
  createdActivityId?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  activitySuggestions?: ActivitySuggestion[]
}

export interface AppState {
  settings: UserSettings
  activities: Activity[]
  chatHistory: ChatMessage[]
  uiState: {
    isLoading: boolean
    error: string | null
    chatExpanded: boolean
  }
}

export const DEFAULT_SETTINGS: UserSettings = {
  openRouterApiKey: '',
  selectedModel: 'openrouter/auto',
  theme: 'auto',
}

