import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

const ScreenShot = ({ url }) => {
  const [screenshotUrl, setScreenshotUrl] = useState('');

  useEffect(() => {
    const takeScreenshot = async () => {
      try {
        // Create a hidden div to load the content of the URL
        const div = document.createElement('div');
        div.style.visibility = 'hidden';
        div.style.position = 'absolute';
        div.style.left = '-9999px';
        document.body.appendChild(div);

        // Load the content of the URL into the hidden div
        div.innerHTML = await fetch(url).then(response => response.text());

        // Capture screenshot of the hidden div
        const canvas = await html2canvas(div);
        const screenshotDataUrl = canvas.toDataURL();
        setScreenshotUrl(screenshotDataUrl);

        // Remove the hidden div after capturing the screenshot
        document.body.removeChild(div);
      } catch (error) {
        console.error('Error capturing screenshot:', error);
      }
    };

    takeScreenshot(); // Initiate screenshot capture when the component mounts or updates
  }, [url]); // Depend on the URL prop to trigger screenshot capture when URL changes

  return (
    <div>
      <h2>Screenshot:</h2>
      {screenshotUrl && <img src={screenshotUrl} alt="Screenshot" />}
    </div>
  );
};

export default ScreenShot;
