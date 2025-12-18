// ========== Types ==========

export type State = {
  direction: "rtl" | "ltr";
  name: "العربية" | "English";
};

export type Action = {
  type: "setLanguage";
};

// ========== Constants ==========

const languages: {
  arabic: State;
  english: State;
} = {
  arabic: {
    direction: "rtl",
    name: "العربية",
  },
  english: {
    direction: "ltr",
    name: "English",
  },
};

// ========== Reducer ==========

export function languageReducer(state: State, action: Action): State {
  switch (action.type) {
    case "setLanguage":
      return toggleLanguage(state);

    default:
      return state;
  }
}

// ========== Helper Functions ==========

function toggleLanguage(state: State): State {
  return state.direction === "rtl" ? languages.english : languages.arabic;
}
