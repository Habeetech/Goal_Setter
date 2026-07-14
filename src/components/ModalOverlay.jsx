import { motion } from "motion/react";
import { X } from "lucide-react"
import { useEffect, useRef } from "react";

export default function ModalOverlay({ children, onClose }) {
    const overlayChildRef = useRef(null);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        if (!overlayChildRef.current) return;

       const selectors = "a[href]:not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']), input:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), select:not([disabled]):not([tabindex='-1']), [tabindex]:not([tabindex='-1'])";
        const initialFocusable = overlayChildRef.current.querySelectorAll(selectors);
        if (initialFocusable[0]) {
            initialFocusable[0].focus();
        }

        document.addEventListener("keydown", handleKeydown)
        function handleKeydown(e) {
            if(e.key !== "Tab") return;
           const focusable = Array.from(overlayChildRef.current.querySelectorAll(selectors));
            if (focusable.length === 0) return;

            const currentIndex = focusable.indexOf(document.activeElement);
            const lastIndex = focusable.length - 1;

            e.preventDefault();
            if (e.shiftKey) {
                if (currentIndex === 0 || currentIndex === -1) {
                    focusable[lastIndex].focus()
                } else {
                    focusable[currentIndex - 1].focus();
                }
            }
            else {
                if (currentIndex === lastIndex || currentIndex === -1) {
                    focusable[0].focus()
                } else {
                    focusable[currentIndex + 1].focus();
                }
            }
        }
        return () => {
            document.body.style.overflow = ""
            document.removeEventListener("keydown", handleKeydown);
        }
    }, [])

    return (<motion.div className="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
            e.stopPropagation();
            if (e.target !== e.currentTarget) return;
            onClose();
        }}
    >
        <motion.div className="overlay-child"
            ref={overlayChildRef}
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            exit={{ scale: 1 }}
        >
            <button className="close"
                onClick={onClose}
            ><X /></button>
            {children}
        </motion.div>
    </motion.div>)
}