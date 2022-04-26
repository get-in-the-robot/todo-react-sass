import Container from '../UI/Container';
import { GithubLogo, TelegramLogo } from 'phosphor-react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <Container>
      <footer className={styles.footer}>
        <ul className={styles.footer__links}>
          <li className={styles.footer__link}>
            <a href="https://github.com/get-in-the-robot/">
              <GithubLogo weight="fill" />
              <span>GitHub</span>
            </a>
          </li>
          <li className={styles.footer__link}>
            <a href="https://t.me/thereisnogoduphere">
              <TelegramLogo weight="fill" />
              <span>Telegram</span>
            </a>
          </li>
        </ul>
        <span>Dmitry Egorov © 2022</span>
      </footer>
    </Container>
  );
};

export default Footer;
