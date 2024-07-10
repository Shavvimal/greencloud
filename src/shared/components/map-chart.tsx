"use client";

import React, { useEffect, useState } from "react";
import { scaleLinear, scaleQuantile } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { useRef } from "react";
import { Tooltip, TooltipRefProps } from "react-tooltip";

const geoUrl = "/features.json";

const COLOR_RANGE = [
  "#ecfdf5",
  "#d1fae5",
  "#a7f3d0",
  "#6ee7b7",
  "#34d399",
  "#10b981",
  "#059669",
  "#047857",
  "#065f46",
  "#064e3b",
  "#022c22",
];

const dataGlobal = [
  { ISO3: "AFG", data: 0.595266279 },
  { ISO3: "ALB", data: 0.422787964 },
  { ISO3: "DZA", data: 0.37052249 },
  { ISO3: "AGO", data: 0.517443119 },
  { ISO3: "ATG", data: 0.487297092 },
  { ISO3: "ARG", data: 0.367765624 },
  { ISO3: "ARM", data: 0.413776868 },
  { ISO3: "AUS", data: 0.294720751 },
  { ISO3: "AUT", data: 0.313323304 },
  { ISO3: "AZE", data: 0.408076192 },
  { ISO3: "BHS", data: 0.376108052 },
  { ISO3: "BHR", data: 0.457694916 },
  { ISO3: "BGD", data: 0.542856795 },
  { ISO3: "BRB", data: 0.380922887 },
  { ISO3: "BLR", data: 0.341580254 },
  { ISO3: "BEL", data: 0.360913968 },
  { ISO3: "BLZ", data: 0.474098476 },
  { ISO3: "BEN", data: 0.573781702 },
  { ISO3: "BTN", data: 0.492636989 },
  { ISO3: "BOL", data: 0.459961835 },
  { ISO3: "BIH", data: 0.370750224 },
  { ISO3: "BWA", data: 0.470928576 },
  { ISO3: "BRA", data: 0.380520405 },
  { ISO3: "BRN", data: 0.395034552 },
  { ISO3: "BGR", data: 0.344119624 },
  { ISO3: "BFA", data: 0.572455643 },
  { ISO3: "BDI", data: 0.580995695 },
  { ISO3: "KHM", data: 0.517469011 },
  { ISO3: "CMR", data: 0.482688638 },
  { ISO3: "CAN", data: 0.295850875 },
  { ISO3: "CAF", data: 0.579679015 },
  { ISO3: "TCD", data: 0.650809897 },
  { ISO3: "CHL", data: 0.344563804 },
  { ISO3: "CHN", data: 0.388597692 },
  { ISO3: "COL", data: 0.38826635 },
  { ISO3: "COM", data: 0.479212739 },
  { ISO3: "COG", data: 0.518306979 },
  { ISO3: "COD", data: 0.588175118 },
  { ISO3: "CRI", data: 0.389337667 },
  { ISO3: "CIV", data: 0.514397492 },
  { ISO3: "HRV", data: 0.38720318 },
  { ISO3: "CUB", data: 0.428395377 },
  { ISO3: "CYP", data: 0.359748806 },
  { ISO3: "CZE", data: 0.309574293 },
  { ISO3: "DNK", data: 0.343884026 },
  { ISO3: "DJI", data: 0.499673316 },
  { ISO3: "DMA", data: 0.402800564 },
  { ISO3: "DOM", data: 0.431543643 },
  { ISO3: "ECU", data: 0.446357424 },
  { ISO3: "EGY", data: 0.426281848 },
  { ISO3: "SLV", data: 0.448212171 },
  { ISO3: "GNQ", data: 0.479497916 },
  { ISO3: "ERI", data: 0.595884936 },
  { ISO3: "EST", data: 0.375545539 },
  { ISO3: "ETH", data: 0.565721486 },
  { ISO3: "FJI", data: 0.452490876 },
  { ISO3: "FIN", data: 0.307714105 },
  { ISO3: "FRA", data: 0.296253387 },
  { ISO3: "GAB", data: 0.439743332 },
  { ISO3: "GMB", data: 0.538610833 },
  { ISO3: "GEO", data: 0.409665732 },
  { ISO3: "DEU", data: 0.292013239 },
  { ISO3: "GHA", data: 0.46838701 },
  { ISO3: "GRC", data: 0.346123115 },
  { ISO3: "GRD", data: 0.391041978 },
  { ISO3: "GTM", data: 0.457399021 },
  { ISO3: "GIN", data: 0.54324196 },
  { ISO3: "GNB", data: 0.625645835 },
  { ISO3: "GUY", data: 0.479821409 },
  { ISO3: "HTI", data: 0.556109873 },
  { ISO3: "HND", data: 0.461677186 },
  { ISO3: "HUN", data: 0.365010344 },
  { ISO3: "ISL", data: 0.312354832 },
  { ISO3: "IND", data: 0.502345763 },
  { ISO3: "IDN", data: 0.445285279 },
  { ISO3: "IRN", data: 0.387024804 },
  { ISO3: "IRQ", data: 0.4359084 },
  { ISO3: "IRL", data: 0.344952415 },
  { ISO3: "ISR", data: 0.336136651 },
  { ISO3: "ITA", data: 0.319973741 },
  { ISO3: "JAM", data: 0.433067083 },
  { ISO3: "JPN", data: 0.371541731 },
  { ISO3: "JOR", data: 0.376908072 },
  { ISO3: "KAZ", data: 0.335898028 },
  { ISO3: "KEN", data: 0.545857342 },
  { ISO3: "KOR", data: 0.375432169 },
  { ISO3: "KWT", data: 0.433910927 },
  { ISO3: "KGZ", data: 0.390684152 },
  { ISO3: "LAO", data: 0.536551146 },
  { ISO3: "LVA", data: 0.392850048 },
  { ISO3: "LBN", data: 0.40789546 },
  { ISO3: "LSO", data: 0.508848403 },
  { ISO3: "LBR", data: 0.616751775 },
  { ISO3: "LBY", data: 0.381915945 },
  { ISO3: "LTU", data: 0.387905308 },
  { ISO3: "LUX", data: 0.285452572 },
  { ISO3: "MKD", data: 0.366026409 },
  { ISO3: "MDG", data: 0.584138074 },
  { ISO3: "MWI", data: 0.549780137 },
  { ISO3: "MYS", data: 0.37740958 },
  { ISO3: "MDV", data: 0.55969604 },
  { ISO3: "MLI", data: 0.609321229 },
  { ISO3: "MLT", data: 0.356006966 },
  { ISO3: "MRT", data: 0.56734861 },
  { ISO3: "MUS", data: 0.437823601 },
  { ISO3: "MEX", data: 0.381857423 },
  { ISO3: "FSM", data: 0.637534877 },
  { ISO3: "MDA", data: 0.417353786 },
  { ISO3: "MNG", data: 0.406527776 },
  { ISO3: "MNE", data: 0.388119799 },
  { ISO3: "MAR", data: 0.378055677 },
  { ISO3: "MOZ", data: 0.540818133 },
  { ISO3: "MMR", data: 0.542107306 },
  { ISO3: "NAM", data: 0.490828617 },
  { ISO3: "NPL", data: 0.515563782 },
  { ISO3: "NLD", data: 0.35141926 },
  { ISO3: "NZL", data: 0.331357325 },
  { ISO3: "NIC", data: 0.452991695 },
  { ISO3: "NER", data: 0.670315892 },
  { ISO3: "NGA", data: 0.489134956 },
  { ISO3: "NOR", data: 0.277731984 },
  { ISO3: "OMN", data: 0.416074773 },
  { ISO3: "PAK", data: 0.507073982 },
  { ISO3: "PAN", data: 0.406366676 },
  { ISO3: "PNG", data: 0.573111198 },
  { ISO3: "PRY", data: 0.384742649 },
  { ISO3: "PER", data: 0.426492503 },
  { ISO3: "PHL", data: 0.458675874 },
  { ISO3: "POL", data: 0.323555655 },
  { ISO3: "PRT", data: 0.347449554 },
  { ISO3: "QAT", data: 0.374887967 },
  { ISO3: "ROU", data: 0.411465913 },
  { ISO3: "RUS", data: 0.334638712 },
  { ISO3: "RWA", data: 0.554624365 },
  { ISO3: "KNA", data: 0.418194455 },
  { ISO3: "LCA", data: 0.391240949 },
  { ISO3: "VCT", data: 0.378149291 },
  { ISO3: "WSM", data: 0.482758247 },
  { ISO3: "STP", data: 0.477817092 },
  { ISO3: "SAU", data: 0.388308473 },
  { ISO3: "SEN", data: 0.535324485 },
  { ISO3: "SRB", data: 0.409479964 },
  { ISO3: "SYC", data: 0.471773393 },
  { ISO3: "SLE", data: 0.557202255 },
  { ISO3: "SGP", data: 0.415254971 },
  { ISO3: "SVK", data: 0.364406868 },
  { ISO3: "SVN", data: 0.33933371 },
  { ISO3: "SLB", data: 0.658078109 },
  { ISO3: "SOM", data: 0.677505966 },
  { ISO3: "ZAF", data: 0.398329339 },
  { ISO3: "ESP", data: 0.307705757 },
  { ISO3: "LKA", data: 0.470445463 },
  { ISO3: "SDN", data: 0.622806633 },
  { ISO3: "SUR", data: 0.404186885 },
  { ISO3: "SWZ", data: 0.546407412 },
  { ISO3: "SWE", data: 0.301165076 },
  { ISO3: "CHE", data: 0.273541874 },
  { ISO3: "SYR", data: 0.439831356 },
  { ISO3: "TJK", data: 0.438093254 },
  { ISO3: "TZA", data: 0.550542829 },
  { ISO3: "THA", data: 0.408654573 },
  { ISO3: "TLS", data: 0.557770449 },
  { ISO3: "TGO", data: 0.539234023 },
  { ISO3: "TON", data: 0.573114514 },
  { ISO3: "TTO", data: 0.404695858 },
  { ISO3: "TUN", data: 0.394034014 },
  { ISO3: "TUR", data: 0.338112499 },
  { ISO3: "TKM", data: 0.425093859 },
  { ISO3: "UGA", data: 0.580261529 },
  { ISO3: "UKR", data: 0.366893924 },
  { ISO3: "ARE", data: 0.378405035 },
  { ISO3: "GBR", data: 0.298680816 },
  { ISO3: "USA", data: 0.338694215 },
  { ISO3: "URY", data: 0.382811397 },
  { ISO3: "UZB", data: 0.3884987 },
  { ISO3: "VUT", data: 0.568615674 },
  { ISO3: "VEN", data: 0.34711368 },
  { ISO3: "VNM", data: 0.476697243 },
  { ISO3: "YEM", data: 0.554577335 },
  { ISO3: "ZMB", data: 0.542427386 },
  { ISO3: "ZWE", data: 0.543401148 },
];

const MapChart = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const tooltipRef = useRef<TooltipRefProps>(null);
  const [data, setData] =
    useState<{ ISO3: string; data: number }[]>(dataGlobal);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    addEventListeners();
    handleLinkHoverEvents();
    return () => removeEventListeners();
  }, []);

  const handleLinkHoverEvents = () => {
    document.querySelectorAll("a").forEach((el) => {
      el.addEventListener("mouseover", () => setLinkHovered(true));
      el.addEventListener("mouseout", () => setLinkHovered(false));
    });
  };
  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseenter", onMouseEnter);
    document.removeEventListener("mouseleave", onMouseLeave);
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseLeave = () => {
    setHidden(true);
  };

  const onMouseEnter = () => {
    setHidden(false);
  };

  const onMouseMove = (e: any) => {
    setHidden(false);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const onMouseDown = () => {
    setClicked(true);
  };

  const onMouseUp = () => {
    setClicked(false);
  };

  const isMobile = () => {
    const ua = navigator.userAgent;
    return /Android|Mobi/i.test(ua);
  };
  if (typeof navigator !== "undefined" && isMobile()) return null;

  const geographyStyle = {
    default: {
      outline: "none",
    },
    hover: {
      transition: "all 250ms",
      outline: "#10b981",
      stroke: "#10b981",
    },
    pressed: {
      outline: "none",
    },
  };

  const colorScale = scaleQuantile<string>()
    .domain(data.map((d) => d.data))
    .range(COLOR_RANGE);

  const onMouseLeaveMap = () => {
    setTooltipContent("");
    tooltipRef.current?.close();
  };

  return (
    <>
      <Tooltip id="my-tooltip" className="z-50" float={true} ref={tooltipRef}>
        {tooltipContent}
      </Tooltip>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
        data-tooltip-id="map-tooltip"
        data-tooltip-float="true"
        className="z-10"
      >
        <Sphere id="sphere" fill="white" stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s.ISO3 === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d.data) : "#F5F4F6"}
                    onMouseEnter={() => {
                      console.log(
                        `${d?.ISO3 ? d.ISO3 : ""} — ${d?.data ? d.data : 0}`
                      );
                      setTooltipContent(
                        `${d?.ISO3 ? d.ISO3 : ""} — ${d?.data ? d.data : 0}`
                      );
                      tooltipRef.current?.open({
                        position: position,
                        place: "bottom",
                        content: `${d?.ISO3 ? d.ISO3 : ""} — ${
                          d?.data ? d.data : 0
                        }`,
                      });
                    }}
                    onMouseLeave={onMouseLeaveMap}
                    style={geographyStyle}
                    data-tip={d ? `${d.ISO3} - ${d.data}` : "No data"}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    </>
  );
};

export default MapChart;
