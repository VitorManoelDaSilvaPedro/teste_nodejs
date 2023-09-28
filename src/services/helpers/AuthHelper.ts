export function gerarCodigo(): string {
    const min = 100_000;
    const max = 999_999;
    const codigo = Math.floor(Math.random() * (max - min + 1)) + min;
    return codigo.toString();
}