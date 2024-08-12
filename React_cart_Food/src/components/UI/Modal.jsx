import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

export default function Modal({open, children, className,onClose}) {
    const dialog = useRef() ;
    useEffect(()=>{
        const modal = dialog.current ; // recommended good pattern to make it like that in const
        if(open) {
            modal.showModal();
        }
        return ()=>{//called clean up function exctues when OPEN changes and the if condition didn't execute
            modal.close();
        }
    }, [open])

    return createPortal(
    <dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>
        {children}
    </dialog>,
    document.getElementById('modal'))
    }