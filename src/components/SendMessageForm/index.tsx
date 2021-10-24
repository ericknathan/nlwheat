import { useContext, useState, FormEvent } from 'react';
import { VscGithubInverted, VscSignOut, VscCloud } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

import styles from './styles.module.scss';
import sealImage from '../../assets/seal.svg';
import { Toast } from '../Toast';

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messageSended, setMessageSended] = useState(false);

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if(!message.trim()) return;

    setMessage('');
    setMessageSended(true);
    await api.post('messages', { message });

    setInterval(() => {
      setMessageSended(false);
    }, 6000)
  }

  return (
    <>
      {
        messageSended && (
          <Toast />
        )
      }
      <div className={styles.sendMessageFormWrapper}>
        <img className={styles.seal} src={sealImage} alt="Seal da Rocketseat" />
        <button onClick={signOut} className={styles.signOutButton}>
          <VscSignOut size='32' />
        </button>
        <header className={styles.userInformation}>
          <div className={styles.userImage}>
            <img src={user?.avatar_url} alt={user?.name} />
          </div>
          <strong className={styles.userName}>{user?.name}</strong>
          <span className={styles.userGithub}>
            <VscGithubInverted size='16' />
            {user?.login}
          </span>
        </header>

        <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
          <label htmlFor='message'>Mensagem</label>
          <textarea
            name='message'
            id='message'
            placeholder='Qual a sua expectativa para o evento?'
            onChange={event => setMessage(event.target.value)}
            value={message}
          />

          <button type='submit'>Enviar Mensagem</button>
        </form>
        <Link className={styles.cloudButton} to="/cloud">
          <VscCloud size='24' />
          Nuvem de palavras
        </Link>
      </div>
    </>
  );
}
