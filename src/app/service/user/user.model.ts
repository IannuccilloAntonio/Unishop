export interface Info {
    code: number;
    status: string;
    token: string;
}

export interface User {
    code: number;
    status: string;
    user: 
    {
        _id: any;
        name: string;
        surname: string;
        email: string;
        department: string;
        matriculation: number;
        phone: number;
        username: string,
        book: []
    }

}
