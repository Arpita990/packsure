const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const scanButton = document.getElementById("scanButton");
const result = document.getElementById("result");

// Show uploaded image
imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    if (file) {
        const imageURL = URL.createObjectURL(file);
        preview.src = imageURL;

        result.textContent = "Image uploaded. Ready to scan.";
    }
});


// Scan button
scanButton.addEventListener("click", function () {

    const file = imageInput.files[0];

    if (!file) {
        result.textContent = "Please upload a product image first.";
        return;
    }

    // Simulated scanning
    result.textContent = "🔍 Scanning product image...";

    setTimeout(function () {
        result.textContent = "🤖 Extracting information using OCR...";
    }, 1500);

    setTimeout(function () {
        result.textContent = "⚖️ Checking Legal Metrology requirements...";
    }, 3000);

    setTimeout(function () {

        result.textContent = `
PRODUCT ANALYSIS
==============================

MRP
₹50                         ✓ Detected

Net Quantity
100 g                       ✓ Detected

Manufacturer
XYZ Foods Pvt. Ltd.         ✓ Detected

Consumer Care
1800-123-4567               ✓ Detected


COMPLIANCE STATUS
==============================

⚠ POTENTIAL NON-COMPLIANCE

Issue:
Product requires further verification.

Evidence:
Uploaded product image.
`;

    }, 4500);

});
