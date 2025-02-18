interface ParkLocalStorage {
  name: string;
  parkCode: string;
}

interface DropdownItem {
  value: string;
  title: string;
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
}

interface IAddress {
  line1: string;
  line2: string;
  line3: string;
  city: string;
  stateCode: string;
  countryCode: string;
  provinceTerritoryCode: string;
  postalCode: string;
  type: string;
}

interface IContacts {
  phoneNumbers: {
    phoneNumber: string;
    description: string;
    extension: string;
    type: ' Voice' | 'Fax' | 'TTY';
  }[];
  emailAddresses: {
    emailAddress: string;
    description: string;
  }[];
}

interface IOperatingHours {
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
  exceptions: {
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
  }[];
}

interface IPassportImages {
  credit: string;
  description: string;
  crops: {
    aspectRatio: number;
    url: string;
  }[];
  altText: string;
  title: string;
  caption: string;
  url: string;
}

interface IFee {
  cost: string;
  description: string;
  title: string;
}

interface IForecast {
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

interface TourPark {
  states: string;
  parkCode: string;
  designation: string;
  fullName: string;
  url: string;
  name: string;
}

interface TourActivity {
  id: string;
  name: string;
}

interface ITour {
  id: string;
  title: string;
  description: string;
  park: TourPark;
  tags: string[];
  type: string;
  activities: TourActivity[];
  topics?: any[];
  durationMin: number;
  durationMax: number;
  durationUnit: string;
  stops: TourStop[];
  images: ImageProps[];
  relevanceScore: number;
}

interface ICampground {
  id: string;
  url: string;
  name: string;
  parkCode: string;
  description: string;
  latitude: string;
  longitude: string;
  latLong: { lat: string; lng: string };
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
  contacts: IContacts;
  fees: IFee[];
  directionsOverview: string;
  directionsUrl: string;
  operatingHours: IOperatingHours[];
  addresses: IAddress[];
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
  multimedia: any[];
  relevanceScore: number;
  lastIndexedDate: string;
}

interface IVisitorCenter {
  id: string;
  url: string;
  name: string;
  parkCode: string;
  description: string;
  latitude: string;
  longitude: string;
  latLong: { lat: string; lng: string };
  audioDescription: string;
  isPassportStampLocation: number;
  passportStampLocationDescription: string;
  passportStampImages: IPassportImages[];
  geometryPoiId: string;
  amenities: string[];
  contacts: IContacts;
  directionsInfo: string;
  directionsUrl: string;
  operatingHours?: IOperatingHours[];
  addresses?: IAddress[];
  images: ImageProps[];
  multimedia: any[];
  relevanceScore: number;
  lastIndexedDate: string;
}

interface IPark {
  id: string;
  // activites: string[];
  activites: {
    id: string;
    name: string;
  };
  addresses?: IAddress[];
  contacts?: IContacts;
  description: string;
  designation: string;
  directionsInfo: string;
  directionsUrl: string;
  entranceFees: IFee[];
  entrancePasses: IFee[];
  fullName: string;
  name: string;
  operatingHours?: IOperatingHours[];
  parkCode: string;
  // states: string[];
  states: string;
  images: ImageProps[];
  latitude: string;
  longitude: string;
  url?: string;
  weatherInfo?: string;
}
