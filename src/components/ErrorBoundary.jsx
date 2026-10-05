import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    // Clear potentially corrupted local states
    try {
      window.location.reload();
    } catch {
      window.location.href = '/';
    }
  };

  handleReset = () => {
    try {
      localStorage.removeItem('market_cart');
      localStorage.removeItem('market_wishlist');
      window.location.href = '/';
    } catch {
      window.location.href = '/';
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-3xl font-black">
              ⚠️
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black">Kutilmagan xatolik yuz berdi</h2>
              <p className="text-xs text-slate-400">
                Sahifani yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring yoki keshni tozalab bosh sahifaga o'ting.
              </p>
              {this.state.error && (
                <pre id="error-stack-trace" className="text-[11px] text-rose-300 text-left bg-black/50 p-3 rounded-lg overflow-auto max-h-48 whitespace-pre-wrap">
                  {this.state.error.toString()}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReload}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm transition shadow-lg shadow-indigo-600/30"
              >
                🔄 Sahifani yangilash (Reload)
              </button>
              <button
                onClick={this.handleReset}
                className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs transition"
              >
                🏠 Bosh sahifaga qaytish (Keshni tozalash)
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
