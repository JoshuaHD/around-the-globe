export function ControlButton(props: { onClick: () => Promise<void>|void, icon?: React.ReactNode }) {
    return (
        <button
            className={'m-2 mr-1 border-2 p-2 text-white hover:border-amber-400 hover:text-amber-400 rounded-xl bg-black bg-opacity-50'}
            onClick={props.onClick}
        >
            {props.icon}
        </button>
    );
}
