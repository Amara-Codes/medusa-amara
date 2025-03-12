"use client";

import { useQRCode } from "next-qrcode";
import Input from "@modules/common/components/input";
import { useState } from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const SecretGiftTemplate = () => {
  const { Canvas } = useQRCode();
  const [name, setName] = useState<string>("");
  const [qrText, setQrText] = useState<string>("");

  const getKeyFromEnv = (): Promise<CryptoKey> => {
    return new Promise((resolve, reject) => {
      const secretKey = process.env.NEXT_PUBLIC_GIFT_SECRET_KEY || "default_secret_key";
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
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container mt-32">
      <div className="w-full">
        <div className="mb-16 small:mx-12">
          <h1 className="mb-8 small:mb-16 font-extrabold text-4xl text-center text-koiRed small:text-8xl font-fatboy" data-testid="secret-gift-page-title">
            Secret Gift
          </h1>
          <div>
            <p className="text-koiYellow text-xl small:text-2xl mb-4 small:mb-0">
            Congratulations! You’ve just won a free tasting of all the beers we’ll have on tap when you visit our taproom! <br />
            To claim your prize, follow these simple steps:
            </p>
            <ol className="list-decimal text-koiOrange font-bold ml-6 my-3">
              <li>
                <p className="text-lg font-bold pb-4 small:pb-0 text-koiWhite">Enter your name and surname in the form below</p>
              </li>
              <li>
                <p className="text-lg font-bold pb-4 small:pb-0 text-koiWhite">Generate your personalized QR code</p>
              </li>
              <li>
                <p className="text-lg font-bold pb-4 small:pb-0 text-koiWhite">Download the QR code and save it to your gallery</p>
              </li>
              <li>
                <p className="text-lg font-bold pb-4 small:pb-0 text-koiWhite">Show it to our staff at the taproom to redeem your free tasting</p>
              </li>
            </ol>
            <p className="text-koiYellow text-xl small:text-2xl">
            The promotion is valid for one month starting from the opening party. <br />
            <LocalizedClientLink href="/contacts" data-testid="contacts-link" className="underline hover:text-koiOrange transition duration-500">Stay connected</LocalizedClientLink> for updates on the opening party and more!
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
            <p className="text-ui-fg-base text-2xl small:text-4xl mb-4"> Generate your QR Code </p>
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
