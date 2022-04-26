import React, { useEffect, useReducer } from 'react';
import { SettingsContext } from './Contexts';

const defaultSettings = {
  pagination: false,
  itemsPerPage: 3,
  moveComplete: false,
  separateComplete: false,
};

const settingsReducer = (state, action) => {
  if (action.type === 'UPDATE') return action.state;

  const newState = { ...state, [action.type]: action.state };
  localStorage.setItem('settings', JSON.stringify(newState));
  return newState;
};

const SettingsProvider = ({ children }) => {
  const [settings, settingsDispatch] = useReducer(
    settingsReducer,
    defaultSettings
  );

  const dispatchHandler = (data) => {
    settingsDispatch({ type: data.type, state: data.state });
  };

  const updateSettings = (data) => {
    settingsDispatch({ type: 'UPDATE', state: data });
  };

  const settingsContext = {
    pagination: settings.pagination,
    itemsPerPage: settings.itemsPerPage,
    moveComplete: settings.moveComplete,
    separateComplete: settings.separateComplete,
    dispatch: dispatchHandler,
    updateAll: updateSettings,
  };

  return (
    <SettingsContext.Provider value={settingsContext}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
