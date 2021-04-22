export type Project = {
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
    Projects?: Project;
};

export type RegistrationType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type LoginType = {
    email: string;
    password: string;
};

export type LoginResponse = {
    access_token: string;
    authDetail: {
        firstName?: string;
        lastName?: string;
        id?: string;
        email?: string;
    };
};

export type CreateProject = {
    title : string;
    description: string;
}