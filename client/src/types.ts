export type Projects = {
    title?: string;
    description?: string;
    id?: number;
    createdBy?: string;
    Users: UserType[];
};


type UserType = {
    firstName?: string;
    lastName?: string;
    id?: string;
    email?: string;
    Projects?: Projects;
};

export type RegistrationType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

//  Record<string, string> 

export type LoginType = {
    email: string;
    password: string;
};