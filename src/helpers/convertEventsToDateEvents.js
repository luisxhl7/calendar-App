import { parseISO } from "date-fns"

export const convertEventsToDateEvents = (events = []) => {
    return events.map( event => {

        event.dateInit = parseISO( event.dateInit)
        event.dateEnd = parseISO( event.dateEnd)

        return event
    })
}
