export class User {
  constructor(id, name, role) {
    this.id = id;
    this.name = name;
    this.role = role; // admin | staff
  }

  updateName(newName) {
    this.name = newName;
  }
}

// export ra global để file khác dùng
window.User = User;
