import { useEffect } from "react";
import Script from "next/script";

const HillTopAdds = () => {
    useEffect(() => {
        (function (hod) {
            var d = document,
                s = d.createElement("script"),
                l = d.scripts[d.scripts.length - 1];
            s.settings = hod || {};
            s.src = "//sentimental-glad.com/c.DP9v6Fbx2l5_ldSbWFQk9BN/jkEFxpOCTvYR2SNxii0u2/M/TzEm5NN/jxYY3M";
            s.async = true;
            s.referrerPolicy = "no-referrer-when-downgrade";
            l.parentNode.insertBefore(s, l);
        })({});
    }, []);

    return null; // No visible UI, just injecting the script
};

export default HillTopAdds;
