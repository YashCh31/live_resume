import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid'


import GridLayout from "react-grid-layout";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";

export default class DemoApp extends React.Component {

  render() {
    return (
      <div>

      <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
            <div key="a" class="textwrapper" data-grid={{ x: 0, y: 0, w: 5, h: 20 }} >
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
        selectable={true}
        dateClick={this.handleDateClick}
        eventResizableFromStart={true}
        eventDurationEditable={true}  
        editable={true}
        headerToolbar={{
          start: 'dayGridMonth,timeGridWeek,timeGridDay',
          center: 'title',
          end: 'prevYear,prev,next,nextYear',
        }}

        businessHours={{
          // Define business hours for the calendar
          daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
          startTime: '09:00', // Start time (in this case, 9:00 AM)
          endTime: '18:00', // End time (in this case, 6:00 PM)
        }}

        availableForMeeting={{
          // Define available meeting times for the calendar
          daysOfWeek: [1, 2, 3, 4], // Monday to Thursday
          startTime: '10:00', // Start time (in this case, 10:00 AM)
          endTime: '16:00', // End time (in this case, 4:00 PM)
        }}

      />

      </div>
          </GridLayout>

      </div>
    )
  }

  handleDateClick = (arg) => { // bind with an arrow function
    arg.view.calendar.changeView('timeGrid');
  }

}