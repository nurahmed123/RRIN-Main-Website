export function validateInput(data) {
    const { name, code, os, system, release, count, api, language } = data;

    // Validate all fields
    return (
        typeof name === "string" && name.trim().length > 0 &&  // Ensure name is non-empty
        typeof code === "string" && code.trim().length > 0 &&  // Ensure code is non-empty
        (typeof os === "string" ? os.trim().length > 0 : true) &&  // Ensure OS is non-empty or empty
        (typeof system === "string" ? system.trim().length > 0 : true) &&  // Ensure system is non-empty or empty
        (typeof release === "string" ? release.trim().length > 0 : true) &&  // Ensure release is non-empty or empty
        typeof api === "string" && api.trim().length > 0 &&  // Ensure API is non-empty
        typeof language === "string" && language.trim().length > 0 &&  // Ensure language is non-empty
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