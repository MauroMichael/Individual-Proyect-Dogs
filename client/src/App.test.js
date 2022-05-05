import {render} from '@testing-library/react';
import LandingPage from './components/LandingPage';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';


describe('Landing page test',  () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;
  let landing;

  beforeEach(() => {
      store = mockStore(initialState);
      
      landing = (
          <Provider store={store}>
              <BrowserRouter>
                  <LandingPage />
              </BrowserRouter>
          </Provider>
      );
  });

  it('Should render a button to start the app', () => {
      const {getByText} = render(landing);
    
expect(getByText('Get Inside')).not.toBeNull();
  });

  it('should have a link to home', () => {
      const {getByRole} = render(landing);
      expect(getByRole('link' ,'/dogs')).not.toBeNull();
  })
});


