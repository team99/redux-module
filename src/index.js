export function getReducerFromModule(module) {
  return module.reducer;
};

export function getReducersFromModules(modules) {
  return Object.keys(modules).reduce((result, key) => {
    result[key] = modules[key].reducer;
    return result;
  }, {});
};

export function getEffectsFromModule(module) {
  return module.effects;
};

export function getEffectsFromModules(modules) {
  return Object.keys(modules).reduce((result, key) => {
    const effects = modules[key].effects;
    if (effects) {
      Object.keys(effects).forEach(key => result.push(effects[key]))
    }
    return result;
  }, []);
};

function reduxModule(opts = {}) {
  return {
    reducer: (state, payload) => {
      let newState;
      if (state) {
        newState = state;
      } else {
        newState = JSON.parse(JSON.stringify(opts.initialState)) || {};
      }

      if (opts.reducers[payload.type]) {
        return opts.reducers[payload.type](newState, payload);
      } else {
        return newState;
      }
    },
    actions: Object.keys(opts.reducers).reduce((result, key) => {
      result[key] = key;
      return result;
    }, {}),
    actionCreators: opts.actionCreators || {},
    effects: opts.effects || {},
  };
};

export default reduxModule;
