
import { ReactComponent as ListStar } from "../../assets/icons/list-stars.svg";
import { ReactComponent as Fire } from "../../assets/icons/fire.svg";
import { ReactComponent as CalendarCheck } from "../../assets/icons/calendar-check-fill.svg";
import { ReactComponent as People } from "../../assets/icons/people-fill.svg";
import { ReactComponent as House } from "../../assets/icons/house-fill.svg";
import { ReactComponent as Car } from "../../assets/icons/car-front-fill.svg";


export interface ActivityDetails {
	name: string,
	icon: JSX.Element
	count?: number
}

export interface ActivityCategory {
	[key: string]: ActivityDetails
}

export const activityCategories : ActivityCategory = {
	visitorCenters: {
		name: "Visitor Centers",
		icon: <House width={32} height={32}/>,
	},
	tours: {
		name: "Tours",
		icon: <People width={32} height={32}/>,
	},
	campgrounds: {
		name: "Campgrounds",
		icon: <Fire width={32} height={32}/>,
	},
	events: {
		name: "Events",
		icon: <CalendarCheck width={32} height={32}/>,
	},
	thingsToDo: {
		name: "Things to do",
		icon: <ListStar width={32} height={32}/>,
	},
	parkingLots: {
		name: "Parking",
		icon: <Car width={32} height={32}/>,
	},
};