document.getElementById("currentyear").textContent = new Date().getFullYear();

const lastModDate = new Date(document.lastModified);

const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
};

const formatteDate = lastModDate.toLocaleDateString("en-US", options);

document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;