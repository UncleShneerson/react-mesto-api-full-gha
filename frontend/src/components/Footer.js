export default function Footer() {
  const thisYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copy">
        © {thisYear}{" "}
        <a
          href="https://github.com/UncleShneerson/"
          target="_blank"
          rel="noopener"
          className="footer__link hover-opacity"
        >
          Красношлыков Евгений
        </a>
      </p>
    </footer>
  );
}
