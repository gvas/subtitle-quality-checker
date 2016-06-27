import { createSelector } from 'reselect'
import counterpart from 'counterpart'
import * as locales from '../locales'
import errorTypes from '../constants/errorTypes'

const getLocale = (state) => state.settings.locale.value
const getFilter = (state) => state.filter
const getTables = (state) => state.subtitle.tables

export const getFilteredTables = createSelector(
  [getFilter, getTables],
  (filter, tables) =>
    filter === null
      ? tables
      : tables.filter(table => table.errors[filter])
)

export const getSubtitleErrors = createSelector(
  [getTables],
  tables => {
    const errors = {}

    for (let errorType in errorTypes) {
      errors[errorType] = 0
    }

    for (let i = 0; i < tables.length; i++) {
      for (let errorType in errorTypes) {
        if (tables[i].errors[errorType]) {
          errors[errorType] += 1
        }
      }
    }

    return errors
  }
)

export const getSubtitleErrorTypes = createSelector(
  [getSubtitleErrors],
  subtitleErrors => {
    const result = []
    for (let errorType in subtitleErrors) {
      if (subtitleErrors[errorType]) {
        result.push(errorType)
      }
    }
    return result
  }
)

export const getGoodTablesCount = createSelector(
  [getTables],
  tables =>
    tables
      .filter(table =>
        Object.values(table.errors).every(hasError => !hasError)
      )
      .length
)

export const getBadTablesCount = createSelector(
  [getTables, getGoodTablesCount],
  (tables, goodTableCount) => tables.length - goodTableCount
)

export const getScore = createSelector(
  [getTables, getBadTablesCount],
  (tables, badTableCount) => {
    return (tables.length !== 0)
      ? 1 - badTableCount / tables.length
      : null
  }
)

export const getTranslations = createSelector(
  [getLocale],
  locale => {
    const translations = new counterpart.Instance()
    translations.registerTranslations(locale, locales[locale])
    translations.setLocale(locale)
    return translations
  }
)
