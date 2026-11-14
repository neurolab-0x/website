import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('neurolab_cookie_consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('neurolab_cookie_consent', 'all');
        setIsVisible(false);
    };

    const handleAcceptNecessary = () => {
        localStorage.setItem('neurolab_cookie_consent', 'necessary');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
                    className="fixed bottom-6 left-1/2 z-[100] w-[calc(100%-32px)] max-w-3xl -translate-x-1/2"
                >
                    <div
                        className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/95 p-5 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8"
                    >
                        {/* Animated loading indicator */}
                        <div className="absolute top-0 left-0 h-0.5 w-full overflow-hidden opacity-30">
                            <div className="h-full w-1/3 bg-primary animate-[surgical-shimmer_3s_ease-in-out_infinite]" />
                        </div>

                        <div className="relative z-10 flex-1 flex flex-col pl-1 py-1">
                            <p className="text-sm text-foreground/90 leading-relaxed md:pr-4">
                                We use essential cookies to operate our clinical telemetry systems and analyze site performance. By clicking &ldquo;Accept All&rdquo;, you consent to our privacy and cookie policies.
                            </p>
                        </div>

                        <div className="relative z-10 flex w-full md:w-auto items-center justify-end gap-3 shrink-0">
                            <button
                                onClick={handleAcceptNecessary}
                                className="h-9 px-4 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Essential Only
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="h-9 rounded-full px-5 text-xs font-semibold bg-primary text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
                            >
                                Accept All
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
