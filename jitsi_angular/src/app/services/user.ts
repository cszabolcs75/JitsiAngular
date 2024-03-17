export class User {
    room: String = '';
    name: String = '';
  
    constructor() {
      this.room = '';
    }

    setName(name: String) {
      this.name = name;
    }
  }
  