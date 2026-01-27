import {ReactNode, useState} from 'react';
import {XIcon} from "lucide-react";

type Modal = {
    setOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
    children: ReactNode | ReactNode[];
}
type ModalTrigger = {
    children: ReactNode | ReactNode[]
    trigger: ReactNode
}
export default function Modal({setOpen, children,}: Modal) {
    function close() {
        setOpen(false);
    }

    return (
        <div
            className="fixed inset-0 grid place-items-center bg-black/50"
            onClick={(e) => {
                close()
                e.stopPropagation();
            }}
        >
            <div
                className="rounded-lg bg-white p-6 dark:bg-gray-900 place-items-start relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button className={"absolute right-2 top-2 hover:text-amber-400"} onClick={close}><XIcon /></button>
                {children}
            </div>
        </div>
    );
}

export const ModalTrigger = ({children, trigger}: ModalTrigger) => {
    const [open, setOpen] = useState(false)
    return <div className={"outline-red-400 outline"} onClick={() => setOpen(true)}>
        {
            open && <Modal setOpen={setOpen}>
                {children}
            </Modal>
        }
        {trigger ?? "Open Modal"}
    </div>
}
