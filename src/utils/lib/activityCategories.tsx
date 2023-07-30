
import { ReactComponent as ListStar } from "../../assets/icons/list-stars.svg";
import { ReactComponent as Fire } from "../../assets/icons/fire.svg";
import { ReactComponent as CalendarCheck } from "../../assets/icons/calendar-check-fill.svg";
import { ReactComponent as People } from "../../assets/icons/people-fill.svg";
import { ReactComponent as House } from "../../assets/icons/house-fill.svg";
import { ReactComponent as Car } from "../../assets/icons/car-front-fill.svg";


interface ActivityDetails {
	name: string,
	icon: JSX.Element
}

interface ActivityCategory {
	[key: string]: ActivityDetails
}

export const activityCategories : ActivityCategory = {
	"thingsToDo": {
		name: "Things to do",
		icon: <ListStar />,
	},
	"campgrounds": {
		name: "Camping",
		icon: <Fire />,
	},
	events: {
		name: "Events",
		icon: <CalendarCheck />,
	},
	tours: {
		name: "Tours",
		icon: <People />,
	},
	visitorCenters: {
		name: "Visitor Centers",
		icon: <House />,
	},
	parkingLots: {
		name: "Parking",
		icon: <Car />,
	},
};