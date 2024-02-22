type coordinatesType = {
  lat: number;
  lng: number;
};

type addressType = {
  address: string;
  city: string;
  coordinates: coordinatesType;
  postalCode: string;
  state: string;
};

type bankInfoType = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

type companyType = {
  address: addressType;
  department: string;
  name: string;
  title: string;
};

type HairType = {
  color: string;
  type: string;
};

type CryptoType = {
  coin: string;
  wallet: string;
  network: string;
};

export type userType = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: HairType;
  domain: string;
  ip: string;
  address: addressType;
  macAddress: string;
  university: string;
  bank: bankInfoType;
  company: companyType;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: CryptoType;
};
