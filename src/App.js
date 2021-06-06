import HYDataShow from "./pages/data-show";
import HYFileManager from "./pages/file-manager";
import HYAppTitle from "./pages/app-title";
import HYAppFooter from "./pages/app-footer"

import { Provider } from 'react-redux';
import { store } from './store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HYAppTitle />
        <HYFileManager/>
        <HYDataShow/>
        <HYAppFooter/>
      </Provider>
    </div>
  );
}

export default App;
