import React from 'react'
import Loader from "react-loader-spinner";

function DefaultLoader({height, width}) {
    return (
        <div className="centered">
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
