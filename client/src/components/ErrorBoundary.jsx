import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('Page error:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg px-6 text-center">
          <div className="card p-8 max-w-md">
            <h1 className="text-2xl font-display font-bold text-text">Something went wrong</h1>
            <p className="text-muted mt-3">Please refresh the page. If it continues, sign out and sign in again.</p>
            <button onClick={() => { localStorage.removeItem('userInfo'); window.location.href = '/'; }} className="btn-primary mt-6">Return Home</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
