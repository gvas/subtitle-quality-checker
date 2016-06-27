import types from '../constants/actionTypes'

const initialState = {
  file: null,
  fileContent: null,
  tables: [],
  isLoading: false,
  isParsing: false,
  isEvaluating: false,
}

export default function subtitle(state = initialState, action) {
  switch (action.type) {
    case types.READ_SUBTITLE:
      return {
        ...state,
        file: action.payload,
        isLoading: true,
      }
    case types.READ_SUBTITLE_COMPLETED:
      return {
        ...state,
        fileContent: action.payload,
        isLoading: false,
      }
    case types.READ_SUBTITLE_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case types.PARSE_SUBTITLE:
      return {
        ...state,
        isParsing: true,
      }
    case types.PARSE_SUBTITLE_COMPLETED:
      return {
        ...state,
        isParsing: false,
        tables: action.payload,
      }
    case types.PARSE_SUBTITLE_FAILED:
      return {
        ...state,
        isParsing: false,
      }
    case types.EVALUATE_TABLES:
      return {
        ...state,
        isEvaluating: true,
      }
    case types.EVALUATE_TABLES_COMPLETED:
      return {
        ...state,
        isEvaluating: false,
        tables: action.payload,
      }
    case types.EVALUATE_TABLES_FAILED:
      return {
        ...state,
        isEvaluating: false,
      }
    default:
      return state
  }
}
