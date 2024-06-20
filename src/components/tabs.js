import React from 'react';


const TabContent = ({ children, isActive }) => {
    return (
        <div className={`tab-content ${isActive ? 'active' : ''}`}>
            {children}
        </div>
    );
};


const Tab = ({ label, onClick, isActive }) => {
    return (
        <button
            className={`tab ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};


const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = React.useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="tabs">
            <div className="tab-list justify-content-center align-items-center">
                {React.Children.map(children, (child, index) => (
                    <Tab
                        label={child.props.label}
                        isActive={index === activeTab}
                        onClick={() => handleTabClick(index)}
                    />
                ))}
            </div>
            <div className="tab-content-container">
                {React.Children.map(children, (child, index) => (
                    <TabContent isActive={index === activeTab}>
                        {child.props.children}
                    </TabContent>
                ))}
            </div>
        </div>
    );
};



export default Tabs;
