import { motion } from "motion/react";
import { X } from "lucide-react"
import { useEffect, useRef } from "react";
export default function ModalOverlay({ children, onClose }) {
    const overlayChildRef = useRef(null);
    useEffect(() => {
        document.body.style.overflow = "hidden";
        if (!overlayChildRef.current) return;

        const selectors = "a[href], button, input, textarea, select, details, [tabindex]:not([tabindex='-1'])"
        const focusable = Array.from(overlayChildRef.current.querySelectorAll(selectors))
        

        document.addEventListener("keydown", handleKeydown)
        if (focusable[0]) {
            focusable[0].focus();
        }
        function handleKeydown(e) {
            e.preventDefault();
            if (focusable.length <= 0) return;

            const currentIndex = focusable.indexOf(document.activeElement)
            const lastIndex = focusable.length - 1;
            if (e.shiftKey === true && e.key === "Tab") {
                if (currentIndex === 0) {
                    focusable[lastIndex].focus()
                } else {
                    focusable[currentIndex - 1].focus();
                }
            }
            else if (e.key === "Tab" && e.shiftKey === false) {
                if (currentIndex === lastIndex) {
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