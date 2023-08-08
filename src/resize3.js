import React, { useState } from 'react';
import GridLayout from "react-grid-layout";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";

import './resize.css';

import Editor from "./Editor";
import data from './data.json';


export default function MyFirstGrid () {
  const [edata, setEdata] = useState(data);
  const [editorInstance, setEditorInstance] = useState(null);

  const fs = require('fs');


  const handleChange = (key, value) => {
    setEdata((prevEdata) => ({
      ...prevEdata,
      [key]: value,
    }));
  };

  return (

    <div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>

          <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
            <div key="a" class="textwrapper" data-grid={{ x: 0, y: 0, w: 5, h: 5 }} >

              {/*<Editor valueFromP={value} keyP={key} onChange={(updatedValue) => handleChange(key, updatedValue)}>*/}
              {/* <Editor valueFromP={value} keyP={key} onChange={(updatedValue) => handleChange(key, updatedValue)}/> */}



            </div>
          </GridLayout>
        </div>
      ))}
    </div>
    )
}