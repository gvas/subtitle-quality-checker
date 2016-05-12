import counterpart from 'counterpart'
import { types } from '../actions/index'
import * as locales from '../locales'

const initialTranslations = new counterpart.Instance()
initialTranslations.registerTranslations('en', locales.en)
initialTranslations.setLocale('en')

const initialState = {
  value: 'en',
  isEdited: false,
  editedValue: 'en',
  translations: initialTranslations,
}

export default function localization(state = initialState, action) {
  switch (action.type) {
    case types.OPEN_LOCALIZATION_EDITOR:
      return {
        ...state,
        isEdited: true,
        editedValue: state.value,
      }
    case types.CHANGE_LOCALIZATION:
      return {
        ...state,
        editedValue: action.payload,
      }
    case types.ROLLBACK_LOCALIZATION:
      return {
        ...state,
        isEdited: false,
        editedValue: state.value,
      }
    case types.SUBMIT_LOCALIZATION: {
      const translations = new counterpart.Instance()
      translations.registerTranslations(state.editedValue, locales[state.editedValue])
      translations.setLocale(state.editedValue)

      return {
        ...state,
        value: state.editedValue,
        isEdited: false,
        translations,
      }
    }
    default:
      return state
  }
}
