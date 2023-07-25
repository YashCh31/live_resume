import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

const Editor = ({ valueFromP, keyP, onChange}) => {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);

  const holder_val = 'custom' + keyP;

  useEffect(() => {
      const editor = new EditorJS({
        autofocus: true,
        //holder: holder_val,
        holder: 'editorjs',
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [2, 3, 4],
              defaultLevel: 2,
            },
          },
          list: List,
        },
        data: valueFromP,
        
        onChange: () => {
          saved();
        },
      });
              function saved(){
    editor.save().then((savedData) =>{
        console.log('Saving',savedData);
    }).catch((error) =>{
        console.log("Erroring",error)
    })
  }

  }, [valueFromP, keyP]);



  return <><div id="editorjs" ref={editorRef}></div></>;
};

export default Editor;
