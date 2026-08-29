
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const result = document.getElementById("result");
const scanButton = document.getElementById("scanButton");

// Show selected image
imageInput.addEventListener("change", function () {
    const file = imageInput.files[0];

    if (file) {
        const imageURL = URL.createObjectURL(file);
        preview.src = imageURL;
    }
});

// Scan button
scanButton.addEventListener("click", scanImage);

async function scanImage() {
    const file = imageInput.files[0];

    if (!file) {
        result.textContent = "Please select an image first.";
        return;
    }

    result.textContent = "Scanning...";

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("https://packsure-2.onrender.com/scan", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        result.textContent =
`PRODUCT ANALYSIS

MRP: ${data.mrp || "Not detected"}

Net Quantity: ${data.net_quantity || "Not detected"}

Consumer Care: ${data.consumer_care || "Not detected"}

Dates: ${data.dates?.join(", ") || "Not detected"}

RAW OCR TEXT:
${data.raw_text || "No text detected"}`;

    } catch (error) {
        console.error(error);
        result.textContent = "Could not connect to the FastAPI backend.";
    }
} 