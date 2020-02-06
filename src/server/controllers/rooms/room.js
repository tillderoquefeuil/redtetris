class Room {

    constructor({ type, name, socket }) {
        this.type = type;
        this.name = name;
        this.owner = socket.id;
        this.date = Date.now();
        this.active = true;
        this.clients = [];
    }

    get label() {
        return this.type + '_' + this.name + '_' + this.date;
    }

    isOwner(socket){
        if (socket.id === this.owner){
            return true;
        }

        return false
    }

    isClient(socket){
        let id = socket.id;

        if (this.clients.indexOf(id) === -1){
            return false;
        }

        return true;
    }

    pushClient(socket){
        let id = socket.id;
        if (!this.isClient(socket)){
            this.clients.push(id);

        }

        if (!this.owner){
            this.owner = id;
        }
    }

    removeClient(socket) {
        let id = socket.id;

        let index = this.clients.indexOf(id);

        if (index !== -1){
            this.clients.splice(index, 1);

            if (this.isOwner(socket)){
                this.owner = this.clients[0];
            }
        }
    }

};

module.exports = Room;