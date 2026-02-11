# Installing the unofficial ASI:One Extension for Opera

## Method 1: Installation in Developer Mode

1. Open Opera and go to `opera://extensions/`
2. Enable developer mode by checking the box in the top right
3. Click on "Load unpacked extension"
4. Select the `opera-asi1-extension` folder we just created (or the folder that's contains the files).
5. The extension should now appear in your extensions list

## Method 2: Installation from ZIP File

1. Create a ZIP file containing all files from the `opera-asi1-extension` folder:
```bash
cd /home/arch/Desktop
zip -r asi1-opera-extension.zip opera-asi1-extension/
```

2. In Opera, go to `opera://extensions/`
3. Drag and drop the ZIP file onto the page, or click on "Load unpacked extension" and select the ZIP file

## Usage

Once installed, the extension is accessible via:
- The ASI:One icon in the extensions bar
- The Opera sidebar (if enabled)

## Initial Configuration

1. Click on the extension icon
2. Enter your ASI:One credentials (email and password)
3. The extension will connect automatically and save your credentials securely
4. You can now use the AI chat directly from the sidebar

## Future Updates

To update the extension:
1. Remove the current extension from `opera://extensions/`
2. Reinstall it by following the steps above with the new version

## Troubleshooting

If the extension doesn't work:
- Make sure JavaScript is enabled in Opera
- Ensure you have internet access
- Restart Opera after installation
- Verify that the URL `https://asi1.ai` is accessible from your browser
