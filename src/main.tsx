import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Critical Render Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleClearAndReload = () => {
    localStorage.clear();
    window.location.reload();
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0a0a16',
          backgroundImage: 'radial-gradient(circle at center, #1b1235 0%, #030308 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          boxSizing: 'border-box'
        }}>
          <div style={{
            maxWidth: '650px',
            width: '100%',
            backgroundColor: 'rgba(16, 12, 30, 0.65)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 0 40px rgba(239, 68, 68, 0.15), inset 0 0 20px rgba(239, 68, 68, 0.05)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#ef4444',
              marginBottom: '1.5rem',
              fontSize: '2rem'
            }}>
              ⚠️
            </div>
            
            <h1 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
              color: '#ffffff',
              textTransform: 'uppercase',
              textShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
              marginTop: 0
            }}>
              AURA - Recovery Console
            </h1>
            
            <p style={{
              color: '#94a3b8',
              fontSize: '1rem',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Une erreur d'exécution critique a été détectée. Cela est généralement causé par des données locales obsolètes ou corrompues stockées dans votre navigateur.
            </p>

            <div style={{
              textAlign: 'left',
              backgroundColor: 'rgba(5, 5, 10, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '2.5rem',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              color: '#ef4444',
              overflowX: 'auto',
              maxHeight: '150px'
            }}>
              <strong>Erreur :</strong> {this.state.error?.message || String(this.state.error)}
              {this.state.error?.stack && (
                <pre style={{ marginTop: '0.5rem', color: '#64748b', fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>
                  {this.state.error.stack.split('\n').slice(0, 3).join('\n')}
                </pre>
              )}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'center'
            }}>
              <button 
                onClick={this.handleClearAndReload}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
                  fontSize: '0.95rem'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#dc2626'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ef4444'; }}
              >
                Réinitialiser les données locales & Recharger
              </button>
              
              <button 
                onClick={this.handleReload}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: 'transparent',
                  color: '#e2e8f0',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '0.95rem'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                Tenter un simple rechargement
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
