class User {
  constructor(id, name, phone, address, bank, joinDate, avatar, kpi) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.bank = bank;
    this.joinDate = joinDate;
    this.avatar = avatar;
    this.kpi = Number(kpi)|| 0;
  }

}
window.User = User;
