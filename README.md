# BSE Link Fixer Chrome Extension

A Chrome extension that automatically redirects broken BSE (Bombay Stock Exchange) corporate announcement links by switching between "AttachHis" and "AttachLive" when directly navigating to broken URLs.

## Problem

BSE's corporate announcement links have two variants:
- `AttachHis/` - Historical attachments
- `AttachLive/` - Live attachments

Sometimes a working link stops working and returns a 404 error. Switching between these two variants often resolves the issue.

**Example:**
- Not working: `https://www.bseindia.com/xml-data/corpfiling/AttachHis/0DF3C1F8-F43D-4D00-85E7-D4F9B9148F16-123617.pdf`
- Working: `https://www.bseindia.com/xml-data/corpfiling/AttachLive/0DF3C1F8-F43D-4D00-85E7-D4F9B9148F16-123617.pdf`

## Solution

This Chrome extension automatically:
1. Detects when you directly navigate to a BSE corporate announcement link
2. Tests if the current URL is accessible
3. If the current URL returns a 404, tries the alternative variant (AttachHis ↔ AttachLive)
4. Automatically redirects to the working URL if found
5. Shows a notification to inform you about the redirect

## Installation

### Method 1: Create Extension Package (Recommended for end-use)

1. Download the [extension zip file](https://github.com/cTxplorer/bse-link-fixer/releases) (scroll to "Assets" section)
3. In Chrome, go to `chrome://extensions/`
4. Enable "Developer mode"
5. Drag and drop the zip file onto the extensions page

### Method 2: Load as Unpacked Extension (Recommended for development)

1. Download or clone this repository to your local machine
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the folder containing the extension files
5. The extension should now appear in your extensions list

## Usage

1. Install the extension following the installation instructions above
2. When you directly navigate to a broken BSE link (e.g., by typing the URL in the address bar or clicking a direct link), the extension will:
   - Automatically detect that the current page URL is a broken BSE link
   - Test the alternative variant (AttachHis ↔ AttachLive)
   - Show a notification if a working alternative is found
   - Automatically redirect to the working link
   - Show an error notification if both variants are broken

### Example

- **Broken URL**: `https://www.bseindia.com/xml-data/corpfiling/AttachHis/0DF3C1F8-F43D-4D00-85E7-D4F9B9148F16-123617.pdf`
- **Extension will try**: `https://www.bseindia.com/xml-data/corpfiling/AttachLive/0DF3C1F8-F43D-4D00-85E7-D4F9B9148F16-123617.pdf`
- **Result**: Automatic redirect to the working URL

## Features

- **Direct Navigation Support**: Automatically handles broken BSE links when directly navigating to them
- **Smart URL Testing**: Tests both AttachHis and AttachLive variants
- **User Notifications**: Shows notifications when redirecting or when both variants are broken
- **Console Logging**: Detailed logs in browser console for debugging
- **Performance Optimized**: Uses HEAD requests to minimize bandwidth usage
- **Manifest V3 Compatible**: Works with the latest Chrome extension manifest version

## Files Structure

```
bse-link-fixer/
├── manifest.json      # Extension manifest
├── content.js         # Content script for page interaction
├── README.md          # This file
```

## Technical Details

### How it Works

1. **Content Script (`content.js`)**:
   - Runs only on BSE corporate filing URLs
   - Checks if the current page URL is a broken BSE link
   - Tests both AttachHis and AttachLive variants
   - Automatically redirects to the working URL
   - Shows user notifications

## Troubleshooting

### Extension Not Working

1. Check if the extension is enabled in `chrome://extensions/`
2. Open browser console (F12) and look for "BSE Link Fixer" messages
3. Ensure you're on a BSE page with corporate announcement links
4. Try refreshing the page

### Links Still Not Working

1. The extension only fixes links that return 404 errors
2. If a link returns a different error (403, 500, etc.), it won't be fixed
3. Check the browser console for detailed logs

### Performance Issues

1. The extension uses HEAD requests to minimize bandwidth
2. Links are tested asynchronously to avoid blocking the page
3. If you experience slowdowns, check the console for error messages

## Development

To modify the extension:

1. Edit the source files (`content.js`, `manifest.json`)
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test on a BSE page

## Contributing

Feel free to submit issues and enhancement requests!
