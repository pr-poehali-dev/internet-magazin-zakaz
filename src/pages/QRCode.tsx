import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

const SITE_URL = "https://MAISON-NOIR.RU";

export default function QRCodePage() {
  const svgRef = useRef<HTMLDivElement>(null);

  const download = () => {
    const svg = svgRef.current?.querySelector("svg");
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("width", "800");
    clone.setAttribute("height", "800");
    const blob = new Blob([clone.outerHTML], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "maison-noir-qr.svg";
    a.click();
  };

  return (
    <div className="min-h-screen bg-noir flex flex-col items-center justify-center px-6 py-20">
      <p className="font-body text-[0.65rem] tracking-[0.4em] uppercase gold-text mb-4">Поделитесь</p>
      <div className="section-divider mx-auto mb-8" />
      <h1 className="font-display text-4xl md:text-5xl font-light text-cream text-center mb-12">
        QR-код сайта
      </h1>

      <div className="border border-[rgba(201,169,110,0.3)] p-10 bg-noir-soft flex flex-col items-center gap-8 max-w-sm w-full">
        <div ref={svgRef} className="bg-white p-5 rounded-sm">
          <QRCodeSVG
            value={SITE_URL}
            size={220}
            bgColor="#ffffff"
            fgColor="#0D0D0D"
            level="H"
            imageSettings={{
              src: "",
              x: undefined,
              y: undefined,
              height: 0,
              width: 0,
              excavate: false,
            }}
          />
        </div>
        <div className="text-center">
          <p className="font-display text-lg text-cream mb-1">MAISON NOIR</p>
          <p className="font-body text-[0.6rem] tracking-widest uppercase text-cream/40">{SITE_URL}</p>
        </div>
        <button className="btn-gold w-full" onClick={download}>
          Скачать QR-код
        </button>
      </div>

      <a href="/" className="mt-10 nav-link flex items-center gap-2 hover:text-[#C9A96E] transition-colors">
        ← Вернуться на сайт
      </a>
    </div>
  );
}
