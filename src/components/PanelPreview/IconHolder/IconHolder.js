import { memo, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import "./IconHolder.scss"

import Slash from "../../../assets/preview/slash.svg"
import Holder from "../../../assets/preview/holder.svg"
import Remove from "../../../assets/preview/remove.svg"

import { IconHolderStatus } from './IconHolderStatus';
import { IconHolderSlashUp } from './IconHolderSlashUp';
import { IconHolderSlashDown } from './IconHolderSlashDown';

import { ReDrag } from './ReDrag/ReDrag';



export const IconHolder = memo(function IconHolder({
    chosenColor,
    lastDroppedDot, onDropDot,
    lastDroppedIcon, onDrop,
    lastDroppedSlashUp, onDropSlashUp,
    lastDroppedSlashDown, onDropSlashDown,
    onReset, onResetDot, onResetUp, onResetDown,
    scale,
    // onClearSelected //-------------------------------------------------------------------------------selected
    onSelect, onSelectDot, onSelectUp, onSelectDown,
    selected, selectedDot, selectedUp, selectedDown,
    onDragTest
}) {

    let warning = false
    const [show, setShow] = useState(false);

    const [upActive, setUpActive] = useState(false);
    const [downActive, setDownActive] = useState(false);

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "icon",
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    useEffect(() => { //-------------------------------------------------------------------------------selected
        if (canDrop) {
            onDragTest()
        }
    }, [canDrop, onDragTest]);


    const isActive = isOver && canDrop;
    let styleDropping = {};
    let styleDroppingPulse = {};
    let styleArea = {};
    let styleScale = {};
    styleScale.height = `${7.5 * scale}px`;
    styleScale.width = `${7.5 * scale}px`;
    if (isActive) {
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
            transform: "scale(1.3,1.3)",
            zIndex: "3",
        };
        warning = true;
    }
    else if (canDrop || selected) {
        // setClickState(false);//-------------------------------------------------------------------------------selected---usuń
        styleDropping = {
            // backgroundColor: "rgb(255, 193, 7)",
            backgroundColor: "rgb(236, 105, 92)",
        };
        styleDroppingPulse = {
            animation: "Ani 2s infinite",
        };
    }

    const [{ isOverToShow }, over] = useDrop({
        accept: "icon",
        drop: null,
        collect: (monitor) => ({
            isOverToShow: monitor.isOver(),
        }),
    });

    useEffect(() => {
        if (isOverToShow) {
            const slashTimeout = setTimeout(() => {
                setShow(true)
            }, 400);
            return () => clearTimeout(slashTimeout);
        }
    }, [isOverToShow]);


    useEffect(() => {
        setShow(false)
    }, [isOverToShow]);


    let showNow = false
    if (isOverToShow && (lastDroppedSlashDown || lastDroppedSlashUp)) {
        showNow = true
    }


    const [showHolder, setShowHolder] = useState(false);

    useEffect(() => {
        if (isActive) {
            const holderTimeout = setTimeout(() => {
                setShowHolder(true)
            }, 200);
            return () => clearTimeout(holderTimeout);
        }
    }, [isActive]);

    useEffect(() => {
        setShowHolder(false)
    }, [isActive]);


    // const handleClickIcon = ()=>{ //-------------------------------------------------------------------------------selected
    //     setClickState(prev=>!prev);
    // }


    return (
        <div ref={over} style={{ height: "100%" }}>
            <IconHolderStatus lastDroppedDot={lastDroppedDot} onDropDot={onDropDot} chosenColor={chosenColor} onResetDot={onResetDot} show={show} scale={scale} onSelectDot={onSelectDot} selectedDot={selectedDot} />
            <div ref={drop} className="icon_area" style={{ ...styleScale, ...styleArea }}  >
                <div className="icon_area_dropping_pulse" style={styleDroppingPulse} />
                <div className="icon_area_dropping" style={styleDropping} />

                {(lastDroppedIcon) &&
                    // <ReDrag image={lastDroppedIcon.image} chosenColor={chosenColor} onReset={onReset} scale={scale}  onClickIcon={handleClickIcon}/>
                    <ReDrag image={lastDroppedIcon.image} chosenColor={chosenColor} onReset={onReset} scale={scale} onSelect={onSelect} />
                }
                {(!lastDroppedIcon && (show || showHolder)) &&
                    (<img src={Holder} alt="holder" className="holder"
                        style={chosenColor.iconColor === "white" ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
                            : { ...styleScale, filter: "grayscale(100%) brightness(0)" }}
                    />)}
                {((lastDroppedSlashUp || lastDroppedSlashDown) && !show && !isActive) &&
                    (<img src={Slash} alt="slash" className="slash"
                        style={chosenColor.iconColor === "white" ? { ...styleScale, filter: "grayscale(100%) invert(1) brightness(10)" }
                            : { ...styleScale, filter: "grayscale(100%) brightness(0)" }}
                    />)}
                {(lastDroppedIcon && (upActive || downActive || isActive)) &&
                    (<img src={Remove} alt="remove" className="remove" style={styleScale} />)}
            </div>
            <IconHolderSlashUp lastDroppedSlashUp={lastDroppedSlashUp} onDropSlashUp={onDropSlashUp} chosenColor={chosenColor} onUpActive={(income) => setUpActive(income)}
                show={show} showNow={showNow} warning={warning} onResetUp={onResetUp} scale={scale} onSelectUp={onSelectUp} selectedUp={selectedUp} />

            <IconHolderSlashDown lastDroppedSlashDown={lastDroppedSlashDown} onDropSlashDown={onDropSlashDown} chosenColor={chosenColor} onDownActive={(income) => setDownActive(income)}
                show={show} showNow={showNow} warning={warning} onResetDown={onResetDown} scale={scale} onSelectDown={onSelectDown} selectedDown={selectedDown} />
        </div>
    );
});

