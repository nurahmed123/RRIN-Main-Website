export const JWTDecode = (token) => {
    if (!user.value) { return; }
    const base64Url = user.value.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}