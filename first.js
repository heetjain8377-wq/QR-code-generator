
let input = document.querySelector("#urlinput");
let generate = document.querySelector("#generatebtn");
let qrimage = document.querySelector("#qrimage");
let loader = document.querySelector("#loader");
let welcome = document.querySelector("#welcome");
let download = document.querySelector("#downloadbtn");

let currentQRData = "";

loader.style.display = "none";
qrimage.style.display = "none";
download.hidden = true;

generate.addEventListener("click", () => {
    let text = input.value.trim();

    if (text === "") {
        alert("Please enter a URL");
        return;
    }

    currentQRData = text;

    loader.textContent = "Loading...";
    loader.style.display = "block";
    welcome.style.display = "none";
    qrimage.style.display = "none";
    download.hidden = true;

    qrimage.onload = () => {
        loader.style.display = "none";
        qrimage.style.display = "block";
        download.hidden = false;
    };

    qrimage.onerror = () => {
        loader.textContent = "Could not generate QR code. Please try again.";
        loader.style.display = "block";
        download.hidden = true;
    };

    const encodedText = encodeURIComponent(text);

    qrimage.src =
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedText}&margin=10`;

    input.value = "";
});

download.addEventListener("click", () => {
    if (!currentQRData) {
        alert("Please generate a QR code first.");
        return;
    }

    const encodedText = encodeURIComponent(currentQRData);

    const downloadURL =
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedText}&margin=10&download=1`;

    window.location.href = downloadURL;
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        generate.click();
    }
});
