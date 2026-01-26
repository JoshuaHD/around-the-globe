import { ReactNode } from 'react';

export default function Modal({
    setOpen,
    children,
}: {
    setOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
    children: ReactNode|ReactNode[];
}) {
    return (
        <div
            className="fixed inset-0 grid place-items-center bg-black/50"
            onClick={() => setOpen(false)}
        >
            <div
                className="rounded-lg bg-white p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
