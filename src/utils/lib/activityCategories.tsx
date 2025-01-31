import ListStar from "../../assets/icons/list-stars.svg";
import Fire from "../../assets/icons/fire.svg";
import CalendarCheck from "../../assets/icons/calendar-check-fill.svg";
import People from "../../assets/icons/people-fill.svg";
import House from "../../assets/icons/house-fill.svg";
import Car from "../../assets/icons/car-front-fill.svg";

export interface ActivityDetails {
    name: string;
    icon: JSX.Element;
    path: string;
    count?: number;
}

export interface ActivityCategory {
    [key: string]: ActivityDetails;
}

export const activityCategories: ActivityCategory = {
    visitorCenters: {
        name: "Visitor Centers",
        path: "visitor-centers",
        icon: <House width={32} height={32} />,
    },
    tours: {
        name: "Tours",
        path: "tours",
        icon: <People width={32} height={32} />,
    },
    campgrounds: {
        name: "Campgrounds",
        path: "camping",
        icon: <Fire width={32} height={32} />,
    },
    events: {
        name: "Events",
        path: "events",
        icon: <CalendarCheck width={32} height={32} />,
    },
    thingsToDo: {
        name: "Things to do",
        path: "things-to-do",
        icon: <ListStar width={32} height={32} />,
    },
    parkingLots: {
        name: "Parking",
        path: "parking",
        icon: <Car width={32} height={32} />,
    },
};
