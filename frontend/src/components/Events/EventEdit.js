import { useParams } from "react-router-dom";
import EventForm from "./Eventform";
const EventEdit = () => {
    const {eventId} = useParams();
    return (
        <EventForm eventId={eventId} />
        )
}
export default EventEdit;