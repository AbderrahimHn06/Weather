import axios from "axios";

// ========= Types ============

export type State = {
  kelTemp: number;
  status: string;
  min: number;
  max: number;
};

export type Action = {
  type: "get";
  api: string;
};

//  =========== Reducer ===========
export function weatherReducer(state: State, action: Action) {
  switch (action.type) {
    case "get": {
      return getWeather(action.api);
    }
    default: {
      console.log("action not found" + action.type);
      return state;
    }
  }
}

// ========== Helper Functions ===========

const getWeather = async (apiUrl: string) => {
  axios.get(apiUrl);
  //   don't miss to add params in type of action
};
