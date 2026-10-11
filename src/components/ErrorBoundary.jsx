import React from "react";
import { AlertCircle, RefreshCw, Home, ChevronDown, ChevronUp } from "lucide-react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an unhandled error:", error, errorInfo);
    this.setState({ errorInfo });

    // Handle Vite/Webpack dynamic chunk loading failures
    const isChunkFailed =
      error?.message?.includes("Failed to fetch dynamically imported module") ||
      error?.name === "ChunkLoadError";

    if (isChunkFailed) {
      const reloaded = sessionStorage.getItem("chunk_reload_attempted");
      if (!reloaded) {
        sessionStorage.setItem("chunk_reload_attempted", "true");
        window.location.reload();
      }
    }
  }

  handleReload = () => {
    sessionStorage.removeItem("chunk_reload_attempted");
    window.location.reload();
  };

  handleGoHome = () => {
    sessionStorage.removeItem("chunk_reload_attempted");
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xl text-center">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 mx-auto flex items-center justify-center text-amber-600 mb-5 shadow-xs">
              <AlertCircle size={32} />
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
              Something went wrong
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
              We encountered an unexpected technical issue. Don't worry, your cart and session data are safe.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gray-950 text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <RefreshCw size={15} />
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gray-100 hover:bg-gray-200/80 text-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Home size={15} />
                <span>Return to Home</span>
              </button>
            </div>

            {/* Technical details accordion */}
            {this.state.error && (
              <div className="mt-5 pt-4 border-t border-gray-100 text-left">
                <button
                  type="button"
                  onClick={() =>
                    this.setState((prev) => ({ showDetails: !prev.showDetails }))
                  }
                  className="w-full flex items-center justify-between text-[11px] font-semibold text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span>Technical details</span>
                  {this.state.showDetails ? (
                    <ChevronUp size={12} />
                  ) : (
                    <ChevronDown size={12} />
                  )}
                </button>

                {this.state.showDetails && (
                  <pre className="mt-2 p-2.5 bg-gray-50 rounded-xl text-[10px] text-red-600 overflow-x-auto whitespace-pre-wrap font-mono border border-gray-200">
                    {this.state.error?.toString()}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
