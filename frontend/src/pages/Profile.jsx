import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./Profile.css"

export default function Profile() {
  const [activeTab, setActiveTab] = useState("salvos");
  
  const navigate = useNavigate();


  return (
    <div className="profile-container">

      {/* Cover */}
      <div className="cover"></div>

      {/* Perfil */}
      <section className="profile-wrapper">

        <div className="profile-section">

          <div className="profile-img-and-info">
            <img src="/perfilImg.svg" className="profile-img" alt="Perfil"/>

            <div className="profile-info">

              <h2 className="profile-name">Kleber Machado</h2> <br/>
              <h2 className="profile-date">Entrou em 21/03/2025</h2>

            </div>
          </div>

          <button className="edit-btn"><img src="./public/editarIcone.svg"></img>Editar</button>

        </div>
        
        <p className="profile-description">Administrador de Banco de Dados<br />Porto Velho - RO</p>

      </section>

      {/* Abas */}
      <nav className="tabs-nav">

        <button className={`tab-btn ${activeTab === "salvos" ? "active" : ""}`}
          onClick={() => setActiveTab("salvos")}>Salvos</button>

        <button className={`tab-btn ${activeTab === "andamento" ? "active" : ""}`}
          onClick={() => setActiveTab("andamento")}>Em andamento</button>
        
        <button className={`tab-btn ${activeTab === "meusPlanos" ? "active" : ""}`}
          onClick={() => setActiveTab("meusPlanos")}>Meus planos</button>

      </nav>

      {/* Conteúdo das Abas */}
      <section className="tabs-content">

        {activeTab === "salvos" && (
          <div className="tab-content">
            {/* Carregar planos salvos do usuário */}
            <p className="message-empty-page">Você ainda não salvou nenhum plano...</p>
          </div>
        )}

        {activeTab === "andamento" && (
          <div className="tab-content">
            {/* Carregar planos do usuário em andamento */}
            <p className="message-empty-page">Você não possui planos em andamento...</p>
          </div>
        )}

        {activeTab === "meusPlanos" && (
          <div className="tab-content">
            {/* Carregar planos criados pelo usuário */}
            <p className="message-empty-page">Você ainda não criou nenhum plano...</p>
          </div>
        )}
      </section>
    </div>
  );
}