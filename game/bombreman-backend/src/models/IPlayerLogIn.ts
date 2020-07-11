export interface IPlayerLogIn {
  id: string;
  user_name: string;
  password: string;
  // nicht im Reequest nur um den token in die DB zu schieben
  token: string | null;
}


