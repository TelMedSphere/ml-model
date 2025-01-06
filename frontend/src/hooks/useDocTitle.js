import { useEffect } from 'react';
 
const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} - TelMedSphere`;
        } else {
            document.title = 'TelMedSphere';
        }
    }, [title]);

    return null;
};

export default useDocTitle;