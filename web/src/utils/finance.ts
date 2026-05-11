import type { FuturePoint, MoneyLine } from '../types'

export const currencyFormatter = new Intl.NumberFormat('nb-NO', {
  style: 'currency',
  currency: import.meta.env.VITE_CURRENCY || 'NOK',
  maximumFractionDigits: 0,
})

export const percentFormatter = new Intl.NumberFormat('nb-NO', {
  style: 'percent',
  maximumFractionDigits: 1,
})

export const parseMoney = (value: string | undefined) => {
  if (!value) return 0

  const parsed = Number(value.replace(/[^0-9.-]+/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}

export const parsePercent = (value: string | undefined) => {
  const parsed = parseMoney(value)
  if (parsed <= 0) return 0
  return parsed > 1 ? parsed / 100 : parsed
}

const makeId = (text: string, amount = 0, index = 0) =>
  text.split('').reduce((sum, char) => sum + char.charCodeAt(0), index) + amount

export const parseMoneyLines = (value: string | undefined): MoneyLine[] => {
  if (!value) return []

  return value
    .split(';')
    .map((line, index) => {
      const [name, amount, note] = line.split(':')
      const cleanName = name?.trim() ?? ''
      const parsedAmount = parseMoney(amount)
      return {
        id: makeId(cleanName, parsedAmount, index),
        name: cleanName,
        amount: parsedAmount,
        note: note?.trim(),
      }
    })
    .filter((line) => line.name && line.amount > 0)
}

export const sumMoneyLines = (lines: MoneyLine[]) =>
  lines.reduce((sum, line) => sum + line.amount, 0)

export const buildFutureProjection = (
  netMonthlyCash: number,
  totalDebt: number,
): FuturePoint[] =>
  Array.from({ length: 6 }, (_, index) => {
    const month = index + 1
    const optimisticExtra = Math.max(0, netMonthlyCash) * month
    const debtPaydown = Math.min(totalDebt, optimisticExtra * 0.35)

    return {
      month,
      buffer: optimisticExtra - debtPaydown,
      debt: Math.max(0, totalDebt - debtPaydown),
    }
  })
