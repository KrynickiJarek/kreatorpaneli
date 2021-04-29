import { memo, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import "./IconHolder.scss"

import DownHolder from "../../../assets/preview/downholder.svg"
import Remove from "../../../assets/preview/remove.svg"

import { ReDragDown } from './ReDrag/ReDragDown';


export const IconHolderSlashDown = memo(function IconHolderSlashDown({ lastDroppedSlashDown, onDropSlashDown, chosenColor, onDownActive, show, showNow, warning, onResetDown, scale, onSelectDown, selectedDown }) {


    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "icon",
        drop: onDropSlashDown,
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
            transform: "translate(108%,108%) scale(1.8,1.8)",
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
            transform: "translate(108%,108%)",
        };
        styleHolder = {
            display: "block",
        };
    } else if (selectedDown) {
        styleDropping = {
            // backgroundColor: "rgb(255, 193, 7)",
            backgroundColor: "rgb(236, 105, 92)",
        };
        styleDroppingPulse = {
            animation: "Ani 2s infinite",
        }
        styleArea = {
            transform: "translate(48%,48%) scale(1.8,1.8)",

            zIndex: "3",
        };
    }

    if (!lastDroppedSlashDown && !show && !showNow && !isActive) {
        styleArea = {
            transform: "translate(35%,35%) scale(0.01,0.01)",
        };
    }

    useEffect(() => {
        if (isActive) {
            onDownActive(true)
        } else {
            onDownActive(false)
        }
    }, [isActive, onDownActive]);

    return (
        <div ref={drop} className="slash_down_area" style={{ ...styleScale, ...styleArea, top: `${10.75 * scale}px` }} >
            <div className="slash_icon_area_dropping_pulse" style={styleDroppingPulse} />
            <div className="slash_icon_area_dropping" style={styleDropping} />
            {lastDroppedSlashDown &&
                <ReDragDown image={lastDroppedSlashDown.image} chosenColor={chosenColor} onResetDown={onResetDown} scale={scale} onSelectDown={onSelectDown} />
            }
            {!lastDroppedSlashDown &&
                (<img src={DownHolder} alt="downholder" className="slash_holder"
                    style={chosenColor.iconColor === "white" ? { ...styleHolder, ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
                        : { ...styleHolder, ...styleScale, filter: "grayscale(100%) brightness(0)" }}
                />)}
            {(lastDroppedSlashDown && (warning || isActive)) &&
                (<img src={Remove} alt="remove" className="slash_remove" style={styleScale} />)}
        </div>
    );
});