import React from 'react';
import { Tabs } from 'antd';
import "./IconEditor.scss"
import iconCategories from "./iconCategories"
import { IconToDrag } from './IconToDrag';

const { TabPane } = Tabs;
let listOfIcons = [];


// export const IconEditor = memo(function IconEditor() {

const IconEditor = ({onIconSet}) => {


  // const [iconItem, setIconItem] = useState(null);



//   const handleDrop = useCallback((item) => {
//     const { image } = item;
//     setIconItem(image);
// }, [dustbins]);

  return (
    <div>
      <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 700 }} tabBarGutter={-10} centered={false}>
        {iconCategories.map((el, i) => (
          <TabPane tab={el.name} key={i} >
            <div className="icons">
              {
                el.listOfIcons.map(
                  // (image, index) => <IconToDrag key={index} image={image} onIconSet={onIconSet} />
                  (image, index) => <IconToDrag key={index} image={image} />
                  // (image, index) => <img key={index} src={image.default} alt="info" className="icon" />
                )
              }
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default IconEditor;



// import React from 'react';
// import { Tabs } from 'antd';
// import iconCategories from "./iconCategories"


// const { TabPane } = Tabs;

// let listOfIcons = [];



// const IconEditor = () => {



//   const importAll = (r) => {
//     return r.keys().map(r);
//   }
//   listOfIcons = importAll(require.context("../../../assets/icons/bezpieczenstwo", true, /\.(svg)$/));
//   console.log(listOfIcons)



//   return (
//     <div>
//       <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: 700 }} tabBarGutter={-10} centered={false}>
//         {iconCategories.map((el, i) => (
//           <TabPane tab={el.name} key={i} >
//             Content of tab {el.name}


//             {
//               listOfIcons.map(
//                 (image, index) => <img key={index} src={image.default} alt="info"></img>
//               )
//             }


//           </TabPane>
//         ))}
//       </Tabs>
//     </div>
//   );
// }

// export default IconEditor;

