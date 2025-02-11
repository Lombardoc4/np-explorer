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

interface IPark {
  id: string;
  // activites: string[];
  activites: {
    id: string;
    name: string;
  };
  addresses?: {
    line1: string;
    line2: string;
    line3: string;
    city: string;
    stateCode: string;
    countryCode: string;
    provinceTerritoryCode: string;
    postalCode: string;
    type: string;
  };
  contacts?: {
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
  };
  description: string;
  designation: string;
  directionsInfo: string;
  directionUrl: string;
  entranceFees: {
    cost: number;
    title: string;
    description: string;
  }[];
  entrancePasses: {
    cost: number;
    title: string;
    description: string;
  }[];
  fullName: string;
  name: string;
  operatingHours?: {
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
  }[];
  parkCode: string;
  // states: string[];
  states: string;
  images: ImageProps[];
  latitude: string;
  longitude: string;
  url?: string;
  weatherInfo?: string;
}
