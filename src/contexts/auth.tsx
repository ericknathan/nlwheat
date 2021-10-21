import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../services/api';

interface IUser {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

interface IAuthContextData {
  user: IUser | null;
  signInUrl: string;
  signOut: () => void;
}

export const AuthContext = createContext({} as IAuthContextData);

interface IAuthProvider {
  children: ReactNode;
}

interface IAuthResponse {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
}

export function AuthProvider(props: IAuthProvider) {
  const [user, setUser] = useState<IUser | null>(null);
  const signInUrl = `http://localhost:4000/github`;

  async function signIn(githubCode: string) {
    const response = await api.post<IAuthResponse>('authenticate', {
      code: githubCode
    });

    const { token, user } = response.data;

    localStorage.setItem('@dowhile:token', token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);

    return response;
  }

  async function signOut() {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if(token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      api.get<IUser>('profile').then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');
    if(hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);
      signIn(githubCode);
    }
  }, []);

  return <AuthContext.Provider value={{ signInUrl, user, signOut }}>{props.children}</AuthContext.Provider>;
}
