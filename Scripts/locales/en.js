export default {
  app: {
    appBar: {
      title: 'Subtitle Evaluation',
    },
    locales: {
      hu: 'Magyar',
      en: 'English',
    },
    encodings: {
      'utf-8': 'utf-8',
      'windows-1250': 'windows-1250',
    },
    errorTypes: {
      MERGEABLE: 'Mergeable with the next one',
      TOO_LONG_ROWS: 'Too long rows',
      TOO_MANY_CHARACTERS: 'Too many characters',
      TOO_MANY_ROWS: 'Too many rows',
      TOO_SHORT_DURATION: 'Too short duration',
      TOO_LONG_DURATION: 'Too long duration',
      TOO_LITTLE_CPS: 'Too small CPS',
      TOO_BIG_CPS: 'Too big CPS',
      TOO_SHORT_PAUSE: 'Too short pause after',
    },
    validationErrors: {
      REQUIRED: 'Required',
      POSITIVE_INTEGER: 'Positive integer',
    },
    errors: {
      title: 'Errors',
    },
    legend: {
      goodTables: 'Good tables',
      badTables: 'Bad tables',
    },
    navMenu: {
      evaluation: 'Evaluation',
      settings: 'Settings',
      about: 'About',
    },
    numericalSettingEditor: {
      cancel: 'Cancel',
      ok: 'OK',
    },
    selectSettingEditor: {
      cancel: 'Cancel',
      ok: 'OK',
    },
    indexPage: {
      instructions1: 'Drag the subtitle file here,',
      instructions2: 'or',
      instructions3: 'click to choose the file!',
    },
    settingsPage: {
      language: 'Language',
      encoding: 'Character encoding',
      maxRowCount: 'Tables\' maximum length (rows)',
      maxCharCount: 'Tables\' maximum length (characters)',
      minDurationMs: 'Tables\' minimum length (ms)',
      maxDurationMs: 'Tables\' maximum length (ms)',
      maxPauseMs: 'Maximum pause between mergeable tables (ms)',
      minCps: 'Minimum CPS',
      maxCps: 'Maximum CPS',
      minPauseMs: 'Minimum pause between tables (ms)',
    },
    statistics: {
      title: 'Statistics',
      file: 'File',
      goodTablesCount: 'Number of good tables',
      badTablesCount: 'Number of bad tables',
    },
    tables: {
      title: 'Tables',
      noFilter: 'No filtering',
    },
    tablesNarrow: {
      stats1: 'Start / end: %(startTimeMs)s -  %(endTimeMs)s',
      stats2: 'Duration: %(durationMs)s, Characters: %(charCount)s, CPS: %(cps)s',
    },
    tablesWide: {
      startEnd: 'Start / end',
      duration: 'Duration',
      cps: 'CPS',
      rowLength: 'Row length',
      charCount: 'Characters',
      text: 'Text',
    },
  },
}
