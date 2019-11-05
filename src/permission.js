const P_USER_WRITE = 'userwrite'
const P_USER_READ = 'userread'
const P_ADMINISTRATOR = 'ngadimin'

class permission {
    constructor() {
        this.perm = [];
    }
    setPermission(per) {
        this.perm = per;
    }
    hasPermission(check) {
        if (this.perm.indexOf(P_ADMINISTRATOR) >= 0) return true;
        return this.perm.indexOf(check) >= 0;
    }
    hasAll(arr) {
        if (this.perm.indexOf(P_ADMINISTRATOR) >= 0) return true;
        for (let i = 0; i < arr.length; i++) {
            if (this.perm.indexOf(arr[i]) < 0)
                return false;
        }
        return true;
    }
    hasOneOf(arr) {
        if (arr.length === 0) return true;
        if (this.perm.indexOf(P_ADMINISTRATOR) >= 0) return true;
        for (let i = 0; i < arr.length; i++) {
            if (this.perm.indexOf(arr[i]) >= 0)
                return true;
        }
        return false;
    }
}

const p = new permission();
/*const user = JSON.parse(localStorage.getItem('user'))
p.setPermission(user === null ? [] : user.user_permissions.map(v => v.permission));*/

export default p;

export {
    P_USER_WRITE,
    P_USER_READ,
    P_ADMINISTRATOR,
}