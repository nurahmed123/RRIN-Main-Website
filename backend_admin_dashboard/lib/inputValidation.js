export function validateInput(data) {
    const { name, code, os, system, release, count, api, language } = data;
    return (
        typeof name === "string" && name.trim().length > 0 &&  // Ensure name is non-empty
        typeof code === "string" && code.trim().length > 0 &&  // Ensure code is non-empty
        typeof system === "string" && system.trim().length > 0 &&  // Ensure system is non-empty
        typeof os === "string" && os.trim().length > 0 &&  // Ensure OS is non-empty
        typeof release === "string" && release.trim().length > 0 &&  // Ensure release is non-empty
        typeof api === "string" && api.trim().length > 0 &&  // Ensure release is non-empty
        typeof language === "string" && release.trim().length > 0 &&  // Ensure release is non-empty
        typeof count === "number" && count >= 0  // Ensure count is a non-negative number
    );
}


export function sanitizeInput(data) {
    const sanitized = {};
    for (const key in data) {
        if (typeof data[key] === "string") {
            // Make sure the input is always a string
            sanitized[key] = data[key].trim().replace(/[$.]/g, "");
        } else {
            sanitized[key] = data[key];  // If it's not a string, leave it as is
        }
    }
    return sanitized;
}