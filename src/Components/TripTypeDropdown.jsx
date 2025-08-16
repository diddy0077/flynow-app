import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const tripOptions = [
  { label: "✈️ One-way", value: "oneway" },
  { label: "🔁 Round-trip", value: "round" },
];

export default function TripTypeDropdown({ formData, setFormData }) {
  const selectedTrip = tripOptions.find(option => option.value === formData.tripType);

  const handleTripChange = (selected) => {
    setFormData(prev => ({
      ...prev,
      tripType: selected.value
    }));
  };

  return (
    <div className="w-full">
      <Listbox value={selectedTrip} onChange={handleTripChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-4 pr-10 text-left border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
            <span className="block truncate">{selectedTrip.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-500" />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
            {tripOptions.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-semibold" : ""}`}>
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute left-2 top-2 text-indigo-600">
                        <CheckIcon className="h-5 w-5" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
