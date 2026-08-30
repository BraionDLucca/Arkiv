import "./Button.css"

// JSDoc
/** 
 * @param {{ 
 * variant?: "primary" | "secondary" | "danger", 
 * size?: "medium" | "large", 
 * }} props
 */

// Pode ser um botão com apenas texto, apenas ícone ou com ícone e texto.
function Button({
    variant = "primary", // primary, secondary, danger.
    size = "medium",     // medium, large.
    children,            // Conteúdo do botão (entre tags)
    ...props }) {        // Atributos HTML serão utilizados a partir de props

    const variants = {
        "primary": "button-primary",
        "secondary": "button-secondary",
        "danger": "button-danger"
    }

    const sizes = {
        "medium": "size-medium",
        "large": "size-large"
    }

    return <button
        className={`${variants[variant]} ${sizes[size]}`}
        {...props}
    >
        {children}
    </button>
}

export default Button