from PIL import Image, ImageDraw, ImageFont
import os

assets = [
    ("movement", "The Movement"),
    ("community", "Community"),
    ("how-it-works", "How It Works"),
    ("news", "News"),
    ("why-art", "Why Art")
]

os.makedirs("public/assets", exist_ok=True)

for name, text in assets:
    img = Image.new('RGB', (800, 600), color = (30, 30, 30))
    d = ImageDraw.Draw(img)
    
    # Add noise or simple pattern
    for i in range(0, 800, 20):
        d.line([(i, 0), (i, 600)], fill=(40, 40, 40), width=1)
    
    # Add text (try to load a font, fallback to default)
    try:
        # Try to find a system font
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 60)
    except:
        font = ImageFont.load_default()
        
    # Center text
    # Get text bbox
    left, top, right, bottom = d.textbbox((0, 0), text, font=font)
    w = right - left
    h = bottom - top
    
    d.text(((800-w)/2, (600-h)/2), text, font=font, fill=(200, 200, 200))
    
    img.save(f"public/assets/{name}.png")
    print(f"Generated {name}.png")
