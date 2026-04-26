import { FiltersPanel, type FiltersPanelProps } from "./FiltersPanel";

export type FiltersDrawerProps = {
    open: boolean;
    onClose: () =>  void;
} & FiltersPanelProps

export function FiltersDrawer({ open, onClose, ...panelProps }:  FiltersDrawerProps) {
    if (!open) return null;

    return (
        <div className="desktop:hidden max-w-[359px]">
            <div className="fixed inset-0 bg-surface-inverted opacity-90" onClick={onClose} />
            <div className="fixed inset-y-0 left-0 w-[min(320px,100vw)] p-[24px] bg-surface shadow-lg">
                <aside className="h-full overflow-auto">
                    <div className="flex justify-between items-center pb-[24px] border-b border-[#d4d4d4]">
                        <h1 className="text-xl text-ink-primary">Filter</h1>
                        <button type="button" className="pointer-cursor" onClick={onClose}>
                            <img src="./close.svg" width={11} height={11} />
                        </button>
                    </div>
                    <FiltersPanel {...panelProps} />
                </aside>
            </div>
        </div>
    )
}