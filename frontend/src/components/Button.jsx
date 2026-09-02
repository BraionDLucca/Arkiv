import "./Button.css"

// JSDoc
/** 
 * @param {{ 
 * variant?: "primary" | "secondary" | "danger" | "tertiary", 
 * size?: "medium" | "large" | "small",
 * className?: string, 
 * }} props
 */

// Pode ser um botão com apenas texto, apenas ícone ou com ícone e texto.
function Button({
    variant = "primary", // primary, secondary, tertiary, danger.
    size = "medium",     // medium, large.
    children,            // Conteúdo do botão (entre tags)
    className = "",       // Classes adicionais passadas como prop (caso necessário) 
    ...props }) {        // Atributos HTML serão utilizados a partir de props

    const variants = {
        "primary": "button-primary",
        "secondary": "button-secondary",
        "tertiary": "button-tertiary",
        "danger": "button-danger"
    }

    const sizes = {
        "medium": "button-size-medium",
        "large": "button-size-large",
        "small": "button-size-small"
    }

    return <button className={`${className} ${variants[variant]} ${sizes[size]}`} {...props}
    >
        {children}
    </button>
}

export default Button