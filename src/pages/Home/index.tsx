import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import styles from './styles.module.scss';

import { LoginBox } from '../../components/LoginBox';
import { MessageList } from '../../components/MessageList';
import { SendMessageForm } from '../../components/SendMessageForm';

export function Home() {
  const { user } = useContext(AuthContext);
  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
      <MessageList />
      { !!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  )
}