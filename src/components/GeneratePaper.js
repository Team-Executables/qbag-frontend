import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userData } from "../atoms";

const GeneratePaper = () => {
    const navigate = useNavigate();
    const uData = useRecoilValue(userData);

    useEffect(() => {
        if (uData.user_type === "other") {
            navigate("/dashboard/question/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <div>GeneratePaper</div>;
};

export default GeneratePaper;
