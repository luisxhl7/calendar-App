import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [
      {
        _id: new Date().getTime(),
        title: "cumple del jefe",
        notes: "hay que comprar el pastel",
        start: new Date(),
        end: addHours(new Date(), 1),
        bgColor: "#fafafa",
        user: {
          _id: "123",
          name: "luis",
        },
      },
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
        if (event._id === payload._id) {
          return payload;
        }

        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent._id
        );
        state.activeEvent = null;
      }
    },
  },
});

export const { onSetActiveEvent, onAddNewEvent, onDeleteEvent, onUpdateEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
