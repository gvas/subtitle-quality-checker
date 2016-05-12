export default {
  app: {
    appBar: {
      title: 'Feliratfájlértékelő',
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
      NO_PROBLEM: 'Problémamentes',
      MERGEABLE: 'Összevonható a következővel',
      TOO_LONG_ROWS: 'Túl hosszú sorok',
      TOO_MANY_CHARACTERS: 'Túl sok karakter',
      TOO_MANY_ROWS: 'Túl sok sor',
      TOO_SHORT_DURATION: 'Túl rövid időtartam',
      TOO_LONG_DURATION: 'Túl hosszú időtartam',
      TOO_LITTLE_CPS: 'Túl kicsi CPS',
      TOO_BIG_CPS: 'Túl nagy CPS',
      TOO_SHORT_PAUSE: 'Túl rövid szünet utána',
    },
    validationErrors: {
      REQUIRED: 'Kötelező',
      POSITIVE_INTEGER: 'Pozitív egész szám',
    },
    errors: {
      title: 'Hibák',
    },
    legend: {
      goodTables: 'Helyes felirattáblák',
      badTables: 'Hibás felirattáblák',
    },
    navMenu: {
      evaluation: 'Értékelés',
      settings: 'Beállítások',
      about: 'Névjegy',
    },
    selectSettingsEditor: {
      cancel: 'Mégsem',
      ok: 'OK',
    },
    indexPage: {
      instructions1: 'Húzd ide a feliratfájlt,',
      instructions2: 'vagy',
      instructions3: 'kattints a fájl kiválasztásához!',
    },
    settingsPage: {
      language: 'Nyelv',
      encoding: 'Feliratfájlok karakterkódolása',
      maxRowCount: 'Felirattáblák maximális hossza (sor)',
      maxCharCount: 'Felirattáblák maximális hossza (karakter)',
      minDurationMs: 'Felirattáblák minimális hossza (ms)',
      maxDurationMs: 'Felirattáblák maximális hossza (ms)',
      maxPauseMs: 'Összevonható felirattáblák közti szünet max. hossza (ms)',
      minCps: 'Minimum CPS',
      maxCps: 'Maximum CPS',
      minPauseMs: 'Minimum szünet a felirattáblák között (ms)',
    },
    statistics: {
      title: 'Statisztika',
      file: 'Fájl',
      goodTablesCount: 'Helyes felirattáblák száma',
      badTablesCount: 'Hibás felirattáblák száma',
    },
    tables: {
      title: 'Felirattáblák',
    },
    tablesNarrow: {
      stats1: 'Kezdet / vég: %(startTimeMs)s -  %(endTimeMs)s',
      stats2: 'Időtartam: %(durationMs)s, Karakterek: %(charCount)s, CPS: %(cps)s',
    },
    tablesWide: {
      startEnd: 'Kezdet / vég',
      duration: 'Időtartam',
      cps: 'CPS',
      rowLength: 'Sorhossz',
      charCount: 'Karakterek',
      text: 'Szöveg',
    },
  },
}
