import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

const EditTest = ({ onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = new EditorJS({
      autofocus: true,
      holder: editorRef.current,
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
      data:{},
      onReady: ()=>{

      },
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

    return () => {
    };
  }, [onChange]);

  return <div id="editor" ref={editorRef}></div>;
};

export default EditTest;
