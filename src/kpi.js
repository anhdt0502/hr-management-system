

class KPI {
  constructor(userId, target, achieved = 0) {
    this.userId = userId;
    this.target = target;
    this.achieved = achieved;
  }

  updateAchieved(value) {
    this.achieved += value;
  }
}

window.KPI = KPI;
