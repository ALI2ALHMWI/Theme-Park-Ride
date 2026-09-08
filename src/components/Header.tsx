function Header() {
  return (
    <header className="site-header">
      <div className="brand-block">
        <p className="brand-kicker">RIDELINE / LIVE QUEUE</p>
        <a className="brand-name" href="/">
          Skyline Comet
        </a>
      </div>

      <div className="header-status" aria-label="Ride status">
        <span className="status-indicator" aria-hidden="true" />
        <span>Live status board</span>
      </div>
    </header>
  );
}

export default Header;
