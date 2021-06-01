import { Fragment } from "react";

import { getEventById, getAllEvents, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Head from "next/head";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
       <title>{event.title}</title>
       <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30 // 30 secs in each request
  };

}

export async function getStaticPaths () {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({params: {eventId: event.id}}));
  return {
    paths: paths,
    fallback: true // false: only pre-generate the paths we sent, true: there may be more paths, which need to be dynamic generated
    // fallback: 'blocking' // block doesnt load the page until everything is generated or retrieved from the api.
  };
}

export default EventDetailPage;
