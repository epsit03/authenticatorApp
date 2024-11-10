# app.py
from flask import Flask, render_template, request, redirect, url_for
import pyotp
import qrcode
import qrcode.image.pil

app = Flask(__name__)

# Generate a new secret for each user
SECRET = pyotp.random_base32()

@app.route('/')
def index():
    # Generate TOTP URI for Google Authenticator
    totp_uri = pyotp.totp.TOTP(SECRET).provisioning_uri("user@example.com", issuer_name="MyApp")
    
    # Generate QR Code for URI
    qr = qrcode.make(totp_uri, image_factory=qrcode.image.pil.PilImage)
    qr.save("static/qrcode.png")
    
    return render_template('index.html', secret=SECRET)

@app.route('/verify', methods=['POST'])
def verify():
    token = request.form['token']
    totp = pyotp.TOTP(SECRET)

    # Check if the provided token is valid
    if totp.verify(token):
        return "Token is valid!"
    else:
        return "Invalid token. Please try again."

if __name__ == '__main__':
    app.run(debug=True)
