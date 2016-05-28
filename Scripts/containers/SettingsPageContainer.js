import { connect } from 'react-redux'
import { openSettingEditor } from '../actions/index'
import SettingsPage from '../components/SettingsPage'
import { getTranslations } from '../selectors/index'
import locales from '../constants/locales'
import encodings from '../constants/encodings'

const mapStateToProps = (state) => {
  const t = getTranslations(state)

  return {
    translations: t,
    maxRowCount: state.settings.maxRowCount.value,
    maxCharCount: state.settings.maxCharCount.value,
    maxDurationMs: state.settings.maxDurationMs.value,
    maxPauseMs: state.settings.maxPauseMs.value,
    minCps: state.settings.minCps.value,
    maxCps: state.settings.maxCps.value,
    minPauseMs: state.settings.minPauseMs.value,
    minDurationMs: state.settings.minDurationMs.value,
    encoding: state.settings.encoding.value,
    locale: state.settings.locale.value,
    locales: locales.map(locale => ({
      label: t.translate(locale, { scope: 'app.locales' }),
      value: locale,
    })),
    encodings: encodings.map(encoding => ({
      label: t.translate(encoding, { scope: 'app.encodings' }),
      value: encoding,
    })),
  }
}

const mapDispatchToProps = {
  openSettingEditor,
}

const SettingsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage)

export default SettingsPageContainer
