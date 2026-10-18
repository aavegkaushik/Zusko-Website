import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Amazon / YouTube style top loading bar
 * Triggers on route change and smoothly completes as the page mounts.
 */
export default function TopLoadingBar() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start bar on route change
    setVisible(true);
    setProgress(30);

    const t1 = setTimeout(() => setProgress(75), 100);
    const t2 = setTimeout(() => {
      setProgress(100);
      const t3 = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 250);
      return () => clearTimeout(t3);
    }, 280);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname, location.search]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[99999] h-[2.5px] pointer-events-none transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="h-full bg-gradient-to-r from-amber-400 via-[#FFD700] to-yellow-300 shadow-[0_0_10px_rgba(255,215,0,0.8)] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}
