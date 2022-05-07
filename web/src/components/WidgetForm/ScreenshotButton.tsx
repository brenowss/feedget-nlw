import { Camera, Trash } from 'phosphor-react';

import html2canvas from 'html2canvas';
import { useState } from 'react';
import Loading from '../Loading';

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshotCaptured: (screenshot: string | null) => void;
}

export default function ScreenshotButton({
  onScreenshotCaptured,
  screenshot,
}: ScreenshotButtonProps) {
  const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false);

  async function handleCaptureScreenshot() {
    setIsCapturingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');

    onScreenshotCaptured(base64image);
    setIsCapturingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-[4px] border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: '180px',
        }}
      >
        <Trash weight="fill" onClick={() => onScreenshotCaptured(null)} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCaptureScreenshot}
      className="p-2 bg-zinc-800 rounded-[4px] border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    >
      {
        isCapturingScreenshot ? (
          <Loading />
        ) : (
          <Camera className="w-6 h-6" />
        )
      }
    </button>
  );
}
