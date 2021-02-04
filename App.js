import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as CryptoProvider } from './src/context/CryptoContext';
import { Provider as ImportProvider } from './src/context/ImportContext';
import { Provider as PatientProvider } from './src/context/PatientContext';
import { Provider as SystemProvider } from './src/context/SystemContext';
import ApplicationInitScreen from './src/screens/ApplicationInitScreen';
import DocumentGalleryScreen from './src/screens/DocumentGalleryScreen';
import DocumentImportDrawScreen from './src/screens/DocumentImportDrawScreen';
import DocumentImportScreen from './src/screens/DocumentImportScreen';
import KeyImportScreen from './src/screens/KeyImportScreen';
import LoginScreen from './src/screens/LoginScreen';
import PatientListScreen from './src/screens/PatientListScreen';
import PatientScreen from './src/screens/PatientScreen';
import IccApiWBShell from './src/api/IccApiWBShell';
import { setNavigator } from './src/utils/navigationHelper';

const switchNavigator = createSwitchNavigator({
  Init: ApplicationInitScreen,
  Login: LoginScreen,
  ImportKey: KeyImportScreen,

  mainFlow: createStackNavigator({
    List: PatientListScreen,
    Detail: PatientScreen,
    Gallery: DocumentGalleryScreen,
    Import: DocumentImportScreen,
    Draw: DocumentImportDrawScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <>
      <IccApiWBShell />
      <SystemProvider>
        <AuthProvider>
          <CryptoProvider>
            <PatientProvider>
              <ImportProvider>
                <App
                  ref={(navigator) => {
                    setNavigator(navigator);
                  }}
                />
              </ImportProvider>
            </PatientProvider>
          </CryptoProvider>
        </AuthProvider>
      </SystemProvider>
    </>
  );
};
