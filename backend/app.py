
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pytesseract
from PIL import Image
import io
import re

app = FastAPI()

# Allow your frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],



@app.get("/")
def home():
    return {"message": "Packsure backend is running"}


@app.post("/scan")
async def scan_image(file: UploadFile = File(...)):

    # Read uploaded image
    contents = await file.read()

    # Convert to image
    image = Image.open(io.BytesIO(contents))

    # OCR
    text = pytesseract.image_to_string(image)

    # Find MRP
    mrp_match = re.search(
        r"(?:MRP|Rs\.?|₹)\s*[:.]?\s*(\d+(?:\.\d{1,2})?)",
        text,
        re.IGNORECASE
    )

    # Find quantity
    quantity_match = re.search(
        r"(\d+(?:\.\d+)?)\s*(g|kg|ml|l|mg)",
        text,
        re.IGNORECASE
    )

    # Find phone number
    phone_match = re.search(
        r"(?:\+91[-\s]?)?[6-9]\d{9}",
        text
    )

    # Find dates
    dates = re.findall(
        r"\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b",
        text
    )

    return {
        "filename": file.filename,
        "mrp": mrp_match.group(1) if mrp_match else None,
        "net_quantity": quantity_match.group(0) if quantity_match else None,
        "consumer_care": phone_match.group(0) if phone_match else None,
        "dates": dates,
        "raw_text": text
    }