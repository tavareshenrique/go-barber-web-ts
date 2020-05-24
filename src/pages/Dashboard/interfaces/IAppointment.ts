export default interface IAppointment {
  id: string;
  date: string;
  user: {
    name: string;
    avatar_url: string;
  };
}
