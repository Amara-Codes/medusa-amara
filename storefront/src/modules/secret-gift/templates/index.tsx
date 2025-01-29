"use client";

import { useQRCode } from "next-qrcode";
import Input from "@modules/common/components/input";
import { useState } from "react";

const SecretGiftTemplate = () => {
  const { Canvas } = useQRCode();
  const [name, setName] = useState<string>("");
  const [qrText, setQrText] = useState<string>("");

  const getKeyFromEnv = (): Promise<CryptoKey> => {
    return new Promise((resolve, reject) => {
      const secretKey = process.env.GIFT_SECRET_KEY || "default_secret_key";
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secretKey);
      crypto.subtle.digest("SHA-256", keyData).then((hashedKey) => {
        crypto.subtle
          .importKey("raw", hashedKey, { name: "AES-GCM" }, false, ["encrypt", "decrypt"])
          .then(resolve)
          .catch(reject);
      }).catch(reject);
    });
  };

  const encrypt = (data: string): Promise<string> => {
    return getKeyFromEnv().then((key) => {
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encoder = new TextEncoder();

      return crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(data)).then((encryptedData) => {
        const combinedBuffer = new Uint8Array(iv.length + encryptedData.byteLength);
        combinedBuffer.set(iv, 0);
        combinedBuffer.set(new Uint8Array(encryptedData), iv.length);

        return Array.from(combinedBuffer)
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");
      });
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const currentDate = new Date().toLocaleString();
    const dataToEncrypt = `${name}||${currentDate}`;
    encrypt(dataToEncrypt).then((hashed) => {
      setQrText(`https://amarabeerlab.com/gift-redeem/${hashed}`);
    });
  };

  const handleDownload = (): void => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement | null;
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "gift-qr-code.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <div className="w-full">
        <div className="mb-16 small:mx-12">
          <h1 className="mb-16 font-extrabold text-4xl text-center text-koiRed small:text-8xl font-fatboy" data-testid="secret-gift-page-title">
            Secret Gift
          </h1>
          <div>
            <p className="text-koiYellow text-xl small:text-2xl">
              Congratulations! You’ve found the sticker we hid in Siem Reap and made it to this page. Add your name and surname, generate your personalized QR code, download it, and save it to your gallery.
              Show your QR code in our Taproom, and you’ll get a free tasting of all the beers on tap when you visit us. The promotion is valid for one month starting from the opening party. Stay tuned!
            </p>
            <div className="mt-4 text-ui-fg-muted text-lg small:text-xl">
              <p>
                Please note: Make sure to use your real name, as we will ask you to confirm your identity in the Taproom.
              </p>
              <p>
                <strong>
                  No data is saved to our database during this process. Your privacy is safe with us. :)
                </strong>
              </p>
            </div>
          </div>
        </div>

        <div className="flex small:mx-12 justify-center">
          <div className="w-full">
            <p className="text-ui-fg-base text-2xl small:text-4xl mb-4">
              Generate your QR Code
            </p>

            <form onSubmit={handleSubmit} className="flex items-center w-full gap-x-4">
              <Input type="text" label="Enter your name" name="GiftOwnerName" value={name} onChange={(e) => setName(e.target.value)} />
              <button type="submit" className={`py-2 px-4 rounded text-white font-bold border-2 transition ${name.trim() ? "bg-koiRed hover:bg-koiOrange cursor-pointer border-koiRed hover:border-koiOrange" : "bg-gray-300 cursor-not-allowed opacity-50 border-gray-500"}`} disabled={!name.trim()}>
                Generate
              </button>
            </form>

            {qrText && (
              <div className="mt-8 flex flex-col items-center">
                <div className="border-4 border-koiOrange rounded-lg">
                  <Canvas text={qrText} options={{ errorCorrectionLevel: "M", margin: 3, scale: 4, width: 200, color: { dark: "#FF850E", light: "#000000" } }} />
                </div>
                <button onClick={handleDownload} className="mt-4 text-white py-2 px-4 rounded bg-koiRed hover:bg-koiOrange transition font-bold">
                  Download QR Code
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretGiftTemplate;
