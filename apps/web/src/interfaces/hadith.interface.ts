export interface HadithBook {
  id: string;
  name: string;
  available: number;
}

export interface HadithContents {
  number: number;
  arab: string;
  id: string;
}

export interface HadithProps {
  number: number;
  arab: string;
  id: string;
}

export interface HadithBooksResponse {
  code: number;
  message: string;
  data: HadithBook[];
  error: boolean;
}

export interface HadithRangeResponse {
  code: number;
  message: string;
  data: {
    name: string;
    id: string;
    available: number;
    requested: number;
    hadiths: HadithProps[];
  };
  error: boolean;
}

export interface HadithDetailResponse {
  code: number;
  message: string;
  data: {
    name: string;
    id: string;
    available: number;
    contents: HadithContents;
  };
  error: boolean;
}
