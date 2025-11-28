import React from 'react';

function Layout({ children }) {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-header-inner">
          <h1 className="app-title">클라우드 게시판</h1>
          <span className="app-subtitle">Cloud Native Board Project</span>
        </div>
      </header>
      <main className="app-main">
        <div className="app-main-inner">{children}</div>
      </main>
      <footer className="app-footer">
        <span>© 2024 Cloud Native Project</span>
      </footer>
    </div>
  );
}

export default Layout;