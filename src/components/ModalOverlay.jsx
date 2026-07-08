import { motion } from "motion/react";
import { X } from "lucide-react"
export default function ModalOverlay ({children, onClose}) {
    return(<motion.div className="overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0}}
    >
        <motion.div className="overlay-child"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        exit={{ scale: 1}}
        >
            <button className="close"
            onClick={onClose}
            ><X/></button>
        {children}
        </motion.div>
    </motion.div>)
}