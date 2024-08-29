function sanitizeHtml(text, opts) {
    if (typeof text == "string" || text instanceof String) {
        var $div = document.createElement("DIV");
        // @ts-ignore
        $div.innerHTML = text;
        text = ($div.textContent || "")
            .trim()
    } else if (typeof text === "object" && text.textContent) {
        text = (text.textContent || "")
            .trim()
    }
    return text
}

export default sanitizeHtml