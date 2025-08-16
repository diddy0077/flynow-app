import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

export default function LanguageDropdown() {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState(languages[0]);
  const [open, setOpen] = useState(false);

  const handleSelect = (lang) => {
    setSelected(lang);
    setOpen(false);
    i18n.changeLanguage(lang.code); // switch language
  };

  return (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 px-4 py-2 border rounded-md shadow-sm hover:bg-gray-50 transition"
      >
        <span>{selected.flag}</span>
        <span className="text-sm">{selected.name}</span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute mt-2 w-40 bg-indigo-800 border rounded-md shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className={`w-full px-4 py-2 flex items-center space-x-2 text-sm hover:bg-gray-100 ${
                selected.code === lang.code ? "bg-amber-400 font-medium" : ""
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
