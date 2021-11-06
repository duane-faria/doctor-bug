import Service from "./service";

class TeamService extends Service {
  constructor() {
    super("/team");
  }

  validateTeamCode(team_code) {
    return this.axios.get(`${this.url}/validate/code/${team_code}`);
  }

}

export default new TeamService();
