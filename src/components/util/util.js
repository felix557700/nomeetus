
function modulo(value, modulus) {
    return (value % modulus + modulus) % modulus
}

export { modulo }