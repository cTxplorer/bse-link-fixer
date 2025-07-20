// BSE Link Fixer Content Script
// Automatically redirects broken BSE corporate announcement links by switching between AttachHis and AttachLive

(function() {
    'use strict';

    // Function to check if a URL is a BSE attachment link
    function isBSELink(url) {
        return url.includes('bseindia.com/xml-data/corpfiling/') && 
               (url.includes('AttachHis/') || url.includes('AttachLive/'));
    }

    // Function to switch between AttachHis and AttachLive
    function switchAttachmentType(url) {
        if (url.includes('AttachHis/')) {
            return url.replace('AttachHis/', 'AttachLive/');
        } else if (url.includes('AttachLive/')) {
            return url.replace('AttachLive/', 'AttachHis/');
        }
        return url;
    }

    // Function to test if a URL is accessible
    async function testURL(url) {
        try {
            const response = await fetch(url, { 
                method: 'HEAD'
            });            
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // Function to check and fix the current page URL if it's a broken BSE link
    async function checkAndFixCurrentPageURL() {
        const currentUrl = window.location.href;
        
        if (!isBSELink(currentUrl)) {
            return;
        }
        
        // Test if the current URL works
        const isWorking = await testURL(currentUrl);
        
        if (!isWorking) {
            console.log('BSE Link Fixer: Current page URL is broken, trying alternative...');
            
            // Try the alternative URL
            const alternativeUrl = switchAttachmentType(currentUrl);
            const isAlternativeWorking = await testURL(alternativeUrl);
            
            if (isAlternativeWorking) {
                console.log(`BSE Link Fixer: Redirecting from ${currentUrl} to ${alternativeUrl}`);
                
                // Show a notification to the user
                showNotification(`BSE Link Fixer: Redirecting to working link`, 3000);
                
                // Redirect to the working URL
                window.location.href = alternativeUrl;
            } else {
                console.log('BSE Link Fixer: Both URLs are broken');
                showNotification(`BSE Link Fixer: Both link variants are broken`, 5000);
            }
        }
    }

    // Function to show a notification to the user
    function showNotification(message, duration = 3000) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            max-width: 300px;
        `;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after duration
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, duration);
    }

    // Initialize the extension
    function init() {        
        // Check if current page URL is a broken BSE link
        checkAndFixCurrentPageURL();
    }

    // Start the extension
    init();
})(); 