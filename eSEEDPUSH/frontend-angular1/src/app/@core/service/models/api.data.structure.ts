export interface APIData {
    err,
    msg: String,
    data;
}

export interface Token {
    _id: String,
    username: String,
    role: String,
}

export interface User {
    _id: String;
    name: any,
    email: any,
    password: any,
}
