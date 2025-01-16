import { useState } from 'react';

const useActive = (initState) => {
    const [active, setActive] = useState(initState);

    const handleActive = (i) => {
        setActive(i);
    };

    const activeClass = (i) => {
        return active === i ? 'border-[2px] border-blue-2' : '';
    };

    return { active, handleActive, activeClass };
};

export default useActive;