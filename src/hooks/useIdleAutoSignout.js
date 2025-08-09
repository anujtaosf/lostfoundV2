import { useCallback, useEffect, useRef } from "react";

/** Auto sign out after `delay` ms of no user activity */
export default function useIdleAutoSignout({ enabled, delay = 5000, onSignOut }) {
  const timerRef = useRef(null);

  const stop = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const arm = useCallback(() => {
    stop();
    timerRef.current = setTimeout(() => {
      onSignOut?.();
    }, delay);
  }, [delay, onSignOut, stop]);

  useEffect(() => {
    if (!enabled) {
      stop();
      return;
    }

    const reset = () => arm();
    const events = ["pointermove","mousedown","keydown","touchstart","click","wheel","pointerdown"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));

    arm(); // start immediately

    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      stop();
    };
  }, [enabled, arm, stop]);
}
