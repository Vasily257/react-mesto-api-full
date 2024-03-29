import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CardsContext } from '../../contexts/CardsContext';
import { SpinnerContext } from '../../contexts/SpinnerContext';

import Header from '../Header/Header';
import ProtectedRoute from '../HOC/ProtectedRoute';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Spinner from '../Spinner/Spinner';

import { registrationText, BASE_ALIAS } from '../../utils/constants';

import * as auth from '../../utils/auth';
import Notfoundpage from '../Notfoundpage/Notfoundpage';
import { api } from '../../utils/api';

function App() {
  const [cards, setCards] = useState([]);

  const [isSpinnerShown, setIsSpinnerShown] = useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    loggedIn && navigate(`${BASE_ALIAS.MESTO_FRONT}/`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  function onRegister({ email, password }) {
    setIsSpinnerShown(true);

    auth
      .register({ email, password })
      .then((data) => {
        if (data) {
          setIsRegistered(true);
          setInfoTooltipOpen(true);
          setEmail(data.email);
          navigate(`${BASE_ALIAS.MESTO_FRONT}/signin`);
        }
      })
      .catch((error) => {
        setIsRegistered(false);
        setInfoTooltipOpen(true);
        console.log(error);
      })
      .finally(() => {
        setIsSpinnerShown(false);
      });
  }

  function onLogin({ email, password }) {
    setIsSpinnerShown(true);

    auth
      .authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          api.setToken(data.token);
          setEmail(email);
          setLoggedIn(true);
        } else {
          setIsSpinnerShown(false);
        }
      })
      .catch((error) => {
        setInfoTooltipOpen(true);
        console.log(error);
      })
      .finally(() => {
        setIsSpinnerShown(false);
      });
  }

  function checkToken() {
    setIsSpinnerShown(true);

    const token = localStorage.getItem('token');

    if (token) {
      auth
        .getContent(token)
        .then((response) => {
          if (response) {
            setEmail(response.email);
            setLoggedIn(true);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsSpinnerShown(false);
        });
    } else {
      setIsSpinnerShown(false);
    }
  }

  function onSignOut() {
    localStorage.removeItem('token');
    setIsMenuOpen(false);
    setEmail('');
    setLoggedIn(false);
  }

  return (
    <div className="page index-page">
      <SpinnerContext.Provider value={{ isSpinnerShown, setIsSpinnerShown }}>
        <Header
          userEmail={email}
          onSignOut={onSignOut}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />

        <CardsContext.Provider value={{ cards, setCards }}>
          <Routes>
            <Route
              path={`${BASE_ALIAS.MESTO_FRONT}/`}
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path={`${BASE_ALIAS.MESTO_FRONT}/signup`}
              element={<Register onRegister={onRegister} />}
            />
            <Route path={`${BASE_ALIAS.MESTO_FRONT}/signin`} element={<Login onLogin={onLogin} />} />
            <Route path={`${BASE_ALIAS.MESTO_FRONT}/*`} element={<Notfoundpage />} />
          </Routes>
        </CardsContext.Provider>

        <Spinner isOpen={isSpinnerShown} />
        <InfoTooltip
          isOpen={infoTooltipOpen}
          isRegistered={isRegistered}
          infoText={registrationText}
          setInfoTooltipOpen={setInfoTooltipOpen}
        />
      </SpinnerContext.Provider>
    </div>
  );
}

export default App;
