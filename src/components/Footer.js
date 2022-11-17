import styles from './Footer.module.scss';

function Footer() {
    return (
        <footer className={`${styles.footer} d-flex flex-row align-items justify-content p-20`}>
            <p>Copyright © 2022 Cookchef Dyma Inc.</p>
        </footer>
    )
}

export default Footer;