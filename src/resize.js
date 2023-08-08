import React, { Component } from 'react';
import GridLayout from "react-grid-layout";
import { WidthProvider, Responsive } from "react-grid-layout";

import './resize.css';

import Editor from "./Editor";
import data from './data.json';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const style_mb = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

class MyFirstGrid extends Component {

  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100
  };

  constructor(props) {
    super(props);
    this.state = {
      edata: data,
      editorInstance: null,
      width: window.innerWidth,
      height: window.innerHeight,
      isModalOpen: false,

      items: Object.entries(data).map(([key, value]) => ({
        i: key,
        x: 0,
        y: 0,
        w: 2,
        h: 2,
        content: value, // Store the data in the 'content' property
      })),
      newCounter: 0,
    };

    this.fs = require('fs');
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Functions to handle dimesnions change 
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  // Function to handle the data updation of editor
  handleChange(key, value) {
    this.setState((prevState) => ({
      edata: {
        ...prevState.edata,
        [key]: value,
      },
    }));
  }


  // functions to handle modal
  handleAddItemClick = () => {
    this.setState({ isModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  handleOptionSelect = (option) => {
    this.setState({ isModalOpen: false });
  };


  // Functions to handle adding and removing a new block
  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }


  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }



  render() {
    const { edata, width, height, items } = this.state;
    const gridWidth = Math.floor(window.innerWidth / 300);

    return (
      <div>

      {/* Code for modal and add button */}
      <Modal
          open={this.state.isModalOpen}
          onClose={this.handleModalClose}
          maxWidth="xs"
          fullWidth
      >
          <Box sx={style_mb}>
            <Typography variant="h6" component="h2">
              Select an option:
            </Typography>
            <button onClick={this.onAddItem}> 1:1:1 </button> <br/>
            <button onClick={this.onAddItem}> 1:2 </button>  <br/>
            <button onClick={this.onAddItem}> 2:1 </button>
            </Box>
        </Modal>

        <button onClick={this.handleAddItemClick}>Add Item</button>

        {/*
        {Object.entries(edata).map(([key, value]) => (
          <div key={key}>
            <GridLayout className="layout" cols={12} rowHeight={30} width={width}>
              <div key="a" className="textwrapper" data-grid={{ x: 0, y: 0, w: gridWidth, h: 5 }}>
                <p>{width}</p>
                <p>{height}</p>
                <Editor valueFromP={value} keyP={key} onChange={(updatedValue) => this.handleChange(key, updatedValue)} />
              </div>
            </GridLayout>
          </div>
        ))}
        */}

        
        <ResponsiveReactGridLayout 
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange} 
          {...this.props}
          >

          {items.map((item) => (
            <div key={item.i} data-grid={item}>
              <p>{JSON.stringify(item.content)}</p>
            {/*
              <Editor
                valueFromP={item.content}
                keyP={item.i}
                onChange={(updatedValue) => {
                  const updatedItems = items.map((it) => {
                    if (it.i === item.i) {
                      return { ...it, content: updatedValue };
                    }
                    return it;
                  });
                  this.setState({ items: updatedItems });
                }}
              />
          */}
            </div>
          ))}
        </ResponsiveReactGridLayout>

      </div>
    );
  }
}

export default MyFirstGrid;
