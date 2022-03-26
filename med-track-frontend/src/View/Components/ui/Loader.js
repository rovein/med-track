import React from 'react'
import Loader from "react-loader-spinner";

function DefaultLoader({height, width, isCentered, style}) {
    return (
        <div className={isCentered === undefined || isCentered ? "centered" : ""}
        style={style === undefined ? {} : style}>
            <Loader
                type="Oval" //Audio Oval ThreeDots
                color="#4B0082"
                height={height}
                width={width}
                timeout={10000}
            />
        </div>
    )
}

export default DefaultLoader;
