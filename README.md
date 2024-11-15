# TOTP Based Authenticator
The primary idea was to implement a Time-Based One-Time Password (TOTP) generator based on the RFC 6238 standard. So, here's a Python-based implementation of a Time-based One-Time Password (TOTP) authenticator similar to Google Authenticator. This app generates QR codes that can be scanned into authenticator apps like Google Authenticator to verify users via 6-digit codes.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Flow of Code](#flow-of-code)
- [Contributing](#contributing)

---

## Project Overview

This project demonstrates how to generate TOTP (Time-based One-Time Password) codes and display them in the form of a QR code, allowing users to scan it with authenticator apps (e.g., Google Authenticator). It also includes a basic token verification endpoint.

## Features

- Generates a QR code that users can scan with an authenticator app.
- Verifies a 6-digit TOTP token generated in the authenticator app.
- Built using Python, Flask, and libraries like `pyotp` and `qrcode`.

---

## Prerequisites

Make sure you have the following installed:

- **Python 3.7+**
- **pip** (Python package manager)

---

## Installation
<details><summary>Click to see the steps of installation</summary>
  
### 1. Clone the Repository

```bash
git clone https://github.com/your-username/google-authenticator-clone.git
cd google-authenticator-clone
```

### 2. Create a Virtual Environment

To keep dependencies isolated, create a virtual environment.
```
python3 -m venv venv
```

### 3. Activate the Virtual Environment

<b>On Linux/Mac:</b>
```
source venv/bin/activate
```
<b>On Windows:</b>
```
 .\venv\Scripts\activate
```

### 4. Install Dependencies

Install the required Python libraries:
```
pip install pyotp qrcode[pil] flask
```
---
</details>

## Usage
<details><summary>Running the App</summary>

After setting up the environment and installing dependencies, you can run the app.
```
python app.py
```
Open the App in Your Browser

Visit http://127.0.0.1:5000 in your browser. This page will display:

    A QR code that can be scanned with Google Authenticator.
    An input field where you can enter the TOTP token generated by the authenticator app.

Verify the Token

    Scan the QR code in Google Authenticator.
    Enter the 6-digit token displayed in the app into the input field on the page.
    Submit the form to verify if the token is correct.
</details>

<strong>Project Structure</strong>
<details> <summary><strong>View Project Structure</strong></summary>

  ```
google-authenticator-clone/
├── venv/                   # Virtual environment (not included in Git)
├── app.py                  # Main application code
├── static/
│   └── qrcode.png          # QR code generated for each TOTP session
├── templates/
│   └── index.html          # HTML template for rendering the page
├── README.md               # Project documentation
└── requirements.txt        # List of dependencies
```
</details>

<strong>Flow of Code</strong>
<details> <summary><strong>View Flow of Code</strong></summary>
  
```
    Generate Secret Key: A unique TOTP secret key is generated using pyotp.random_base32() in app.py. This key is used for creating the TOTP code.

    Generate QR Code:
        The TOTP URI is generated with pyotp to make it compatible with Google Authenticator.
        A QR code is created from this URI using qrcode.
        The QR code is saved in the static folder as qrcode.png.

    Render Template:
        The index.html template displays the QR code and an input field for the TOTP token.

    Verify Token:
        When the user submits the token, the app verifies it against the TOTP instance.
        If the token is correct, a success message is displayed. Otherwise, an error message appears.
```
</details>

<strong>Code Diagram</strong>
<details> <summary><strong>View Code Diagram</strong></summary>
  
```
+--------------------+
|   app.py           |
|--------------------|
|   SECRET Key       |
|   Generate QR      |
|   Render Template  |
|   Verify Token     |
+--------------------+
        |
        v
+--------------------+
|   Templates        |
|--------------------|
|   index.html       |
|   Displays QR Code |
|   Token Input      |
+--------------------+
```
</details>

#### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes, additions, or improvements.
License

This project is licensed under the MIT License. See the LICENSE file for details.
Additional Notes

If you encounter any issues, please refer to the following:

   <code><a href="https://peps.python.org/pep-0668/"> PEP 668 </a> - Python environment management</code>

