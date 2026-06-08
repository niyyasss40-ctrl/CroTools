import React, { useEffect, useState } from "react";
import {} from "react-icons";
import { BsFiletypeJson } from "react-icons/bs";
import { FaHtml5, FaImage, FaLink, FaQrcode } from "react-icons/fa6";
import { LuFileKey2 } from "react-icons/lu";
import { MdRecycling } from "react-icons/md";
import { RiCodeSSlashFill, RiLockPasswordFill } from "react-icons/ri";
import { TbHtml, TbRegexOff } from "react-icons/tb";
const tools = [
  {
    label: "Short Link",
    description: "Shorten any URL instantly",
    href: "/shortlink",
    Icon: FaLink,
    available: true,
  },
  {
    label: "QR Code",
    description: "Generate QR from text or URL",
    href: "/qrcode",
    Icon: FaQrcode,
    available: true,
  },
  {
    label: "JSON Formatter",
    description: "Beautify, minify, and validate JSON data",
    href: "/json-formatter",
    Icon: BsFiletypeJson,
    available: false,
  },
  {
    label: "Password Generator",
    description: "Create secure passwords with custom rules",
    href: "/password-generator",
    Icon: RiLockPasswordFill,
    available: false,
  },
  {
    label: "Markdown Previewer",
    description: "Real-time HTML preview for Markdown text",
    href: "/markdown-preview",
    Icon: FaHtml5,
    available: false,
  },
  {
    label: "Base64 Encoder",
    description: "Encode or decode strings to Base64 format",
    href: "/base64",
    Icon: RiCodeSSlashFill,
    available: false, // BISA CLIENT-SIDE: Manfaatkan fungsi bawaan btoa() dan atob()
  },
  {
    label: "Image Compressor",
    description: "Reduce image file size without losing quality",
    href: "/image-compressor",
    Icon: FaImage,
    available: false, // BISA CLIENT-SIDE: Gambar ditarik ke HTML5 Canvas, lalu di-export ulang dengan quality lower (.toDataURL)
  },
  {
    label: "Diff Checker",
    description: "Compare two texts and find the differences",
    href: "/diff-checker",
    Icon: MdRecycling,
    available: false, // BISA CLIENT-SIDE: Pakai library open-source 'diff' atau ngetes algoritma sendiri
  },
  {
    label: "Regex Tester",
    description: "Test and validate Regular Expressions in real-time",
    href: "/regex-tester",
    Icon: TbRegexOff,
    available: false, // CLIENT-SIDE: Pakai `new RegExp()` bawaan JavaScript
  },
  {
    label: "HTML Entity Converter",
    description: "Encode or decode HTML entities safely",
    href: "/html-entities",
    Icon: TbHtml,
    available: false, // CLIENT-SIDE: Menggunakan trik DOM innerHTML / textContent
  },
  {
    label: "JWT Decoder",
    description: "Decode and inspect JSON Web Tokens instantly",
    href: "/jwt-decoder",
    Icon: LuFileKey2,
    available: false, // CLIENT-SIDE: Tinggal split string token pakai `.` lalu decode Base64 bagian payload-nya
  },
  {
    label: "Color Picker & Converter",
    description: "Convert HEX, RGB, HSL, and pick colors",
    href: "/color-converter",
    icon: "🎨",
    available: false, // CLIENT-SIDE: Pakai `<input type="color">` bawaan HTML5 dan rumus matematika konversi warna
  },
  {
    label: "Case Converter",
    description: "Change text to UPPER, lower, camelCase, slug-case",
    href: "/case-converter",
    icon: "🔠",
    available: false, // CLIENT-SIDE: Manipulasi string regex biasa
  },
  {
    label: "Lorem Ipsum Generator",
    description: "Generate placeholder text for layouts",
    href: "/lorem-generator",
    icon: "🖨️",
    available: false, // CLIENT-SIDE: Simpan 1 paragraph master lorem ipsum, lalu manipulasi jumlah kata/kalimatnya
  },
  {
    label: "Epoch/Timestamp Converter",
    description: "Convert Unix timestamp to human-readable date",
    href: "/timestamp-converter",
    icon: "⏰",
    available: false, // CLIENT-SIDE: Cukup pakai `new Date(timestamp)`
  },
  {
    label: "UUID/GUID Generator",
    description: "Generate cryptographically secure unique identifiers",
    href: "/uuid-generator",
    icon: "🆔",
    available: false, // CLIENT-SIDE: Pakai API browser modern `crypto.randomUUID()`
  },
  {
    label: "User Agent Parser",
    description: "Inspect and analyze browser browser user agent strings",
    href: "/user-agent",
    icon: "🌐",
    available: false, // CLIENT-SIDE: Bisa baca langsung dari `navigator.userAgent`
  },
  {
    label: "Markdown to HTML",
    description: "Convert raw Markdown text into clean HTML code",
    href: "/md-to-html",
    icon: "🗋",
    available: false, // CLIENT-SIDE: Gunakan library mikro seperti 'marked'
  },
  {
    label: "Aspect Ratio Calculator",
    description: "Calculate responsive image and video dimensions",
    href: "/aspect-ratio",
    icon: "📐",
    available: false, // CLIENT-SIDE: Rumus perbandingan matematika biasa (W1/H1 = W2/H2)
  },
  {
    label: "Text Counter",
    description: "Count characters, words, sentences, and paragraphs",
    href: "/text-counter",
    icon: "📊",
    available: false,
  },
  {
    label: "YT → MP3",
    description: "Download YouTube audio",
    href: "/yt-mp3",
    icon: "▶",
    available: false,
  },
  {
    label: "TikTok DL",
    description: "Download TikTok without watermark",
    href: "/tiktok",
    icon: "♪",
    available: false,
  },
];

const ToolsSection = () => {
  const [filteredTools, setFilteredTools] = useState(tools);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filtered = tools.filter(
      (tool) =>
        tool.label.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredTools(filtered);
  }, [search]);

  return (
    <section className="max-w-5xl mx-auto px-4 pb-20">
      <div className="">
        <input
          type="text"
          placeholder="Search tools..."
          className="w-full mb-6 px-4 py-2 rounded-md bg-neutral-900 border border-neutral-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition"
          id="tool-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredTools
          .sort((a, b) => (b.available ? 1 : 0) - (a.available ? 1 : 0))
          .map((tool) => (
            <a
              href={tool.available ? tool.href : "#"}
              className={`group relative bg-neutral-900 border rounded-xl p-5 transition-all ${
                tool.available
                  ? "border-neutral-800 hover:border-violet-500/50 hover:bg-neutral-800/60 cursor-pointer"
                  : "border-neutral-800/50 opacity-50 cursor-default"
              }`}
            >
              <div className="text-2xl mb-3">
                {tool.icon ? tool.icon : <tool.Icon />}
              </div>
              <h2 className="font-medium text-sm text-neutral-100 mb-1">
                {tool.label}
              </h2>
              <p className="text-xs text-neutral-500">{tool.description}</p>
              {!tool.available && (
                <span className="absolute top-3 right-3 text-[10px] bg-neutral-800 text-neutral-500 px-2 py-0.5 rounded-full">
                  soon
                </span>
              )}
              {tool.available && (
                <div className="mt-4 flex items-center gap-1 text-xs text-violet-400 group-hover:gap-2 transition-all">
                  Use tool
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </a>
          ))}
      </div>
    </section>
  );
};

export default ToolsSection;
