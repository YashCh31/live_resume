import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
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
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };

export default class AddRemoveLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    col1: 3,
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
    isDraggable: true,
    isResizable: true,
    onLayoutChange: function() {}
  };

  /*
  state = {
    items: [0, 1, 2, 3, 4].map((i, key, list) => ({
      i: i.toString(),
      x: i * 2,
      y: 0,
      w: 2,
      h: 2,
      add: i === list.length - 1
    })),
    newCounter: 0
  };*/

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
        x: (Object.keys(data).indexOf(key)%3) * Math.floor(window.innerWidth / 300),
        y: Infinity,
        w: Math.floor(window.innerWidth / 300),
        h: 2,
        content: value, // Store the data in the 'content' property
      })),
      newCounter: 0,
    };

    //this.fs = require('fs');
    //this.updateDimensions = this.updateDimensions.bind(this);
    //this.handleChange = this.handleChange.bind(this);
  }

  onAddItem = () => {
    console.log("adding", "n" + this.state.newCounter);
    this.setState((prevState) => ({
      // Add a new item. It must have a unique key!
      items: prevState.items.concat({
        i: "n" + prevState.newCounter,
        x: (prevState.items.length % 3) * Math.floor(window.innerWidth / 300),
        y: Infinity, // puts it at the bottom
        w: Math.floor(window.innerWidth / 300),
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: prevState.newCounter + 1
    }));
  };

  createElement(el) {

    const updateStyle = {
      position: "absolute",
      right: "15px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el}>
        <span 
          className="update"
          style={updateStyle}
        >
          ✎
        </span>
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }

  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange = (layout) => {
    this.setState({ items: layout });
  };

  onRemoveItem = (i) => {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  };


  handleAddItemClick = () => {
    this.setState({ isModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  handleOptionSelect = (option) => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <div>

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
            <button onClick={this.onAddItem}> single </button> <br/>
            <button > 1:1:1 </button> <br/>
            <button > 1:2 </button>  <br/>
            <button > 2:1 </button>
          </Box>
      </Modal>


        <button onClick={this.handleAddItemClick}>Add Item</button>

        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
