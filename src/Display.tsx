import React from "react";

interface DisplayProps {
    input: string;
    output: string;
}

const Display: React.FC<DisplayProps> = ({ input, output }) => {
    return (
        <div className="output">
            <span className="result">{output}</span>
            <span id="display" className="input">{input}</span>
        </div>
    )
}

export default Display;