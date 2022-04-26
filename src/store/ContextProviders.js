import SettingsProvider from './SettingsProvider';
import TasksProvider from './TasksProvider';
import FoldersProvider from './FoldersProvider';

const ContextProviders = ({ children }) => {
  return (
    <SettingsProvider>
      <TasksProvider>
        <FoldersProvider>{children}</FoldersProvider>
      </TasksProvider>
    </SettingsProvider>
  );
};

export default ContextProviders;
