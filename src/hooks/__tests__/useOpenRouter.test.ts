import { extractActivitySuggestions } from '@/hooks/useOpenRouter'

describe('extractActivitySuggestions', () => {
  it('parses suggestions from tokenized lines', () => {
    const text = `Some response\nACTIVITY_SUGGESTION: {"name":"Morning Walk","description":"10 minutes outside"}`
    const res = extractActivitySuggestions(text)
    expect(res).toHaveLength(1)
    expect(res[0].suggestedName).toBe('Morning Walk')
    expect(res[0].suggestedDescription).toBe('10 minutes outside')
  })
})

