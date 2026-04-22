class KPIService {
  constructor(users) {
    this.users = users;
    this.target = 400000000;
  }


  getAchieved() {
    return this.users.filter(u => u.kpi >= this.target);
  }


  getNotAchieved() {
    return this.users.filter(u => u.kpi < this.target);
  }


  countAchieved() {
    return this.getAchieved().length;
  }

  countNotAchieved() {
    return this.getNotAchieved().length;
  }


  //  top performer
  getTop() {
    return [...this.users].sort((a, b) => b.kpi - a.kpi)[0];
  }
  getTopN(n = 3) {
    return [...this.users]
      .sort((a, b) => b.kpi - a.kpi)
      .slice(0, n);
  }
}


window.KPIService = KPIService;
