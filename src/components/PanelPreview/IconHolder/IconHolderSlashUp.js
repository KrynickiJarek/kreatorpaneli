import { memo, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import "./IconHolder.scss"

import UpHolder from "../../../assets/preview/upholder.svg"
import Remove from "../../../assets/preview/remove.svg"

import { ReDragUp } from './ReDrag/ReDragUp';



export const IconHolderSlashUp = memo(function IconHolderSlashUp({ lastDroppedSlashUp, onDropSlashUp, chosenColor, onUpActive, show, showNow, warning, onResetUp, scale, onSelectUp, selectedUp }) {


    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "icon",
        drop: onDropSlashUp,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop;
    let styleDropping = {};
    let styleDroppingPulse = {};
    let styleArea = {};
    let styleHolder = {};
    let styleScale = {};
    styleScale.height = `${3.6 * scale}px`;
    styleScale.width = `${3.6 * scale}px`;

    if ((isActive && show) || (isActive && showNow)) {
        if (chosenColor.hex !== "#2fa32c") {
            styleDropping = {
                backgroundColor: "rgb(40, 167, 69)",
            };
            styleDroppingPulse = {
                animation: "Ani 2s infinite",
                filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)"
            };
        } else {
            styleDropping = {
                backgroundColor: "rgb( 32, 114, 30)",
            };
            styleDroppingPulse = {
                animation: "Ani 2s infinite",
                filter: "invert(34%) sepia(98%) saturate(353%) hue-rotate(70deg) brightness(87%) contrast(102%)"
            };
        };
        styleArea = {
            transform: "translate(-103%,-103%) scale(1.8,1.8)",
            zIndex: "3",
        };
        styleHolder = {
            display: "block",
        };
    }

    else if ((canDrop && show) || (canDrop && showNow)) {
        styleDropping = {
            // backgroundColor: "rgb(255, 193, 7)",
            backgroundColor: "rgb(236, 105, 92)",
        };
        styleDroppingPulse = {
            animation: "Ani 2s infinite",
        };
        styleArea = {
            transform: "translate(-103%,-103%)",
        };
        styleHolder = {
            display: "block",
        };
    } else if (selectedUp) {
        styleDropping = {
            // backgroundColor: "rgb(255, 193, 7)",
            backgroundColor: "rgb(236, 105, 92)",
            // transform: "scale(1.001)",
        };
        styleDroppingPulse = {
            animation: "Ani 2s infinite",
        }
        styleArea = {
            transform: "translate(-53%,-53%) scale(1.8,1.8)",
            zIndex: "3",
        };
    }

    if (!lastDroppedSlashUp && !show && !showNow && !isActive) {
        styleArea = {
            transform: "translate(-35%,-35%) scale(0.01,0.01)",
        };
    }

    useEffect(() => {
        if (isActive) {
            onUpActive(true)
        } else {
            onUpActive(false)
        }
    }, [isActive, onUpActive]);



    return (
        <div ref={drop} className="slash_up_area" style={{ ...styleScale, ...styleArea, top: `${6.65 * scale}px` }} >
            <div className="slash_icon_area_dropping_pulse" style={styleDroppingPulse} />
            <div ref={drop} className="slash_icon_area_dropping" style={styleDropping} />
            { lastDroppedSlashUp &&
                <ReDragUp image={lastDroppedSlashUp.image} chosenColor={chosenColor} onResetUp={onResetUp} scale={scale} onSelectUp={onSelectUp} />
            }
            {
                !lastDroppedSlashUp &&
                (<img src={UpHolder} alt="upholder" className="slash_holder"
                    style={chosenColor.iconColor === "white" ? { ...styleHolder, ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
                        : { ...styleHolder, ...styleScale, filter: "grayscale(100%) brightness(0)" }}
                />)
            }
            {
                (lastDroppedSlashUp && (warning || isActive)) &&
                (<img src={Remove} alt="remove" className="slash_remove" style={styleScale} />)
            }
        </div >
    );
});
