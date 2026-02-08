interface TabButtonProps {
    btnTab: string;
    label: string;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ btnTab, label, activeTab, setActiveTab }) => {
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        sessionStorage.setItem('activeTab', tab);
    };

    return (
        <li>
            <button
                onClick={() => handleTabChange(btnTab)}
                className={`px-1 py-1 rounded-lg w-28 font-semibold text-md ${
                    activeTab === btnTab
                        ? 'bg-graydark text-white dark:bg-blue-600'
                        : 'bg-gray-50 text-secondaryBG-dark dark:bg-gray-800 dark:text-gray-400'
                }`}
            >
                {label}
            </button>
        </li>
    );
};

export default TabButton;
