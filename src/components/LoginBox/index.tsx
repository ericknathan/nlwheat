import { useContext } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';
import { AuthContext } from '../../contexts/auth';

import styles from './styles.module.scss';
import sealImage from '../../assets/seal.svg';

export function LoginBox() {
  const { signInUrl } = useContext(AuthContext);

  return (
    <div className={styles.loginBoxWrapper}>
      <img className={styles.seal} src={sealImage} alt="Seal da Rocketseat" />
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size='24' />
        Entrar com Github
      </a>
    </div>
  );
}
