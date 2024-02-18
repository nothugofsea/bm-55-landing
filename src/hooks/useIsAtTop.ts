import {useEffect, useState} from "react";

const useIsAtTop = (): boolean => {
    const [isAtTop, setIsAtTop] = useState(false);

    useEffect(() => {
        const checkIsAtTop = () => {
            setIsAtTop(window.scrollY <= 0);
        };

        checkIsAtTop();

        window.addEventListener("scroll", checkIsAtTop);
        return () => window.removeEventListener("scroll", checkIsAtTop);
    }, []);

    return isAtTop;
};

export default useIsAtTop;