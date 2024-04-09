import { createSlice } from "@reduxjs/toolkit";

// const exampleEvents = [
//   {
//     _id: new Date().getTime(),
//     title: "cumple del jefe",
//     notes: "hay que comprar el pastel",
//     dateInit: new Date(),
//     dateEnd: addHours(new Date(), 1),
//     bgColor: "#fafafa",
//     user: {
//       _id: "123",
//       name: "luis",
//     },
//   }
// ]

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoading: true,
    events: [
      //exampleEvents
    ],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }

        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    onLoadEvent: (state, { payload = [] }) => {
      state.isLoading = false;
      // state.events = payload;
      payload.forEach( event => {
        const exist = state.events.some( dbEvent => dbEvent.id === event.id)
        if (!exist) {
          state.events.push( event )
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoading = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

export const { 
  onSetActiveEvent, 
  onAddNewEvent, 
  onDeleteEvent, 
  onUpdateEvent, 
  onLoadEvent,
  onLogoutCalendar
} = calendarSlice.actions;

export default calendarSlice.reducer;
