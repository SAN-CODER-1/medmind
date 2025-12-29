export type RootStackParamList = {
  Home: undefined;
  MeditationPlayer: {
    playlist: {
      title: string;
      image: string;
      audio: any;
      duration: number;
      type: string;
    }[];
    startIndex: number;
  };
};
