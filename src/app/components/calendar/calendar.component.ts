import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { CalendarOptions, Calendar, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg, EventDragStopArg } from '@fullcalendar/interaction';
import {FullCalendarComponent, FullCalendarModule} from '@fullcalendar/angular';
import {NgIf} from "@angular/common";
import {EventService} from "../../services/event.service"; // Import EventService
import {Event} from "../../models/event.model";

@Component({
  selector: 'app-root',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [
    NgIf,
    FullCalendarModule
  ],
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarOptions?: CalendarOptions;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;

  constructor(private eventService: EventService) { } // Inject EventService

  ngOnInit() {
    // need for load calendar bundle first
    forwardRef(() => Calendar);

    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin,interactionPlugin],
      editable: true,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      },
      headerToolbar: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [],
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this),

    };

    this.fetchEvents();
  }

  fetchEvents() {
    this.eventService.getAllEvents().subscribe((events: Event[]) => {
      this.calendarOptions!.events = events.map(event => ({
        title: event.title,
        start: event.start,
        end: event.end,
        backgroundColor: event.backgroundColor,
        borderColor: event.borderColor,
        textColor: event.textColor
      }));
      if (this.fullcalendar) {
        this.fullcalendar.getApi().removeAllEvents();
        this.fullcalendar.getApi().addEventSource(this.calendarOptions!.events);
      }
    });
  }

  handleDateClick(arg: DateClickArg) {
    console.log(arg);
  }

  handleEventClick(arg: EventClickArg) {
    console.log(arg);
  }

  handleEventDragStop(arg: EventDragStopArg) {
    console.log(arg);
  }

  updateHeader() {
    this.calendarOptions!.headerToolbar = {
      left: 'prev,next myCustomButton',
      center: 'title',
      right: ''
    };
  }

  updateEvents() {
    const nowDate = new Date();
    const yearMonth = nowDate.getUTCFullYear() + '-' + (nowDate.getUTCMonth() + 1);

    this.calendarOptions!.events = [{
      title: 'Updated Event',
      start: yearMonth + '-08',
      end: yearMonth + '-10'
    }];
  }

}
