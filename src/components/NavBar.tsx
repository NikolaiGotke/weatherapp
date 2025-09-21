"use client";

import { useCity } from "@/context/CityContext";
import SearchCity from "./SearchCity";
import { MdWbSunny, MdHome } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

/*
  NavBar viser navigationsbjælken øverst på siden.
  - Håndterer global by-tilstand via CityContext
  - Indeholder navigation til forsiden og 7-dages prognose
  - Giver hurtig adgang til "Bunkeren" med fast koordinat
  - Indeholder søgefelt for at vælge by
*/

export default function NavBar() {
  const { setCity } = useCity(); // Opdaterer global by
  const router = useRouter(); // Next.js router til navigation

  // Callback når bruger vælger ny by i SearchCity
  const handleCitySelect = (lat: number, lon: number, name: string) => {
    setCity({ lat, lon, name });
  };

  // Speciel "Bunkeren"-knap sætter foruddefineret by og navigerer til forsiden
  const goToBunkeren = () => {
    setCity({
      lat: 56.153,
      lon: 10.203,
      name: "Bunkeren, Better Developers",
    });
    router.push("/");
  };

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white/50 backdrop-blur">
      <div className="h-[80px] w-full flex items-center max-w-7xl px-3 mx-auto relative">
        {/* Venstre side: Titel */}
        <div className="flex items-center gap-2">
          <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
          <h2 className="text-gray-700 text-xl font-bold">Weather Dashboard</h2>
        </div>

        {/* Centered links: I dag / 7 dage */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-6 text-md font-medium text-gray-700">
          <Link
            href="/"
            className="relative after:content-[''] after:block after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:text-blue-600"
          >
            I dag
          </Link>
          <Link
            href="/forecast"
            className="relative after:content-[''] after:block after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full hover:text-blue-600"
          >
            7 dage
          </Link>
        </div>

        {/* Højre side: "Bunkeren"-knap og søgefelt */}
        <div className="ml-auto flex items-center gap-2">
          {/* Knappen til hurtigt at vælge Bunkeren */}
          <button
            onClick={goToBunkeren}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            title="Bunkeren"
          >
            <MdHome className="text-2xl text-gray-700" />
          </button>

          {/* Komponent til at søge og vælge by */}
          <SearchCity onSelectCity={handleCitySelect} />

        </div>
      </div>
    </nav>
  );
}
