import "./Button.css"

// JSDoc
/** 
 * @param {{ 
 * variant?: "primary" | "secondary" | "danger", 
 * size?: "medium" | "large", 
 * buttonText?: string, 
 * icon?: string, 
 * alt?: string 
 * }} props
 */

// Pode ser um botão com apenas texto, apenas ícone ou com ícone e texto.
// Basta informar apenas as props desejadas.
function Button({
    variant = "primary", // primary, secondary, danger.
    size = "medium",     // medium, large.
    buttonText = "",     // Não infomar = botão sem texto.
    icon = "",           // Caminho do arquivo. Não infomar = botão sem ícone.
    alt = "" }) {        // Descrição alternativa à imagem do ícone.

    let variantClassName = ""

    switch (variant) {
        case ("primary"):
            variantClassName = "button-primary"
            break
        case ("secondary"):
            variantClassName = "button-secondary"
            break
        case ("danger"):
            variantClassName = "button-danger"
            break
    }

    switch (size) {
        case ("medium"):
            variantClassName += " size-medium"
            break
        case ("large"):
            variantClassName += " size-large"
            break
    }

    return <button className={variantClassName}>
        {icon && <img src={icon} alt={alt}></img>}{buttonText}
    </button>

}

export default Button