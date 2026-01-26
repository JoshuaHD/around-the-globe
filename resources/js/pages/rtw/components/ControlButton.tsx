import { twMerge } from 'tailwind-merge';

export type ControlButton = {
    onClick: () => Promise<void>|void;
    icon?: React.ReactNode;
    className?: string;
};
export function ControlButton(props: ControlButton) {
    return (
        <button
            className={twMerge('m-2 mr-1 border-2 p-2 text-white hover:border-amber-400 hover:text-amber-400 rounded-xl bg-black bg-opacity-50 ', props.className)}
            onClick={props.onClick}
        >
            {props.icon}
        </button>
    );
}
