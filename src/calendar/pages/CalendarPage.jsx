import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar } from "../components"
import { localizer, getMessagesES } from '../../helpers'
import { CalendarEventBox } from '../components/CalendarEventBox'
import { useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew'


export const CalendarPage = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
  const {events, setActiveEvent} = useCalendarStore()
  const {openDateModal} = useUiStore()
  const eventStyleGetter = () => {
    
    const style ={
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'chite'
    }

    return {
      style
    }
  }

  const onDoubleClick = () => {
    openDateModal()
  }

  const onSelect = (event) => {
    setActiveEvent( event )
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  return (
    <>
      <Navbar/>
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={ getMessagesES() }
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox
        }}

        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal/>
      <FabAddNew/>
    </>
  )
}

