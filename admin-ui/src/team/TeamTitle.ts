import { Team as TTeam } from "../api/team/Team";

export const TEAM_TITLE_FIELD = "name";

export const TeamTitle = (record: TTeam) => {
  return record.name;
};
