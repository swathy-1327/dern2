document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reportForm");
    const message = document.getElementById("message");
    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");
    const reportImageInput = document.getElementById("reportImage");
    const imagePreview = document.getElementById("imagePreview");
    const imagePreviewContainer = document.getElementById("imagePreviewContainer");

    if (reportImageInput) {
        reportImageInput.addEventListener("change", () => {
            const file = reportImageInput.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreviewContainer.style.display = "block";
                };
                reader.readAsDataURL(file);
            } else {
                imagePreviewContainer.style.display = "none";
            }
        });
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            latitudeInput.value = position.coords.latitude;
            longitudeInput.value = position.coords.longitude;
        });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const payload = {
            type: document.getElementById("type").value,
            description: document.getElementById("description").value,
            latitude: parseFloat(document.getElementById("latitude").value),
            longitude: parseFloat(document.getElementById("longitude").value),
            severity: parseInt(document.getElementById("severity").value),
            numberPlate: document.getElementById("numberPlate").value,
            aiStatus: aiResult.status,
            aiConfidence: aiResult.confidence,
            aiSeverityEstimate: aiResult.severityLabel
        };
        const hasImage = reportImageInput && reportImageInput.files && reportImageInput.files.length > 0;

        const aiResult = runAiAccidentPrototype(
            payload.type,
            payload.severity,
            hasImage
        );

        const aiBox = document.getElementById("aiVerificationBox");
        const aiStatus = document.getElementById("aiStatus");
        const aiConfidence = document.getElementById("aiConfidence");
        const aiSeverity = document.getElementById("aiSeverity");

        if (aiBox && aiStatus && aiConfidence && aiSeverity) {
            aiStatus.textContent = aiResult.status;
            aiConfidence.textContent = aiResult.confidence;
            aiSeverity.textContent = aiResult.severityLabel;
            aiBox.style.display = "block";
        }

        try {
            const response = await fetch("/api/reports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                message.textContent = "Report submitted successfully.";
                form.reset();
            } else {
                message.textContent = "Failed to submit report.";
            }
        } catch (error) {
            console.error(error);
            message.textContent = "Something went wrong.";
        }
    });
});

function runAiAccidentPrototype(type, severity, hasImage) {
    let confidence = 30;

    if (type === "CRASH") confidence += 35;
    if (type === "ACCIDENT_PRONE") confidence += 15;
    if (type === "UNSAFE_AREA") confidence += 5;

    confidence += (severity || 1) * 6;

    if (hasImage) confidence += 15;

    if (confidence > 95) confidence = 95;

    let status = "Low Confidence";
    let severityLabel = "Low";

    if (confidence >= 75) {
        status = "Likely Accident";
    } else if (confidence >= 50) {
        status = "Needs Review";
    } else {
        status = "Unclear";
    }

    if (severity >= 4) {
        severityLabel = "High";
    } else if (severity >= 2) {
        severityLabel = "Medium";
    }

    return {
        status,
        confidence: `${confidence}%`,
        severityLabel
    };
}