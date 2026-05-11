import type { MonthDay } from '../types'

export const getCurrentMonthDays = (): MonthDay[] => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1
    const date = new Date(year, month, day)

    return {
      date,
      day,
      isToday: day === today.getDate(),
    }
  })
}

export const monthLocale = (lang: 'no' | 'en') => (lang === 'no' ? 'nb-NO' : 'en-US')
