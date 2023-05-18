export const inputTypes = {
    default: "text",
    password: "password",
    email: "email",
    dropDown: "dropDown"
}

export const messageTypes = {
    error: "error",
    warning: "warn",
    success: "success",
    info: "info"
}

export const logout = () => {
    localStorage.removeItem('bearer_token');
}