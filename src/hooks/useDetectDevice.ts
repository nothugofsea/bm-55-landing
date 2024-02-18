import {useLayoutEffect, useState} from "react";

export type DeviceType = "mobile" | "tablet-v" | "tablet-h" | "desktop";

export const useDetectDevice = function () {
    const [device, setDevice] = useState<DeviceType>("desktop");

    useLayoutEffect(() => {
        const detectDevice = () => {
            if (window.innerWidth >= 1280) {
                setDevice("desktop")
            }
            else if (window.innerWidth >= 900) {
                setDevice("tablet-h")
            }
            else if (window.innerWidth >= 768) {
                setDevice("tablet-v")
            }
            else {
                setDevice("mobile")
            }
        }

        detectDevice();
        window.addEventListener("resize", detectDevice)

        return () => {
            window.removeEventListener("resize", detectDevice)
        }
    }, []);

    return device;
}