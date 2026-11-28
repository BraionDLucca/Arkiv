import "./Tabs.css"

export default function Tabs({
    activeTab,    // Estado de qual aba está aberta (gerenciada pelo componente pai)
    setActiveTab, // Função para alterar esse estado (fornecida pelo componente pai)
    tabsNames     // Espera lista de nomes das abas (qualquer quantidade)
}) {

    return (
        <nav className="tabs-nav">
            <div className="tabs-container">
                {
                    tabsNames.map((name, key) => {
                        return <button
                            key={key}
                            className={`tab-btn ${activeTab === name ? "active" : ""}`}
                            onClick={() => setActiveTab(name)}>
                            {name}
                        </button>
                    })
                }
            </div>
        </nav>
    )
}