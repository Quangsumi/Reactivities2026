type Activity = {
  id: string
  title: string
  date: string
  description: string
  category: string
  isCancelled: boolean
  city: string
  venue: string
  latitude: number
  longitude: number
  attendees: Profile[]
  isGoing: boolean
  isHost: boolean
  hostId: string
  hostDisplayName: string
  hostImageUrl?: string
}

type LocationIQSuggestion = {
    place_id: string
    osm_id: string
    osm_type: string
    licence: string
    lat: string
    lon: string
    boundingbox: string[]
    class: string
    type: string
    display_name: string
    display_place: string
    display_address: string
    address: LocationIQAddress
}

type LocationIQAddress = {
    name: string
    house_number: string
    road: string
    suburb?: string
    town?: string
    village?: string
    city?: string
    county: string
    state: string
    postcode: string
    country: string
    country_code: string
    neighbourhood?: string
}

type Profile = {
    id: string
    email: string
    displayName: string
    imageUrl?: string
    bio?: string
}

type User = {
    id: string
    email: string
    displayName: string
    imageUrl?: string
}

type Photo = {
    id: string
    url: string
    userId: string
}

type ChatComment = {
    id: string;
    createdAt: Date;
    body: string;
    userId: string;
    displayName: string;
    imageUrl?: string;
}

type ResetPassword = {
  email: string
  resetCode: string
  newPassword: string
}