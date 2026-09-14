import { useState } from "react"
import "./Profile.css"
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("salvos");
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("Usuário");

  const [description, setDescription] = useState(
  "Administrador de Banco de Dados"
  );

  const [location, setLocation] = useState(    
  "Porto Velho - RO"
  );

  const [profileImage, setProfileImage] = useState("/perfilImg.svg");
  const [coverImage, setCoverImage] = useState("/paisagem.jpg");

  return (
    <div className="profile-container">

      {/* Cover */}
      <div
        className="cover"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        {isEditing && (
          <>
            <input
              id="cover-image-input"
              type="file"
              accept=".png,.jpg,.jpeg"
              hidden
              onChange={(event) => {
                const file = event.target.files[0];

                if (file) {
                  setCoverImage(URL.createObjectURL(file));
                }
              }}
            />

            <button
              type="button"
              className="change-cover-image"
              onClick={() =>
                document.getElementById("cover-image-input").click()
              }
            >
              Trocar capa
            </button>
          </>
        )}
      </div>

      {/* Perfil */}
      <section className="profile-wrapper">

        <div className="profile-section">

          <div className="profile-img-and-info">
            <div className="profile-image-container">
              <img
                src={profileImage}
                className="profile-img"
                alt="Perfil"
              />

              {isEditing && (
                <>
                  <input
                    id="profile-image-input"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    hidden
                    onChange={(event) => {
                      const file = event.target.files[0];

                      if (file) {
                        setProfileImage(URL.createObjectURL(file));
                      }
                    }}
                  />

                  <button
                    type="button"
                    className="change-profile-image"
                    onClick={() =>
                      document.getElementById("profile-image-input").click()
                    }
                  >
                    Alterar foto
                  </button>
                </>
              )}
            </div>

            <div className="profile-info">

              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <h2 className="profile-name">{name}</h2>
              )}
              <br />

              <h2 className="profile-date">Entrou em 21/03/2025</h2>

            </div>
          </div>


          <Button 
            type="button"
            variant="secondary"
            size="medium"
            classname="profile-edit-btn"
            onClick={() => setIsEditing(!isEditing)}       
          >
            <img
              src="/editarIcone.svg"
              alt=""
              classname="edit-icon"
            />

            {isEditing? "Salvar" : "Editar"}
          </Button>

        </div>

          {isEditing ? (
                <div className="profile-edit-fields">

                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />

                </div>
              ) : (
                <p className="profile-description">
                  {description}
                  <br />
                  {location}
                </p>
              )}

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

      <section className="tabs-content">

        {activeTab === "salvos" && (
          <div className="tab-content">
            <div className="empty-plans">
              <p className="message-empty-page">
                Você ainda não salvou nenhum plano...
              </p>
            </div>
          </div>
        )}

        {activeTab === "andamento" && (
          <div className="tab-content">
            <div className="empty-plans">
              <p className="message-empty-page">
                Você não possui planos em andamento...
              </p>
            </div>
          </div>
        )}

        {activeTab === "meusPlanos" && (
          <div className="tab-content">
            <div className="empty-plans">

              <p className="message-empty-page">
                Você ainda não criou nenhum plano...
              </p>

              <Button
                type="button"
                variant="primary"
                size="medium"
                onClick={() => navigate("/criar-plano")}
              >
                Criar Plano
              </Button>

            </div>
          </div>
        )}

      </section>
    </div>
  );
}