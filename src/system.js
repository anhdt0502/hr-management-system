class System {
  constructor() {
    this.users = [];
  }

  load() {
    const data = JSON.parse(localStorage.getItem("users"));

    if (!data) {
      this.users = [...DEFAULT_USERS];
      this.save();
      return;
    }

    this.users = data.map(u => new User(
      u.id,
      u.name,
      u.phone,
      u.address,
      u.bank,
      u.joinDate,
      u.avatar
    ));
  }

  save() {
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  add(user) {
    this.users.push(user);
    this.save();
  }

  updateUser(id, data) {
    const u = this.users.find(u => u.id === id);
    if (!u) return;

    u.name = data.name;
    u.phone = data.phone;
    u.address = data.address;
    u.bank = data.bank;
    u.joinDate = data.joinDate;
    u.avatar = data.avatar;
    this.save();
  }

  delete(id) {
    this.users = this.users.filter(u => u.id !== id);
    this.save();
  }

  getAll() {
    return this.users;
  }

  getById(id) {
    return this.users.find(u => u.id === id);
  }
  search(keyword) {
    keyword = keyword.toLowerCase();

    return this.users.filter(u =>
      u.name.toLowerCase().includes(keyword) ||
      u.phone.includes(keyword) ||
      u.address.toLowerCase().includes(keyword)
    );
  }
}

window.System = System;
