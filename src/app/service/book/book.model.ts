export interface Books {
    code: number;
    status: string;
    result: {
        _id: string;
        name: string;
        authorName: string;
        seller:
        {
            name: string;
            surname: string;
            email: string;
            phone: number;
            department: string;
            matriculation: number;
        };
        description: {
            numberOfPage: number;
            isbn: string;
            language: string;
        };
        condition: string;
        picture: string;
        price: number;
    }
}

export interface Book {
    code: number;
    status: string;
    result: [{
        _id: string;
        name: string;
        authorName: string;
        seller:
        {
            name: string;
            surname: string;
            email: string;
            phone: number;
            department: string;
            matriculation: number;
        };
        description: {
            numberOfPage: number;
            isbn: string;
            language: string;
        };
        condition: string;
        picture: string;
        price: number;
    }]
}
export interface Example {
    temp: string;
}