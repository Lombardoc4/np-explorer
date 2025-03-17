// Common types
interface LatLong {
  lat: string;
  lng: string;
}

interface Address {
  line1: string;
  line2?: string;
  line3?: string;
  city: string;
  stateCode: string;
  countryCode: string;
  provinceTerritoryCode?: string;
  postalCode: string;
  type: string;
}

interface ContactPhone {
  phoneNumber: string;
  description: string;
  extension?: string;
  type: 'Voice' | 'Fax' | 'TTY';
}

interface ContactEmail {
  emailAddress: string;
  description: string;
}

interface Contacts {
  phoneNumbers: ContactPhone[];
  emailAddresses: ContactEmail[];
}

interface OperatingHours {
  name: string;
  description: string;
  standardHours: {
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
  };
  exceptions: Array<{
    name: string;
    startDate: string;
    endDate: string;
    exceptionHours: {
      sunday: string;
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
    };
  }>;
}

interface ImageProps {
  url?: string;
  altText?: string;
  caption?: string;
  credit?: string;
  title?: string;
  fileInfo?: {
    url?: string;
  };
  crops?: Crop[]; // Moved crops here so that ImageProps can optionally include them
}

interface Crop {
  aspectratio: string; // or number if you can transform this
  url: string;
}

interface Fee {
  cost: string;
  description: string;
  title: string;
}

// Shared entities
interface Activity {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  name: string;
}

interface RelatedPark {
  states: string;
  fullName: string;
  url: string;
  parkCode: string;
  designation: string;
  name: string;
}

// Other utility interfaces
interface DropdownItem {
  value: string;
  title: string;
}

interface ParkLocalStorage {
  name: string;
  parkCode: string;
}

// Forecast & Tour related
interface Forecast {
  name: string;
  temperature: number;
  high: number;
  low: number;
  temperatureUnit: string;
  windSpeed: string;
  windDirection: string;
  shortForecast: string;
  startTime: string;
  isDaytime: boolean;
  probabilityOfPrecipitation: {
    value: string;
  };
  relativeHumidity: {
    value: string;
  };
}

interface TourStop {
  significance: string;
  assetId: string;
  assetName: string;
  assetType: string;
  id: string;
  ordinal: number;
  directionsToNextStop?: string;
  audioTranscript?: string;
  audioFileUrl?: string;
}

interface ITour {
  id: string;
  title: string;
  description: string;
  park: RelatedPark;
  tags: string[];
  type: string;
  activities: Activity[];
  topics?: any[];
  durationMin: number;
  durationMax: number;
  durationUnit: string;
  stops: TourStop[];
  images: ImageProps[];
  relevanceScore: number;
}

// Event
interface NPSEvent {
  categoryid: string;
  category: string;
  eventid: string;
  date: string;
  datestart: string;
  dateend: string;
  recurrencedatestart: string;
  recurrencedateend: string;
  latitude: string;
  longitude: string;
  isrecurring: string;
  isallday: string;
  isregresrequired: string;
  isfree: string;
  regresurl: string;
  regresinfo: string;
  infourl: string;
  feeinfo: string;
  timeinfo: string;
  title: string;
  contactname: string;
  contacttelephonenumber: string;
  contactemailaddress: string;
  description: string;
  location: string;
  tags: string[];
  types: string[];
  recurrencerule: string;
  sitecode: string;
  sitetype: string;
  datetimecreated: string;
  datetimeupdated: string;
  createuser: string;
  updateuser: string;
  risdpoiid: string | null;
  times: {
    timestart: string;
    timeend: string;
    sunrisestart: string;
    sunsetend: string;
  }[];
  dates: string[];
  images: ImageProps[];
  imageidlist: string;
  subjectname: string;
  parkfullname: string;
  portalname: string;
  organizationname: string;
  id: string;
}

// Thing To Do
interface IThingToDo {
  location: string;
  seasonDescription?: string;
  accessibilityInformation: string;
  longitude: string;
  geometryPoiId: string;
  relatedParks: RelatedPark[];
  isReservationRequired: string;
  ageDescription?: string;
  url: string;
  petsDescription: string;
  timeOfDayDescription?: string;
  images: ImageProps[];
  feeDescription?: string;
  id: string;
  age?: string;
  relatedOrganizations: unknown[]; // if always empty, you might set to an empty array type
  arePetsPermittedWithRestrictions: string;
  activities: Activity[];
  activityDescription: string;
  locationDescription: string;
  doFeesApply: string;
  longDescription: string;
  reservationDescription?: string;
  season: string[];
  topics: Topic[];
  durationDescription?: string;
  arePetsPermitted: string;
  timeOfDay: string[];
  title: string;
  latitude: string;
  shortDescription: string;
  duration: string;
  relevanceScore: number;
  tags: string[];
}

// Campground
interface ICampground {
  id: string;
  url: string;
  name: string;
  parkCode: string;
  description: string;
  latitude: string;
  longitude: string;
  latLong: LatLong;
  audioDescription: string;
  isPassportStampLocation: number;
  passportStampLocationDescription: string;
  passportStampImages: IPassportImages[];
  geometryPoiId: string;
  reservationInfo: string;
  reservationUrl: string;
  regulationsurl: string;
  regulationsOverview: string;
  amenities: { [key: string]: string };
  contacts: Contacts;
  fees: Fee[];
  directionsOverview: string;
  directionsUrl: string;
  operatingHours: OperatingHours[];
  addresses: Address[];
  images: ImageProps[];
  weatherOverview: string;
  numberOfSitesReservable: number;
  numberOfSitesFirstComeFirstServe: number;
  campsites: {
    totalSites: number;
    group: number;
    horse: number;
    tentOnly: number;
    electricalHookups: number;
    rvOnly: number;
    walkBoatTo: number;
    other: number;
  };
  accessibility: {
    wheelchairAccess: string;
    internetInfo: string;
    cellPhoneInfo: string;
    fireStovePolicy: string;
    rvAllowed: number;
    rvInfo: string;
    rvMaxLength: number;
    additionalInfo: string;
    trailerMaxLength: number;
    adaInfo: string;
    trailerAllowed: number;
    accessRoads: string[];
    classifications: string[];
  };
  multimedia: unknown[];
  relevanceScore: number;
  lastIndexedDate: string;
}

// Visitor Center
interface IVisitorCenter {
  id: string;
  url: string;
  name: string;
  parkCode: string;
  description: string;
  latitude: string;
  longitude: string;
  latLong: LatLong;
  audioDescription: string;
  isPassportStampLocation: string | number;
  passportStampLocationDescription: string;
  passportStampImages: IPassportImages[];
  geometryPoiId: string;
  amenities: string[];
  contacts: Contacts;
  directionsInfo: string;
  directionsUrl: string;
  operatingHours?: OperatingHours[];
  addresses?: Address[];
  images: ImageProps[];
  multimedia: unknown[];
  relevanceScore: number;
  lastIndexedDate: string;
}

// Passport Images
interface IPassportImages {
  credit: string;
  description: string;
  crops: Array<{
    aspectRatio: number;
    url: string;
  }>;
  altText: string;
  title: string;
  caption: string;
  url: string;
}

// Park
interface IPark {
  id: string;
  activities: Activity[];
  addresses?: Address[];
  contacts?: Contacts;
  description: string;
  designation: string;
  directionsInfo: string;
  directionsUrl: string;
  entranceFees: Fee[];
  entrancePasses: Fee[];
  fullName: string;
  name: string;
  operatingHours?: OperatingHours[];
  parkCode: string;
  states: string;
  images: ImageProps[];
  latitude: string;
  longitude: string;
  url?: string;
  weatherInfo?: string;
}
