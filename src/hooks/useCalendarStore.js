import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'

export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        try {
            if( calendarEvent.id ) {
                // Actualizando
                await calendarApi.put(`/calendar/updateEvent/${calendarEvent.id}`, calendarEvent)
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;
            }
            // Creando
            const { data } = await calendarApi.post('/calendar/addEvent', calendarEvent)
            console.log({data});
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user: user}) );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.data?.message, 'error')      
        }
    }

    const startDeletingEvent = async() => {
        // Todo: Llegar al backend
        try {
            if( activeEvent.id ) {
                await calendarApi.delete(`/calendar/deleteEvent/${activeEvent.id}`)
                dispatch( onDeleteEvent() );
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.data?.message, 'error')      
        }
    }

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/calendar/getEvents')
            const events = convertEventsToDateEvents( data.events )
            dispatch( onLoadEvent(events) )
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }


    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Métodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents
    }
}