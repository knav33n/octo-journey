interface NewPin {
  lat?: number;
  lng?: number;
  title?: string;
  desc?: string;
  username?: string;
  rating?: number;
}

interface Pin {
  lat: number;
  lng: number;
  _id: string;
  title: string;
  desc: string;
  username: string;
  rating: number;
  createdAt: string;
}

interface App {
  currentUser: string | null;
  showRegister: boolean;
  showLogin: boolean;
}

type AppContextValue = [App, React.Dispatch<React.SetStateAction<App>>];
