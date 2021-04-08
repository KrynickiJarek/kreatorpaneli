import { memo } from 'react';
import { useDrop } from 'react-dnd';

// const sc = 5;

// const style = {
    // width: sc * 7.5 + "px",
    // height: sc * 7.5 + "px",
    // border: "1px dotted white",
    // margin: "0 auto"
// };

export const IconHolder = memo(function IconHolder({ lastDroppedIcon , onDrop, chosenColor}) {

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: "icon",
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = isOver && canDrop;
    let style = {};
    let style2 = {};
    if (isActive) {
        style = {
            backgroundColor: "#4BB543",
            border: "2px dotted #4BB543",
            width: "200%",
            height: "200%",
            zIndex: "999"

        };
        style2 = {
            transform: "scale(1.4,1.4)",
            zIndex: "999"

        }
    }
    else if (canDrop) {
        style = {
            backgroundColor: "#F0D500",
            border: "2px dotted #F0D500",
        };
    }


    return (<div ref={drop} className="icon_area">
        <div className="icon_area_dropping" style={style} />
        {lastDroppedIcon && 
        (<img src={lastDroppedIcon.image.default} alt="ICON" className="icon"
        style={chosenColor.iconColor === "white" ? {...style2,filter: "grayscale(100%) invert(1) brightness(10)"}:{...style2,filter: "grayscale(100%) brightness(0)"} }
        />)}
    </div>);
});





// import { memo } from 'react';
// import { useDrop } from 'react-dnd';

// const sc = 5;

// const style = {
//     width: sc * 7.5 + "px",
//     height: sc * 7.5 + "px",
//     border: "1px dotted white",
//     margin: "0 auto"
// };

// export const IconHolder = memo(function IconHolder({ lastDroppedItem , onDrop }) {

//     const [{ isOver, canDrop }, drop] = useDrop({
//         accept: "icon",
//         drop: onDrop,
//         collect: (monitor) => ({
//             isOver: monitor.isOver(),
//             canDrop: monitor.canDrop(),
//         }),
//     });

//     const isActive = isOver && canDrop;
//     let backgroundColor = 'whitesmoke';
//     if (isActive) {
//         backgroundColor = 'darkgreen';
//     }
//     else if (canDrop) {
//         backgroundColor = 'darkkhaki';
//     }

//     // return (<div ref={drop} role={'IconHolder'} style={{ ...style, backgroundColor }}>
//     return (<div ref={drop} style={{ ...style, backgroundColor }}>
//         {lastDroppedItem && (<img src={lastDroppedItem.image.default} alt="ICON" />)}
//     </div>);
// });